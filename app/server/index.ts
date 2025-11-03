import { i18next } from "remix-hono/i18next"
import { i18nextOptions } from "../localization/i18n.server"
import { getLoadContext } from "./context"

// Use Node adapter in development (Vite), Bun adapter in production
const createHonoServer = (
	process.env.NODE_ENV === "production"
		? (await import("react-router-hono-server/bun")).createHonoServer
		: (await import("react-router-hono-server/node")).createHonoServer
) as typeof import("react-router-hono-server/node").createHonoServer

export default await createHonoServer({
	configure(server) {
		server.use("*", i18next(i18nextOptions))
	},
	defaultLogger: false,
	getLoadContext,
})
