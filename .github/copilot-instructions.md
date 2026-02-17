# Copilot Instructions for Giger

## Project Overview

Giger is a LARP (Live Action Role Playing) web application simulating a dystopian cyberpunk world. Players interact with gigs, banking, chat, identity systems, and hacking modules. It's a monorepo with three independent applications running behind an nginx reverse proxy via Docker Compose.

## Architecture

**Three main components:**

- **`frontend/`** — React 18 + TypeScript SPA built with Vite
  - Redux Toolkit for state management (slices in `frontend/src/store/`)
  - react-router-dom for routing, react-intl for i18n
  - SCSS for styling, PWA with vite-plugin-pwa
  - Five app modules: `giger` (gig marketplace), `chat`, `bank`, `myId` (identity/records), `login`

- **`backendDotnet/Giger/`** — ASP.NET Core 8 Web API (C#)
  - Entity Framework Core 9 with PostgreSQL (Npgsql)
  - REST controllers under `/api/`
  - Two WebSocket endpoints: `/ws1337` (conversations), `/ws2137` (notifications)
  - Token-based auth via `AuthToken` header

- **`hacking/`** — Electron desktop app (React + TypeScript + Webpack)
  - Hacking minigame module
  - Based on electron-react-boilerplate

**Infrastructure:**
- nginx reverse proxy: `/` → frontend, `/api/` → backend, `/ws*` → backend WebSockets
- PostgreSQL 16 (credentials: giger/giger, database: giger)
- Backend runs 3 replicas in production

**Data submodule:** `data/` is a git submodule from `gig3r-com/giger-data` containing test/seed datasets. Update with `git submodule update --remote`.

## Build, Test, and Lint Commands

### Full Stack (Docker)
```sh
# Build and start everything (available at localhost:8080)
docker compose up -d --build

# Stop all services
docker compose down

# Reset database
docker compose down && rm -rf ./volumes/postgres && docker compose up -d
```
Port configurable via `APP_PORT` in `.env` (defaults to 8080).

### Frontend
```sh
cd frontend
npm install
npm run local    # Dev server using .env.local (points to localhost:8080)
npm run dev      # Dev server using .env.dev
npm run build    # Production build (tsc + vite build)
npm run lint     # ESLint
npm run prettier-format  # Format all TS files
```

### Backend (.NET)
```sh
cd backendDotnet/Giger
dotnet build
dotnet run       # Starts on port 8080, needs PostgreSQL running
```
Connection string configured in `appsettings.json` (`ConnectionStrings:DefaultConnection`).
In Docker, DB connection set via environment variables (`GigerDB__Host`, etc.).

### Hacking Module (Electron)
```sh
cd hacking
npm install
npm start        # Dev mode (Electron)
npm run package  # Build distributable
npm run lint
```

### E2E Tests (Playwright)
```sh
# From repo root (requires stack running on localhost:8080)
npx playwright test                       # Run all tests
npx playwright test tests/login.spec.ts   # Run single test file
npx playwright test --project=chromium    # Run on specific browser
```

## Key Conventions

### Frontend State Management
- **Redux slices:** One slice per domain in `frontend/src/store/` (gigs, messages, users, bank, events, auth)
- **Selectors:** Co-located with slices (e.g., `gigs.selectors.ts` alongside `gigs.slice.ts`)

### Frontend Environment Configuration
- Environment-specific API endpoints in `frontend/src/env/.env.{local,dev,prod}`
- Access via `VITE_API_ENDPOINT` and `VITE_WEBSOCKET_ENDPOINT`
- Use `npm run local` for local development (points to localhost:8080)

### Backend Service Registration
- All services implement `IGigerService` marker interface
- Services are auto-discovered and registered as scoped via reflection in `ServicesExtensions.cs`
- To add a new service: implement `IGigerService`, it will be automatically registered

### Backend Database
- `GigerDbContext` (EF Core) defines all DbSets
- Custom value conversions for stat types: `CharStat`, `SkillStat`, `CyberwareLevel`, `GigReputationLevels`

### WebSocket Communication
- Custom `SocketsManagement` in `Connections/` directory (not SignalR)
- Two endpoints: `/ws1337` for conversations, `/ws2137` for notifications

### Authentication
- Debug bypass: When `#DEBUG` is defined and `AuthController.AuthEnabled` is false, auth middleware is skipped

### CI/CD and Testing Environments
- GitHub Actions workflows in `.github/workflows/`
- Auto-builds Docker images and deploys per-PR environments
- Helm chart deployments for dev/prod
- Test data from `data/` submodule, branch configurable in `.gitmodules`
