# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Giger is a LARP (Live Action Role Playing) web application simulating a dystopian cyberpunk world. Players interact with gigs, banking, chat, identity systems, and hacking modules. It consists of three main components running behind an nginx reverse proxy via Docker Compose.

## Architecture

**Monorepo with three independent applications:**

- **`frontend/`** — React 18 + TypeScript SPA built with Vite. Uses Redux Toolkit for state management, react-router-dom for routing, react-intl for i18n, SCSS for styling, and is a PWA (vite-plugin-pwa). Five "app" modules: `giger` (gig marketplace), `chat`, `bank`, `myId` (identity/records), `login`.
- **`backendDotnet/Giger/`** — ASP.NET Core 8 Web API (C#). Uses Entity Framework Core 9 with PostgreSQL (Npgsql). Exposes REST controllers under `/api/` and two WebSocket endpoints (`/ws1337` for conversations, `/ws2137` for notifications). Services are auto-registered via reflection (`IGigerService` interface). Auth is token-based via `AuthToken` header.
- **`hacking/`** — Electron desktop app (React + TypeScript + Webpack) for the hacking minigame module. Based on electron-react-boilerplate.

**Infrastructure (docker-compose.yaml):**
- `nginx` — reverse proxy: `/` → frontend, `/api/` → backend, `/ws*` → backend WebSockets
- `frontend` — serves built SPA
- `backend` — 3 replicas of the .NET API
- `postgres` — PostgreSQL 16 (credentials: giger/giger, database: giger)

**Data submodule:** `data/` is a git submodule from `gig3r-com/giger-data`, containing test/seed datasets. Update with `git submodule update --remote`.

## Build & Run Commands

### Full stack (Docker)
```sh
docker compose up -d --build          # Build and start everything
docker compose down                    # Stop all services
# Reset database:
docker compose down && rm -rf ./volumes/postgres && docker compose up -d
```
App available at `localhost:8080` (configurable via `APP_PORT` in `.env`).

### Frontend only
```sh
cd frontend
npm install
npm run local    # Dev server using .env.local (points to localhost:8080)
npm run dev      # Dev server using .env.dev
npm run build    # Production build (tsc + vite build)
npm run lint     # ESLint
npm run prettier-format  # Format all TS files
```

### Backend only
```sh
cd backendDotnet/Giger
dotnet build
dotnet run        # Starts on port 8080, needs PostgreSQL running
```
Connection string configured in `appsettings.json` (`ConnectionStrings:DefaultConnection`).
In Docker, DB connection is set via environment variables (`GigerDB__Host`, etc.).

### Hacking module
```sh
cd hacking
npm install
npm start         # Dev mode (Electron)
npm run package   # Build distributable
npm run lint
```

### E2E Tests (Playwright)
```sh
# From repo root (requires stack running on localhost:8080)
npx playwright test                    # Run all tests
npx playwright test tests/login.spec.ts  # Single test file
npx playwright test --project=chromium   # Single browser
```

## Key Patterns

- **Frontend state:** Redux slices in `frontend/src/store/` — one slice per domain (gigs, messages, users, bank, events, auth) with co-located selectors.
- **Frontend env:** Environment-specific API endpoints in `frontend/src/env/.env.{local,dev,prod}`. Accessed via `VITE_API_ENDPOINT` and `VITE_WEBSOCKET_ENDPOINT`.
- **Backend services:** All services implement `IGigerService` and are auto-discovered/registered as scoped via reflection in `ServicesExtensions.cs`.
- **Backend DB:** `GigerDbContext` (EF Core) defines all DbSets. Custom value conversions for stat types (CharStat, SkillStat, CyberwareLevel, GigReputationLevels).
- **Auth bypass in debug:** When `#DEBUG` is defined and `AuthController.AuthEnabled` is false, auth middleware is skipped.
- **WebSockets:** Managed via custom `SocketsManagement` in `Connections/` directory, not SignalR.

## CI/CD

GitHub Actions workflows in `.github/workflows/`:
- Auto-builds Docker images and deploys per-PR environments
- Helm chart deployments for dev/prod
