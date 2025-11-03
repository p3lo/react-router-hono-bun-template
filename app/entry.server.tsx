import { createInstance } from "i18next"
import { isbot } from "isbot"
import ReactDOMServer from "react-dom/server.browser"
import { I18nextProvider, initReactI18next } from "react-i18next"
import {
	type EntryContext,
	type HandleDataRequestFunction,
	type RouterContextProvider,
	ServerRouter,
} from "react-router"
import i18n from "./localization/i18n" // your i18n configuration file
import i18nextOpts from "./localization/i18n.server"
import { resources } from "./localization/resource"
import { globalAppContext } from "./server/context"

const { renderToReadableStream } = ReactDOMServer

// Reject all pending promises from handler functions after 10 seconds
export const streamTimeout = 10000

export default async function handleRequest(
	request: Request,
	responseStatusCode: number,
	responseHeaders: Headers,
	context: EntryContext,
	appContext: RouterContextProvider
) {
	const instance = createInstance()
	const ctx = appContext.get(globalAppContext)
	const lng = ctx.lang
	// biome-ignore lint/suspicious/noExplicitAny: Route context type compatibility
	const ns = i18nextOpts.getRouteNamespaces(context as any)

	await instance
		.use(initReactI18next) // Tell our instance to use react-i18next
		.init({
			...i18n, // spread the configuration
			lng, // The locale we detected above
			ns, // The namespaces the routes about to render wants to use
			resources,
		})

	const userAgent = request.headers.get("user-agent")

	// Controller to abort the stream if needed
	const controller = new AbortController()
	const timeoutId = setTimeout(() => controller.abort(), streamTimeout + 1000)

	try {
		const stream = await renderToReadableStream(
			<I18nextProvider i18n={instance}>
				<ServerRouter context={context} url={request.url} />
			</I18nextProvider>,
			{
				signal: controller.signal,
				onError(error: unknown) {
					responseStatusCode = 500
					console.error(error)
				},
			}
		)

		// Wait for the stream to be ready based on user agent
		if (isbot(userAgent)) {
			// For bots, wait for the entire page to be ready
			await stream.allReady
		} else {
			// For browsers, start streaming as soon as the shell is ready
			// This is the default behavior, no need to wait
		}

		// Clear the timeout since we're successfully streaming
		clearTimeout(timeoutId)

		responseHeaders.set("Content-Type", "text/html")

		// @ts-expect-error - We purposely do not define the body as existent so it's not used inside loaders as it's injected there as well
		return ctx.body(stream, {
			headers: responseHeaders,
			status: responseStatusCode,
		})
	} catch (error) {
		clearTimeout(timeoutId)
		throw error
	}
}

export const handleDataRequest: HandleDataRequestFunction = async (response: Response, { request }) => {
	const isGet = request.method.toLowerCase() === "get"
	const purpose =
		request.headers.get("Purpose") ||
		request.headers.get("X-Purpose") ||
		request.headers.get("Sec-Purpose") ||
		request.headers.get("Sec-Fetch-Purpose") ||
		request.headers.get("Moz-Purpose")
	const isPrefetch = purpose === "prefetch"

	// If it's a GET request and it's a prefetch request and it doesn't have a Cache-Control header

	if (isGet && isPrefetch && !response.headers.has("Cache-Control")) {
		// we will cache for 10 seconds only on the browser
		response.headers.set("Cache-Control", "private, max-age=10")
	}

	return response
}
