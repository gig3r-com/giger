# Getting Started - New Developer Guide

Welcome! This guide will get you up and running in minutes.

## Quick Start (< 2 minutes)

### Prerequisites
- Docker and Docker Compose installed
- Git with submodules support

### Steps

1. **Clone the repository with data submodule:**
   ```bash
   git clone --recurse-submodules https://github.com/gig3r-com/giger.git
   cd giger
   
   # If you already cloned without --recurse-submodules:
   git submodule update --init --recursive
   ```

2. **Start everything:**
   ```bash
   docker-compose up -d
   ```

3. **Wait for data to load (~30 seconds):**
   ```bash
   # Watch the backend logs to see data loading
   docker-compose logs -f backend
   
   # You'll see:
   # "Database schema created successfully."
   # "AUTO_LOAD_DATA=true and database is empty. Loading data..."
   # "Data loaded successfully via AUTO_LOAD_DATA."
   ```

4. **Access the application:**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:3000/api
   - Swagger docs: http://localhost:3000/swagger

5. **Login:**
   - Use any user from the loaded data
   - Check data files for usernames/passwords

**That's it!** 🎉 The database is automatically loaded with test data.

---

## What Just Happened?

When you ran `docker-compose up -d`:

1. PostgreSQL started with an empty database
2. Backend detected the empty database
3. Backend saw `AUTO_LOAD_DATA=true` (default for development)
4. Backend automatically loaded all data from `./data/mongo/` directory
5. Frontend started and connected to the backend

**The data includes:**
- ~200 users
- ~225 bank accounts with transactions
- ~259 gigs (jobs)
- ~590 conversations with ~5000 messages
- Networks, hack configs, logs, and more

---

## Common Commands

```bash
# View logs
docker-compose logs -f backend

# Restart services
docker-compose restart backend

# Stop everything
docker-compose down

# Complete reset (deletes all data and reloads)
docker-compose down
rm -rf ./volumes/postgres
docker-compose up -d
# Data will reload automatically
```

---

## Helper Scripts

```bash
# Check what's loaded
./scripts/check-data.sh

# Reload data manually
./scripts/reload-data.sh

# Fresh start (wipes everything)
./scripts/fresh-start.sh
```

---

## Disabling Auto-Load

If you want manual control over data loading:

```bash
# Start without auto-loading
AUTO_LOAD_DATA=false docker-compose up -d

# Then manually load data
./scripts/load-data.sh
```

Or create a `.env` file:
```bash
echo "AUTO_LOAD_DATA=false" > .env
docker-compose up -d
```

---

## Troubleshooting

### "Database is empty, no data loaded"

Check if auto-load failed:
```bash
docker-compose logs backend | grep -i "data"
```

Load manually:
```bash
./scripts/load-data.sh
```

### "Submodule 'data' is empty"

Initialize the submodule:
```bash
git submodule update --init --recursive
docker-compose restart backend
```

---

## Next Steps

- Read [DATA_LOADING_QUICK_REFERENCE.md](./DATA_LOADING_QUICK_REFERENCE.md) for data management
- Check [DATA_LOADING_CI_CD.md](./DATA_LOADING_CI_CD.md) for deployment guides
- Explore the API at http://localhost:3000/swagger

---

## For Production Deployments

**IMPORTANT:** Disable auto-loading in production!

```bash
# Use the production compose file
docker-compose -f docker-compose.yml -f docker-compose.prod.yaml up -d

# Then manually load data with authentication
./scripts/load-data.sh
```

See [DATA_LOADING_CI_CD.md](./DATA_LOADING_CI_CD.md) for complete production setup.
