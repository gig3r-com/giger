# PostgreSQL CI/CD Migration

This document describes the changes made to migrate the CI/CD pipeline from MongoDB to PostgreSQL.

## Summary

The GitHub Actions workflows and Helm charts have been updated to deploy PostgreSQL instead of MongoDB for both PR preview environments and production deployments.

## Changes Made

### 1. GitHub Actions Workflows

#### `.github/workflows/deploy-dev.yaml`
- **Changed**: `build-mongo` job renamed to `build-postgres`
- **Changed**: Docker image name from `gig3r-mongo` to `gig3r-postgres`
- **Changed**: Dockerfile path from `./data/Dockerfile` to `./data/Dockerfile.postgres`
- **Changed**: HELM_DATABASE_IMAGE from `mivalsten/gig3r-mongo` to `mivalsten/gig3r-postgres`

#### `.github/workflows/deploy-helm-chart.yaml`
- **Changed**: Default HELM_DATABASE_IMAGE from `mivalsten/gig3r-mongo` to `mivalsten/gig3r-postgres`
- **Removed**: mongo-express user/password secrets
- **Added**: PostgreSQL password secret (`POSTGRES_PASSWORD`)

### 2. Docker Configuration

#### `data/Dockerfile.postgres` (NEW)
- New Dockerfile for PostgreSQL 16
- Uses official `postgres:16` base image
- Configures default database credentials
- Supports init scripts in `/docker-entrypoint-initdb.d/`

### 3. Helm Chart Templates

#### `chart/gig3r/values.yaml`
- **Changed**: Database image from `gig3r-mongo` to `gig3r-postgres`
- **Changed**: Database name from `admin` to `giger`
- **Added**: Database password field
- **Removed**: mongo-express configuration

#### `chart/gig3r/templates/_helpers.tpl`
- **Removed**: `gig3r.mongodb.app` and `gig3r.mongodb.image` helpers
- **Removed**: `gig3r.mongo-express.app` helper
- **Added**: `gig3r.postgres.app` and `gig3r.postgres.image` helpers
- **Changed**: Database password helper to use `POSTGRES_PASSWORD` instead of `MONGO_INITDB_ROOT_PASSWORD`

#### `chart/gig3r/templates/statefulset.yaml`
- **Complete rewrite** from MongoDB StatefulSet to PostgreSQL StatefulSet
- **Changed**: Container port from 27017 to 5432
- **Changed**: Environment variables:
  - `MONGO_INITDB_ROOT_USERNAME` → `POSTGRES_USER`
  - `MONGO_INITDB_ROOT_PASSWORD` → `POSTGRES_PASSWORD`
  - `MONGO_INITDB_DATABASE` → `POSTGRES_DB`
- **Changed**: Volume mount from `/data/db` to `/var/lib/postgresql/data`
- **Changed**: Persistent storage path from `/opt/mongo/` to `/opt/postgres/`
- **Removed**: mongo-scripts ConfigMap volume

#### `chart/gig3r/templates/deployment.yaml`
- **Removed**: mongo-express deployment entirely
- **Changed**: Backend environment variables:
  - `GigerDB__Host`: Uses `gig3r.postgres.app` instead of `gig3r.mongodb.app`
  - `GigerDB__Port`: Changed from `27017` to `5432`
  - Secret keys updated to PostgreSQL equivalents
- **Added**: `ConnectionStrings__DefaultConnection` environment variable for PostgreSQL connection string

#### `chart/gig3r/templates/service.yaml`
- **Removed**: mongo-express Service
- **Changed**: Database Service:
  - Name from `gig3r.mongodb.app` to `gig3r.postgres.app`
  - Port from 27017 to 5432

#### `chart/gig3r/templates/secrets.yaml`
- **Removed**: mongo-express-secret entirely
- Only contains Docker registry credentials now

#### `chart/gig3r/templates/dependant-on-dbpass.yaml`
- **Changed**: Secret keys:
  - `MONGO_INITDB_ROOT_USERNAME` → `POSTGRES_USER`
  - `MONGO_INITDB_ROOT_PASSWORD` → `POSTGRES_PASSWORD`
  - `MONGO_INITDB_DATABASE` → `POSTGRES_DB`

#### `chart/gig3r/templates/ingress.yaml`
- **Removed**: mongo-express ingress rule (express.{environment}.gig3r.com)
- **Removed**: express hostname from TLS configuration

## Required GitHub Secrets

The following secrets need to be configured in the GitHub repository:

- `POSTGRES_PASSWORD` - Password for PostgreSQL database (new)
- `KUBECONFIG` - Kubernetes config for deployment (existing)
- `DATA_SSH_KEY` - SSH key for data submodule (existing)
- `DOCKERHUB_USERNAME` - DockerHub username (existing)
- `REGCRED` - Docker registry credentials (existing)

**Removed secrets** (no longer needed):
- `ME_USER` - mongo-express username
- `ME_PASSWORD` - mongo-express password

## Backend Configuration

The backend already supports PostgreSQL via the following environment variables:
- `ConnectionStrings__DefaultConnection` - Full PostgreSQL connection string
- `GigerDB__Host` - PostgreSQL hostname
- `GigerDB__Port` - PostgreSQL port (5432)
- `GigerDB__Username` - PostgreSQL username
- `GigerDB__Password` - PostgreSQL password
- `GigerDB__DatabaseName` - PostgreSQL database name

## Testing

To test the changes:

1. **Local testing**: The changes don't affect local development (docker-compose.yaml remains unchanged)
2. **PR deployment**: Create a PR to trigger preview environment deployment with PostgreSQL
3. **Verify**:
   - Frontend accessible at `{pr-branch-slug}.gig3r.com`
   - Backend API accessible at `{pr-branch-slug}.gig3r.com/api`
   - Database connectivity from backend
   - E2E tests pass

## Migration Path

For existing deployments:

1. **Backup MongoDB data** if needed for reference
2. **Deploy updated Helm chart** - PostgreSQL will be deployed fresh
3. **Backend will initialize database schema** automatically on first start
4. **Load seed data** using the backend's data loading mechanism (controlled by `FORCE_DATA_RELOAD` env var)

## Notes

- PostgreSQL persistent storage uses host paths in production (`/opt/postgres/{environment}`)
- PR preview environments get ephemeral storage (no persistent volumes)
- Database initialization scripts can be added to `docker/postgres_init/` directory
- The PostgreSQL image can be customized by modifying `data/Dockerfile.postgres`

## Compatibility

- ✅ Works with existing backend code (already supports PostgreSQL)
- ✅ Works with existing frontend (no changes needed)
- ✅ Compatible with existing CI/CD runner infrastructure
- ✅ E2E tests remain unchanged
- ✅ Local development unaffected
