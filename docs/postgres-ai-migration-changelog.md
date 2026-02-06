# PostgreSQL Migration Branch Changelog

Full changelog for `haluny_postgres_newmodel` — migrating the Giger backend from MongoDB to PostgreSQL.

## Branch Summary

This branch replaces the entire MongoDB-based persistence layer with PostgreSQL using Entity Framework Core 9 + Npgsql. The work was done in two phases:

**Phase 1 (JZielnik, Jul–Nov 2025):** Core migration — swapped MongoDB driver for EF Core + Npgsql, created `GigerDbContext` with all `DbSet`s, restructured models from MongoDB document-style to relational (junction tables, normalized schema), replaced all service classes to use EF Core queries, and set up PostgreSQL in Docker Compose with init scripts.

**Phase 2 (Claude AI + zefir, Feb 2026):** Bug fixing and frontend compatibility — the app booted but most features were broken due to data model mismatches between the new relational backend and the frontend's expectations. Fixed chat, banking, gigs, and MyID by introducing a DTO layer that maps EF Core entities to the JSON shapes the frontend expects. Created the data conversion pipeline (`scenario.xlsx` → Python script → SQL seed data). No frontend code was modified.

### Key architectural decisions made across both phases:
- **Single User class** replacing `UserPublic` → `UserPrivate` → `UserFull` inheritance chain
- **Junction tables** (`AccountOwners`, `ConversationParticipants`, `SubnetworkUsers`, `GigRevealedTo`, etc.) replacing embedded arrays
- **JSONB columns** for `GigReputation`, `EpsilonData`, `Network.Nodes`, `Network.Data`, `Log.HackData`
- **`text[]` arrays** for `Roles`, `Exploits`, `Subnetworks`, `Ice`, `PastHacks`
- **String enums** — all enums stored as plain strings instead of numeric values
- **DTO layer** — controllers return DTOs (not raw EF entities) to handle field renames, stat wrapping (`int` → `{stat: N}`), and navigation property flattening
- **Seed data via docker-entrypoint-initdb.d** — PostgreSQL runs `00-schema.sql` + `01-data.sql` on first init; EF Core `EnsureCreated()` is a no-op on existing tables

---

## Phase 1: Core Migration (JZielnik)

### fd0e6d8 — Moved DB from Mongo to Postgres

Initial migration: replaced `MongoDB.Driver` NuGet package with `Microsoft.EntityFrameworkCore` 9.0.7 + `Npgsql.EntityFrameworkCore.PostgreSQL` 9.0.4. Created `GigerDbContext` with DbSets for all entities. Rewrote all service classes (previously using `IMongoCollection<T>`) to use EF Core LINQ queries. Removed the Next.js-based epsilon admin panel (replaced later on `main`). Updated `docker-compose.yaml` to use PostgreSQL 16 instead of MongoDB.

### 09a82c4 — Updated DataSerializers

Cleaned up `DatabaseSerializer` project — removed MongoDB-specific attributes (`BsonId`, `BsonElement`, etc.) from serialization models.

### b4bf180 — First migration attempt

Expanded the EF Core setup: built out `GigerDbContext.OnModelCreating()` with entity configurations for junction tables (composite keys, foreign keys), added `ScopedServiceProvider` helper for DI in WebSocket handlers, configured PostgreSQL connection string in `appsettings.json`, restructured `docker-compose.yaml` with init script mounts. Added `LoginService` query methods adapted for EF Core. Created `docs/newTypesBackend.txt` documenting the new type system.

### ce023ab — Improvements

Standardized all controller implementations to work with EF Core services. Improved `GigerDbContext` entity configurations. Fixed service registration.

### 65398c8 — rework by claude, ale dalej nie działa ładowanie danych

Major model rework: consolidated `UserPublic`/`UserPrivate`/`UserSimple` into a single `User` class. Replaced stat structs (`CharStat`, `SkillStat`, `CyberwareLevel` with custom JSON converters) with plain `int` fields. Removed enum types (`UserEnums.cs`) — all enums stored as strings. Created `UserFavoriteUser`, `UserEpsilonConversationNote`, `RecordType` as separate entities with FK to User. Deleted obsolete services (`AnonymizedService`, `ObscuredDataService`, `HackConfigService`, `ImplantsService`). Added `RecordService` and `PlotService`. Reworked `GigerDbContext` with Include-based eager loading and proper navigation property configuration. Updated data submodule and `docker-compose.yaml`.

