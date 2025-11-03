

<p align="middle">
<img  width="900px" height="500px" src="./public/base-stack.png" />
</p>

# Forge 42 Base Stack

A modern, production-ready base stack built by Forge 42. This stack serves as the foundation for Forge 42 projects, featuring advanced capabilities with an ESM Vite setup powered by React Router v7.

**Built on the Forge 42 base-stack architecture** - This project extends the robust Forge 42 foundation with additional optimizations and modern tooling.

## 🚀 Features

This stack includes a comprehensive setup for React Router v7 framework mode with:

### Core Technologies
- **React 19** with react-compiler support
- **TypeScript** for type-safe development
- **TailwindCSS v4** with shadcn/ui components
- **Vite** for fast development and building
- **Bun** as the primary runtime and package manager

### Development Tools
- **Biome** for linting and formatting
- **Lefthook** for Git hooks
- **CI checks** for quality control
- **react-router-devtools** for debugging

### Backend & Architecture
- **Hono server** for high-performance API
- **react-router-hono-server** integration
- **Scripting system** with Bun runtime
- **Icons spritesheet generator**

### Internationalization
- **i18next** for client and server-side translations
- **Type-safe resources** with TypeScript support
- **Language switcher** component
- **Language detector** with fallback support
- **Current languages**: English (en) and Slovak (sk)

### SEO & Utilities
- **SEO tools**: robots.txt, sitemap-index, and dynamic sitemaps
- **Environment variable handling** for server and client
- **Client hints** for optimized user experience

### UI Components
- **shadcn/ui** component library
- **Lucide React** icons
- **Tailwind CSS animations** via tailwindcss-animate

## 🌍 Internationalization

This stack uses i18next for comprehensive internationalization support:

- **Multiple language support** with type-safe resources
- **Client-side translations** fetched on-demand
- **Built-in language switcher** component
- **Automatic language detection** from requests
- **Fallback language** support

**Adding new languages:**
1. Create a new locale directory: `resources/locales/{lang}/`
2. Add translation files following the existing structure
3. Update `app/localization/resource.ts` to include the new language

## 🛠 Hono Server

Powered by Hono for exceptional performance. Learn more about Hono [here](https://honojs.dev/).

The server includes:
- **i18next middleware** for internationalization
- **Caching middleware** for static assets
- **Global application context** for shared state
- **Environment variable injection**

Extend server functionality by modifying `entry.server.tsx`.

## 🔧 Environment Variables

The stack handles environment variables seamlessly:

- **Server-side**: Available via `process.env`
- **Client-side**: Injected and available via `window.env`
- **Type safety**: Full TypeScript support

Create a polyfill helper for cross-environment usage:
```ts
// app/utils/env.ts
export const polyEnv = typeof process !== "undefined" ? process.env : window.env;
```

## 📦 Package Manager

This stack uses **Bun** as the primary package manager and runtime:

- **Faster installs** compared to npm/pnpm
- **Built-in bundler** and test runner
- **TypeScript support** out of the box
- **Reducuced dependencies** and better performance

## 🚀 Getting Started

### Prerequisites
- **Node.js** >= 24.3.0
- **Bun** >= 1.3.0

### Installation

1. **Fork the repository**

2. **Install dependencies**:
```bash
bun install
```

3. **Review the documentation**:
   Read through the README.md files in the project to understand the architecture and decisions.

4. **Run the cleanup script**:
```bash
bun run cleanup
```
This removes base-stack specific files and configurations. The script will remove itself from package.json after completion.

5. **Start development server**:
```bash
bun run dev
```

6. **Begin building!** 🎉

## 📋 Available Scripts

```bash
# Development
bun run dev          # Start development server
bun run build        # Build for production
bun run start        # Start production server

# Code Quality
bun run check        # Run Biome linter
bun run check:fix    # Auto-fix linting issues
bun run typecheck    # Run TypeScript compiler
bun run validate     # Run all checks (lint + typecheck + unused)

# Utilities
bun run script <file>    # Execute a script from the scripts/ directory
bun run cleanup          # Clean up base-stack files
```

## 🏗 Project Structure

```
├── app/
│   ├── library/           # Reusable components and utilities
│   ├── localization/     # i18n configuration and resources
│   ├── routes/           # Application routes
│   ├── server/           # Server configuration
│   └── services/         # External service integrations
├── resources/
│   └── locales/         # Translation files (en, sk)
├── scripts/             # Utility scripts
└── public/              # Static assets
```

## 🧪 Testing

This stack focuses on essential tooling without a testing framework by default. You can add your preferred testing solution (Vitest, Jest, etc.) as needed.

## 📄 License

MIT License - see [LICENSE](LICENSE) file for details.

## 🔗 Links

- [React Router Documentation](https://reactrouter.com/)
- [Hono Documentation](https://honojs.dev/)
- [TailwindCSS Documentation](https://tailwindcss.com/)
- [Bun Documentation](https://bun.sh/)
- [shadcn/ui Documentation](https://ui.shadcn.com/)

---

**Built with ❤️ by Forge 42**
