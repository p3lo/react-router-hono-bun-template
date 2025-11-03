# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a **modern React Router v7 full-stack web application template** optimized for Bun runtime. It's a customized fork of the Forge 42 base-stack with significant enhancements for performance and developer experience.

**Core Stack:**
- React 19 with React Compiler
- React Router v7 (framework mode)
- Hono server for backend API
- Bun as package manager and runtime
- TailwindCSS v4 with shadcn/ui components
- TypeScript throughout
- Vite for build tooling
- i18next for internationalization (English/Slovak)

## Common Commands

### Development Workflow
```bash
bun install              # Install dependencies
bun run dev              # Start development server (react-router dev)
bun run build            # Production build
bun run start            # Start production server
bun run typegen          # Generate React Router types
```

### Code Quality & Validation
```bash
bun run check            # Run Biome linter
bun run check:fix        # Auto-fix linting issues
bun run typecheck        # Run TypeScript compiler
bun run validate         # Run all checks (lint + typecheck + unused code detection)
```

### Utilities
```bash
bun run script <file>    # Execute a script from the scripts/ directory
bun run cleanup          # Clean up base-stack files (one-time setup)
```

### Testing
**No testing framework is configured by default.** Add your preferred solution (Vitest, Jest, etc.) as needed.

## High-Level Architecture

This is a **framework-mode React Router v7 application** with server-side rendering via Hono:

### Directory Structure

```
app/
├── components/ui/              # shadcn/ui component library (button, dropdown-menu, etc.)
├── library/                    # Reusable components and utilities
│   ├── icon/                   # Icon system with spritesheet generation
│   ├── language-switcher/      # Language switching UI component
│   └── link/                   # Link utilities
├── localization/               # i18n configuration
│   ├── i18n.ts                 # Client-side i18next setup
│   ├── i18n.server.ts          # Server-side i18next setup
│   └── resource.ts             # Translation resources (add new languages here)
├── routes/                     # React Router routes
│   ├── _index.tsx              # Homepage route
│   ├── $.tsx                   # Catch-all route for 404s
│   ├── resource.locales.ts     # Locale resource routes
│   ├── robots[.]txt.ts         # SEO robots.txt
│   ├── sitemap-index[.]xml.ts  # Sitemap index
│   └── sitemap.$lang[.]xml.ts  # Dynamic sitemaps by language
├── server/                     # Hono server setup
│   ├── context.ts              # Application context (extend here for server functionality)
│   └── index.ts                # Server entry point
├── services/                   # External service integrations
├── utils/                      # Utility functions
├── lib/                        # Shared libraries
├── entry.client.tsx            # Client entry point
├── entry.server.tsx            # Server entry point (Hono integration - customize here)
├── root.tsx                    # Root layout component
├── routes.ts                   # Route declarations
└── tailwind.css                # TailwindCSS styles

resources/
├── icons/                      # Source icons (auto-generated into spritesheet)
└── locales/                    # Translation files
    ├── en/common.json          # English translations
    └── sk/common.json          # Slovak translations
```

### Key Architecture Patterns

**1. React Router Framework Mode**
- Routes are defined as files in `app/routes/` (flat file routing)
- Route modules auto-export `loader`, `action`, `default`, etc.
- Type generation via `bun run typegen` creates types for loaders/actions

**2. Server-Side Rendering**
- Hono provides high-performance server runtime
- React Router v7 integrates with Hono via `react-router-hono-server`
- Entry points: `entry.server.tsx` (SSR) and `entry.client.tsx` (hydration)

**3. Internationalization**
- i18next configured for both client and server
- Client fetches translations on-demand
- Server auto-detects language from requests
- **To add new languages:**
  1. Create `resources/locales/{lang}/common.json`
  2. Add to `app/localization/resource.ts` exports
  3. Import in `app/localization/i18n.ts` and `i18n.server.ts`

**4. Environment Variables**
- Server-side: `process.env`
- Client-side: `window.env` (injected at build)
- Type definitions in `env.d.ts`
- Template in `.env.example`

**5. Styling System**
- TailwindCSS v4 with "new-york" shadcn/ui style
- Component library in `app/components/ui/`
- Custom animations via `tailwindcss-animate`
- CSS variables for theming

## Development Tools Configuration

**Biome** (`biome.json`): Fast linter/formatter replacing ESLint + Prettier
- Custom rules: unused imports/variables detection, Tailwind class sorting
- Integrated into pre-commit hooks

**Lefthook** (`lefthook.yml`): Git hooks
- Pre-commit: runs `biome check --write`, `tsc -p tsconfig.json`, `knip`

**Knip** (`knip.json`): Dead code detection
- Ignores UI components from checks
- Entry points: scripts, routes, server

**Vite** (`vite.config.ts`): Build configuration with plugins for:
- React Router v7 + Hono server
- React Compiler (build-time optimization)
- Icon spritesheet generator
- TailwindCSS v4

## Important README Details

**Key Improvements over Forge 42 base-stack:**
- Bun runtime optimization (faster installs, built-in TypeScript)
- Modern server architecture (dynamic adapter switching)
- Slovak localization (updated from Bosnian)
- Streamlined dependencies
- Enhanced UI with shadcn/ui

**Learning Resources:**
- [React Router v7 Documentation](https://reactrouter.com/)
- [Hono Documentation](https://honojs.dev/)
- [TailwindCSS Documentation](https://tailwindcss.com/)
- [Bun Documentation](https://bun.sh/)
- [shadcn/ui Documentation](https://ui.shadcn.com/)

**Prerequisites:**
- Node.js >= 24.3.0
- Bun >= 1.3.0

**One-time Setup:**
Run `bun run cleanup` after installation to remove base-stack specific files.

## Server-Side Customization

**Extend server functionality** by modifying:
- `app/server/context.ts` - Add application-wide context/middleware
- `app/entry.server.tsx` - Customize Hono server setup

The server includes built-in middleware for:
- i18next (internationalization)
- Static asset caching
- Environment variable injection
- Global application context

## Development Best Practices

**Code Quality:**
- All code must pass Biome linting and TypeScript type checking
- Unused code is detected via Knip
- Pre-commit hooks enforce quality standards

**Routing:**
- Use flat file routing in `app/routes/`
- Follow React Router v7 conventions for `loader`, `action`, etc.
- Generate types after route changes: `bun run typegen`

**Styling:**
- Use shadcn/ui components from `app/components/ui/`
- Follow TailwindCSS v4 patterns
- Maintain "new-york" style consistency

**Internationalization:**
- Add new translations to `resources/locales/`
- Use `useTranslation()` hook in components
- Update `app/localization/resource.ts` for type-safe access

## SEO Features

Built-in SEO tools:
- Dynamic `robots.txt` at `/robots.txt`
- Sitemap index at `/sitemap-index.xml`
- Language-specific sitemaps at `/sitemap-{lang}.xml`

These are generated automatically from routes and can be customized in `app/routes/`.