At this point the app started but data loading and most features were still broken.

---

## Phase 2: Bug Fixes and Frontend Compatibility (Claude AI)

### eb11d8d — jakby działa
### e801229 — trochę więcej fixów halunomaszyny

Early stabilization: basic EF Core fixes, startup adjustments, getting the app to boot and serve data.

### 82beb60 — scale down to 1 replica of backend

Changed `docker-compose.yaml` to run a single backend replica instead of 3, simplifying debugging during migration work.

### c112c64 — revert frontend changes

Reverted any frontend modifications — all fixes are backend-only. The frontend code remains identical to `main`.

### 4d10c75 — startowanie konwersacji działa

**Fixed chat/conversation creation.** The old code used `async void` WebSocket handlers and broken DI scope management that silently swallowed errors.

Key changes:
- **`ConversationMessageHandler.cs`** — Complete rewrite of WebSocket message handling:
  - Replaced `async void` with `async Task` to surface exceptions
  - Fixed DI: uses `_serviceProvider.CreateScope()` instead of broken `ScopedServiceProvider` helper
  - Created `IncomingMessagePayload` DTO to properly deserialize incoming WebSocket messages (frontend sends `{text, sender, date}`, not the full `Message` model)
  - Messages are now added directly via `DbContext.Messages.Add()` instead of trying to update the conversation's navigation collection
  - Proper UTC timestamp parsing
- **`ConversationController.cs`** — Rewrote `POST` endpoint for creating conversations:
  - Added `CreateConversationRequest` DTO matching what the frontend sends (`participants`, `anonymizedUsers`, `messages`, `gigConversation`)
  - Participants, anonymized users, and initial messages are now inserted into their junction/child tables explicitly via DbContext
  - Returns `ConversationDTO` instead of raw `Conversation` entity
- **`ConversationDTO.cs`** (new) — Maps `Conversation` + its navigation properties to the flat structure the frontend expects (`participants` as `string[]`, `messages` array, `anonymizedUsers` array, etc.)

### 3e729b9 — przelewy widać teraz

**Fixed banking — transfers and account display.**

Key changes:
- **`AccountDTO.cs`** (new) — DTO wrapping `Account` with resolved owner handle and flattened transactions
- **`TransactionDTO`** (inside AccountDTO.cs) — Maps transactions with `fromUser`/`toUser` fields resolved from account numbers → owner handles
- **`AccountController.cs`** — `GetByOwner` endpoint now:
  - Returns `List<AccountDTO>` instead of raw `List<Account>`
  - Queries both outgoing AND incoming transactions (previously only showed outgoing)
  - Builds an `accountNumber → ownerHandle` lookup map for transaction display names

### 06a20e5 — gigs display naprawiony

**Fixed gig listing — "Locked Entry" issue and DTO mapping.**

Key changes:
- **`GigDTO.cs`** (new) — Maps `Gig` entity to frontend-expected shape:
  - `IsRevealed` and `IsRevealedByClient` default to `true` (removed broken junction-table-based recalculation that compared `AuthorHandle="AnoNyMUS"` against actual user handles in `GigRevealedTo`)
  - Properly maps all gig fields including status updates
- **`GigController.cs`** — `GetAll` endpoint returns `List<GigDTO>` instead of raw `List<Gig>`

### e1121e2 — Add missing MyID record endpoints for frontend compatibility

**Fixed MyID records, goals, relations, medical, criminal events being empty.**

The frontend calls 6 type-specific endpoints but the PostgreSQL branch only had a generic `/records` endpoint.

Key changes in **`UserController.Records.cs`** (new file):
- Added `GET {id}/goals` — filters Records by `Type == "GOAL"`, maps to `{id, userId, title, description, recordType, isRevealed}`
- Added `GET {id}/metas` — filters by `Type == "META"`, maps to `{id, userId, title, description, recordType}`
- Added `GET {id}/privateRecords` — filters by `Type == "PRIVATE_RECORD"`
- Added `GET {id}/relations` — filters by `Type == "RELATION"`, maps `Title` → `userName`
- Added `GET {id}/medicalEvents` — filters by `CYBERWARE|MEDICAL_DRUG|MEDICAL_PROCEDURE|SYMPTOM`, maps to `{name, eventDescription, type, status, timeStamp, isRevealed}`
- Added `GET {id}/criminalEvents` — filters by `VICTIM|SUSPECT|WANTED|WITNESS|PUNISHMENT`, same shape as medical
- Fixed `GET simple/hashes/byId` — returns per-type record counts instead of broken hash

