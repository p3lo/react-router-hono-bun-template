import { Globe } from "lucide-react"
import { useTranslation } from "react-i18next"
import { useLocation } from "react-router"
import { Button } from "~/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "~/components/ui/dropdown-menu"
import { supportedLanguages } from "~/localization/resource"
import { Link } from "../link"

const languageNames: Record<string, string> = {
	en: "English",
	sk: "Slovensky",
}

const languageFlags: Record<string, string> = {
	en: "🇺🇸",
	sk: "🇸🇰",
}

const LanguageSwitcher = () => {
	const { i18n } = useTranslation()
	const location = useLocation()
	const currentLanguage = i18n.language

	return (
		<div className="fixed top-4 right-4 z-50">
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button
						variant="outline"
						size="sm"
						className="gap-2 border-border/50 bg-background/95 shadow-lg backdrop-blur-sm transition-all duration-200 hover:bg-accent/50"
					>
						<Globe className="h-4 w-4" />
						<span className="flex hidden items-center gap-2 sm:inline">
							<span>{languageFlags[currentLanguage]}</span>
						</span>
						<span className="sm:hidden">{languageFlags[currentLanguage]}</span>
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent align="end" className="min-w-[160px]">
					{supportedLanguages.map((language) => (
						<DropdownMenuItem key={language} asChild>
							<Link
								to={`${location.pathname}`}
								language={language}
								keepSearchParams
								onClick={() => i18n.changeLanguage(language)}
								className={`flex w-full flex-1 cursor-pointer items-center gap-3 bg-accent text-accent-foreground ${
									currentLanguage === language ? "bg-accent text-accent-foreground" : ""
								}`}
							>
								<span className="text-lg">{languageFlags[language]}</span>
								<span className="flex-1">{languageNames[language]}</span>
								{currentLanguage === language && <span className="text-muted-foreground text-xs">✓</span>}
							</Link>
						</DropdownMenuItem>
					))}
				</DropdownMenuContent>
			</DropdownMenu>
		</div>
	)
}

export { LanguageSwitcher }
