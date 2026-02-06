# CapCut Templates Platform

## Overview

This is a CapCut Templates website — a platform where users browse collections of CapCut video editing templates. Each collection contains multiple template variants (typically 6). The site features a dark theme with neon purple accents, Pinterest-style masonry grid layout, and requires user authentication to access template download links. The app is built as a full-stack TypeScript application with a React frontend and Express backend, backed by PostgreSQL.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend
- **Framework**: React 18 with TypeScript, bundled by Vite
- **Routing**: Wouter (lightweight client-side router)
- **State/Data Fetching**: TanStack React Query for server state management
- **UI Components**: shadcn/ui (new-york style) built on Radix UI primitives
- **Styling**: Tailwind CSS with CSS variables for theming. Dark theme is the default — pure black background (`#000`) with neon purple (`#A855F7`) accents
- **Layout**: `react-masonry-css` for Pinterest-style grid on the home page
- **Animations**: Framer Motion for smooth page/component transitions
- **Fonts**: Outfit (display) and Plus Jakarta Sans (body), loaded via Google Fonts
- **Path aliases**: `@/` maps to `client/src/`, `@shared/` maps to `shared/`

### Backend
- **Runtime**: Node.js with Express
- **Language**: TypeScript, executed via `tsx` in development
- **API Structure**: RESTful JSON API under `/api/` prefix. Route definitions are shared between client and server via `shared/routes.ts` using Zod schemas for input validation and response typing
- **Authentication**: Replit Auth (OpenID Connect) via Passport.js with session storage in PostgreSQL. Auth middleware and routes live in `server/replit_integrations/auth/`
- **Session Management**: `express-session` with `connect-pg-simple` storing sessions in a `sessions` table

### Database
- **Database**: PostgreSQL (required — `DATABASE_URL` environment variable must be set)
- **ORM**: Drizzle ORM with `drizzle-zod` for schema-to-validation integration
- **Schema location**: `shared/schema.ts` (main tables) and `shared/models/auth.ts` (auth tables)
- **Migrations**: Managed via `drizzle-kit push` (`npm run db:push`)
- **Key tables**:
  - `collections` — template collections with title, slug, cover image, trending/new flags
  - `variants` — individual template variants belonging to a collection (preview video URL, CapCut template link)
  - `edit_requests` — user-submitted editing requests with status tracking
  - `users` — user profiles synced from Replit Auth (mandatory, do not drop)
  - `sessions` — session storage (mandatory for Replit Auth, do not drop)

### Shared Code (`shared/`)
- `schema.ts` — Drizzle table definitions, relations, and Zod insert schemas
- `routes.ts` — API route definitions with paths, methods, Zod input/output schemas. Used by both server (for validation) and client (for type-safe fetching)
- `models/auth.ts` — Auth-related table definitions (users, sessions)

### Build System
- **Development**: `npm run dev` — runs the Express server with Vite dev middleware for HMR
- **Production build**: `npm run build` — Vite builds the client to `dist/public/`, esbuild bundles the server to `dist/index.cjs`
- **Production start**: `npm run start` — runs the bundled server which serves static files from `dist/public/`

### Key Pages
- `/` — Home page with hero section and masonry grid of all collections
- `/trending` — Filtered view showing trending collections
- `/new` — Filtered view showing new arrivals
- `/template/:slug` — Template detail page showing collection info and its variants. Template links are gated behind authentication

### Design Patterns
- **Storage interface pattern**: `IStorage` interface in `server/storage.ts` with `DatabaseStorage` implementation, making it possible to swap storage backends
- **Centralized API client**: `client/src/lib/queryClient.ts` provides `apiRequest` helper and configured QueryClient
- **Custom hooks**: `use-auth.ts` for authentication state, `use-collections.ts` for data fetching, `use-toast.ts` for notifications

## External Dependencies

- **PostgreSQL**: Required database. Connection via `DATABASE_URL` environment variable
- **Replit Auth (OpenID Connect)**: Authentication provider. Requires `ISSUER_URL` (defaults to `https://replit.com/oidc`), `REPL_ID`, and `SESSION_SECRET` environment variables
- **Google Fonts**: Outfit and Plus Jakarta Sans fonts loaded via CDN
- **Unsplash**: Used for placeholder images (referenced by URL in components)
- **shadcn/ui**: Component library configured in `components.json` with new-york style, TypeScript, and Tailwind CSS variables
- **Replit Vite plugins**: `@replit/vite-plugin-runtime-error-modal`, `@replit/vite-plugin-cartographer`, `@replit/vite-plugin-dev-banner` (dev-only Replit integrations)