### 2453031 — Add missing vibe fields to User model and DTO

**Fixed empty Vibe tab in MyID.**

- **`User.cs`** — Added `VibeEngagement`, `VibeFunction`, `VibeOpinions` string properties
- **`UserDTO.cs`** — Added mapping for the three vibe fields
- **`00-schema.sql`** — Added three new columns to `Users` table
- **`convert_scenario_to_sql.py`** — Reads vibe data from `MI - Vibe` sheet, builds `vibe_opinions_map` lookup by handle

### 3a4aa39 — Update data submodule with vibe opinions and duplicate gig fix

Data submodule update including:
- Vibe opinions populated from `MI - Vibe` sheet column `Opinia o innych vibach`
- Duplicate gig ID deduplication (`gigs_seen_ids` set in conversion script)
- `scenario_gig_ids` check to prevent static gigs from overlapping with scenario gigs

### 6452888 — Fix MyID char-summary field name mismatches between API and frontend

**Fixed most MyID char-summary fields being empty** (Species, Wealth, Network, Subnetwork, etc.)

The PostgreSQL migration consolidated `UserPublic`/`UserPrivate`/`UserFull` into a single `User` class but used different field names than what the frontend expects. The frontend reads `typePublic`, `wealthLevel`, `networkName`, etc. but the API was returning `speciesPublic`, `wealth`, `network`.

Changes in **`UserDTO.cs`**:
- `SpeciesPublic` → `TypePublic` (maps from `User.SpeciesPublic`)
- `SpeciesActual` → `TypeActual` (maps from `User.SpeciesActual`)
- `Wealth` → `WealthLevel` (maps from `User.Wealth`)
- `Network` → `NetworkName` (maps from `User.Network`)
- `NetworkAdmin` → `NetworkAdminName` (maps from `User.NetworkAdmin`)
- `Subnetwork` → `SubnetworkName` (maps from `User.Subnetwork`)
- `CyberwareLevel` changed from `int` to `{stat: N}` object
- `ConfrontationistVsAgreeable`, `CowardVsBrave`, `TalkativeVsSilent`, `ThinkerVsDoer` changed from `int` to `{stat: N}` objects
- Added `HighSecurity` (bool), `HasPlatinumPass` (bool), `InsuredAmount` (int)

Changes in **`User.cs`**:
- Added `HighSecurity`, `HasPlatinumPass`, `InsuredAmount` properties

Changes in **data submodule**:
- `00-schema.sql` — Added three new columns
- `convert_scenario_to_sql.py` — Includes new fields in both scenario and static user INSERT statements

### eebd0c6 — Merge branch 'main' into haluny_postgres_newmodel

Merged latest `main` (epsilon features, CI/CD registry switch to ghcr.io).

---

## New Files Added (Phase 2)

| File | Purpose |
|------|---------|
| `DTOs/UserDTO.cs` | User → frontend-compatible JSON mapping (field renames, stat wrapping) |
| `DTOs/GigDTO.cs` | Gig → frontend-compatible JSON (reveal logic, status updates) |
| `DTOs/AccountDTO.cs` | Account + transactions with resolved owner handles |
| `DTOs/ConversationDTO.cs` | Conversation with flattened participants/messages arrays |
| `DTOs/CreateConversationRequest.cs` | Deserialization target for POST /api/Conversation |
| `Connections/Payloads/IncomingMessagePayload.cs` | WebSocket message deserialization DTO |
| `Converters/NullToEmptyStringConverter.cs` | JSON converter: null strings → empty strings |
| `Controllers/UserController.Records.cs` | Partial class with 6 record-type endpoints + hashes |

## Infrastructure Changes

- **`Program.cs`** — Added `NullToEmptyStringConverter` and `ReferenceHandler.IgnoreCycles` to JSON options; connection string built from env vars; removed broken in-app SQL seeding (handled by docker-entrypoint-initdb.d)
- **`docker-compose.yaml`** — Scaled to 1 backend replica

## Known Remaining Issues

- **Admin field editing**: The `PUT /api/User` endpoint accepts raw `User` model objects, but the frontend sends DTO field names (`typePublic`, `wealthLevel`, etc.). Admin edits for renamed fields will silently fail. Fix would require either a dedicated update DTO or field-name mapping in the PUT handler.
