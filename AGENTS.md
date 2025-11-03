# AGENTS.md

This document is written specifically for autonomous agents (or humans acting as agents) that will work on this repository. It complements `CLAUDE.md` by focusing on operational guidance, safe editing patterns, and tasks an agent is likely to be asked to perform.

## Purpose

- Give an agent a compact, prioritized view of this repository and how to interact with it.
- Describe safe modification patterns, important files to inspect, and commands to validate changes.
- Provide troubleshooting tips and checklist-style flows for common agent tasks (dev, build, deploy, add features, i18n, accessibility, tests, and linting).

## Quick links (files & folders to inspect first)

- `app/` — application source (routes, components, localization, server)
- `app/routes/` — route-based files (React Router v7 framework mode)
- `app/entry.server.tsx` — server-side entry (Hono integration, SSR)
- `app/entry.client.tsx` — client entry (hydration)
- `app/server/context.ts` — server context & middleware
- `app/localization/` — i18n configuration and resources
- `resources/locales/` — translation files
- `app/components/ui/` — shared UI components (shadcn/ui)
- `build/` and `public/` — generated output; avoid editing directly
- `package.json`, `bun.lockb` — dependency/lock manifests
- `biome.json`, `lefthook.yml`, `knip.json` — linting, hooks, dead-code detection

## Quick Commands (copyable)

Run these in the project root (macOS, zsh):

```bash
bun install
bun run dev
bun run build
bun run start
bun run typegen
bun run check
bun run check:fix
bun run typecheck
bun run validate
bun run script <file>
```

Notes:

- Use `bun run typegen` after changing routes to regenerate route types.
- `bun run dev` is the canonical development start for framework-mode React Router + Hono.

## Environment & Secrets

- This repo references an `.env.example` in documentation; create a local `.env` from it for development.
- Never commit real secrets or API keys. Use environment variables and secret stores for CI/production.

Minimal `.env.example` (also included in repository):

- `PORT=3000`
- `NODE_ENV=development`
- `DATABASE_URL=postgres://user:pass@localhost:5432/dbname`
- `SESSION_SECRET=change-me`
- `SENTRY_DSN=`

## Agent Guidelines — how to work here

1. Read `CLAUDE.md` and this file before making changes.
1. For code changes, run lint and typecheck locally first:

```bash
bun run check
bun run typecheck
```

1. Run `bun run dev` to verify changes visually and in the dev logs.
1. After route changes run `bun run typegen` and re-run the typecheck.
1. If you add translations, update `resources/locales/{lang}/common.json` and export the language in `app/localization/resource.ts`.
1. Do not edit files under `build/` — these are generated output.
1. When touching server code, verify SSR by visiting pages that rely on loaders (or run integration smoke checks).
1. If you modify icons or `resources/icons/`, confirm spritesheet generation is still working (see Vite plugin configuration in `vite.config.ts`).

## PR / Commit Expectations

- Code must pass Biome and TypeScript checks before opening a PR.
- Keep changes focused and create small PRs with descriptive titles.
- Add or update tests (if any test framework is added) and include screenshots or reproduction steps for UI changes when applicable.
- Run `knip` to ensure you didn't leave unused code:

```bash
bun run validate
```

## Common Tasks & Checklists

- Add a new route
  - Create `app/routes/MyRoute.tsx` or appropriate filename
  - Implement `loader` / `action` as needed
  - Run `bun run typegen`
  - Run `bun run dev` and visit the route
  - Update sitemap/SEO pages if the route should be public

- Add a new language
  - Add `resources/locales/{lang}/common.json`
  - Export in `app/localization/resource.ts`
  - Confirm server-side i18n picks it up: run dev and test Accept-Language header or language switcher

- Fix an SSR bug
  - Reproduce locally with `bun run dev`
  - Check server logs (Hono output) and React Router loader error traces
  - Add additional logging in `app/server/context.ts` only if necessary

## Testing & Debugging Tips

- No testing framework is configured by default. If you add one, wire it into `package.json` scripts and CI.
- Use `bun run typecheck` frequently; Bun's TypeScript runtime can expose typing differences vs tsc in some setups — prefer `bun run typecheck` (which runs tsc) for accuracy.
- To debug server-side code, add console logs or structured logger entries in `app/server/context.ts` or `app/entry.server.tsx`.

## CI / Pre-commit Hooks

- Lefthook runs Biome and TypeScript checks on pre-commit. If a commit is failing hooks locally, run the same commands manually and fix reported issues.
- Knip is used to detect dead code. If Knip flags files you think are unused, verify imports and route registration before removing.

## Performance & Production Notes

- Bun is the recommended runtime and package manager. Verify the Bun version in CI and runtime environments.
- Assets and spritesheets are generated at build time — ensure Vite plugins are configured correctly if you modify them.
- Server-side caching and static asset headers are handled in `app/entry.server.tsx` / Hono middleware — modify carefully.

## Security & Privacy

- Keep `.env` out of source control. Add sensitive config to your CI secret store.
- Be mindful of translations that may expose user data in logs — never log raw user content in production.

## Agent-safe behaviors & constraints

- Do not modify `build/` or `public/` generated assets.
- Avoid committing secret values; use `process.env` for server-side secrets.
- Prefer minimal, reversible changes. When in doubt, open a draft PR and explain why a change is needed.
- For any destructive migration (DB schema), propose a migration plan and add backups.

## Example prompts for agents (useful when interacting with LLMs)

- "Add a new route `/about` with SSR loader that fetches top 5 posts from `/api/posts` and renders them client-side. Add translations for en and sk."
- "Update the Header component to use the new shadcn button variant and ensure accessibility (aria-labels). Run lint and typecheck and fix issues."
- "Investigate a 500 error thrown during SSR for the `/` route. Reproduce locally and add a failing test or a local script that reproduces the issue."

## When to escalate to a human

- Database migrations or schema changes
- Security-related fixes involving secrets or authentication
- Significant architecture changes (e.g. replacing Hono with another server)
- CI/CD credential or deployment configuration changes

## Contact / Maintainers

- The repository owner is declared in the repo metadata: `p3lo`.
- Open issues/PRs with clear reproduction steps and logs.

---

If you want, I can now:

- Create `AGENTS.md` in the repository (already done)
- Create a minimal `.env.example` template (done)
- Run a quick `bun run check` / `bun run typecheck` to validate the repo (requires running commands locally)

Happy to make the AGENTS.md more/less opinionated — tell me which voice you prefer (strict CI enforcer, friendly pair-programmer, or auto-PR bot) and I’ll adapt it.
