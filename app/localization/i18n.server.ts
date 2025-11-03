import type { RemixI18NextOption } from "remix-i18next/server"
import { RemixI18Next } from "remix-i18next/server"
import i18n from "~/localization/i18n" // your i18n configuration file
import { resources } from "./resource"

// Export configuration for remix-hono middleware
export const i18nextOptions: RemixI18NextOption = {
	detection: {
		supportedLanguages: i18n.supportedLngs,
		fallbackLanguage: i18n.fallbackLng,
		order: ["searchParams", "cookie", "header"],
	},
	// This is the configuration for i18next used
	// when translating messages server-side only
	i18next: {
		...i18n,
		resources,
	},
}

// Create instance for use in entry.server.tsx
const i18next = new RemixI18Next(i18nextOptions)

export default i18next
