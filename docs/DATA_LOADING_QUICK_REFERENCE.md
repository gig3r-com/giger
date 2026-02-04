# Data Loading Quick Reference

## TL;DR

**For Development (Easy Mode):**
```bash
# Just start - data loads automatically!
docker-compose up -d
# Wait ~30 seconds for data to load, then ready to use
```

**For Production (Manual Control):**
```bash
# Start without auto-loading
AUTO_LOAD_DATA=false docker-compose up -d
# Then manually load data
./scripts/load-data.sh
```

**To Reload Data:**
```bash
docker-compose down
rm -rf ./volumes/postgres
docker-compose up -d
# Data loads automatically if AUTO_LOAD_DATA=true (default)
```

## How It Works Now

### Startup Behavior

| Scenario | AUTO_LOAD_DATA | What Happens | Data State |
|----------|----------------|--------------|------------|
| **First start (dev)** | `true` (default) | Creates tables + loads data | ✅ Data loaded |
| **First start (prod)** | `false` | Creates tables only | ❌ No data |
| **Restart (any)** | any | Uses existing DB | ✅ Data preserved |
| **After `rm -rf volumes/postgres`** | `true` | Fresh DB + auto-loads | ✅ Data loaded |
| **After `rm -rf volumes/postgres`** | `false` | Fresh DB, empty | ❌ No data |

**Key Point:** 
- Development default: Data loads **automatically** on first startup
- Production: Set `AUTO_LOAD_DATA=false` for manual control

## Environment Variables

### In docker-compose.yaml

```yaml
environment:
  # Data loading API credentials
  - DataLoad__Username=${DATALOAD_USERNAME:-admin}
  - DataLoad__Password=${DATALOAD_PASSWORD:-changeme}
```

### For load-data.sh Script

```bash
# Set before running script (optional, defaults work)
export DATALOAD_USERNAME=admin
export DATALOAD_PASSWORD=changeme
export API_BASE=http://localhost:8080/api/DataLoad

# Then run
./scripts/load-data.sh
```

### For load-data.sh (Manual Loading)

Only needed if `AUTO_LOAD_DATA=false` or you want to reload:

```bash
# Set before running script
export DATALOAD_USERNAME=admin
export DATALOAD_PASSWORD=changeme
export API_BASE=http://localhost:8080/api/DataLoad

# Then run
./scripts/load-data.sh
```

## CI/CD Integration

### Add to your workflow (after deploy):

```yaml
- name: Load data
  run: |
    chmod +x ./load-data.sh
    echo "n" | DATALOAD_USERNAME=${{ secrets.DATALOAD_USERNAME }} \
                DATALOAD_PASSWORD=${{ secrets.DATALOAD_PASSWORD }} \
                ./load-data.sh
```

### Required Secrets

In GitHub repo settings, add:
- `DATALOAD_USERNAME` - e.g., "ci-user"
- `DATALOAD_PASSWORD` - strong password

## API Endpoints (All require auth)

```bash
# Check status
curl -u admin:changeme http://localhost:8080/api/DataLoad/status

# Clear all data
curl -X POST -u admin:changeme http://localhost:8080/api/DataLoad/clear-all

# Load specific type
curl -X POST -u admin:changeme http://localhost:8080/api/DataLoad/load-users \
  -H "Content-Type: application/json" \
  -d @./data/mongo/Users.json
```

## Common Issues

### "Database is empty"
- Run: `./load-data.sh`
- Check logs: `docker-compose logs backend`

### "API not accessible"
- Backend not started yet → wait 10-20 seconds
- Check: `docker-compose ps backend`

### "API is not accessible"
- Backend not started yet → wait 30 seconds
- Wrong credentials → check environment variables

### "Database already contains data"
- Data already loaded → use `/clear-all` first
- Or start fresh: `rm -rf volumes/postgres && docker-compose up -d`

### "401 Unauthorized"
- Check credentials: `echo $DATALOAD_USERNAME $DATALOAD_PASSWORD`
- Make sure to pass `-u username:password` to curl

## For Detailed Information

See [DATA_LOADING_CI_CD.md](./DATA_LOADING_CI_CD.md) for:
- Complete CI/CD workflow examples
- Production deployment best practices
- Security considerations
- Troubleshooting guide
