import english from "../../resources/locales/en/common.json"
import slovak from "../../resources/locales/sk/common.json"

const languages = ["en", "sk"] as const
export const supportedLanguages = [...languages]
export type Language = (typeof languages)[number]

export type Resource = {
	common: typeof english
}

export type Namespace = keyof Resource

export const resources: Record<Language, Resource> = {
	en: {
		common: english,
	},
	sk: {
		common: slovak,
	},
}

declare module "i18next" {
	export interface CustomTypeOptions {
		defaultNS: "common"
		fallbackNS: "common"
		// custom resources type
		resources: Resource
	}
}
