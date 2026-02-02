# Data Loading Quick Reference

## TL;DR

```bash
# Fresh start (first time)
docker-compose up -d
./load-data.sh

# Reload data (wipe and reload)
docker-compose down
rm -rf ./volumes/postgres
docker-compose up -d
./load-data.sh

# Normal restart (keeps data)
docker-compose restart
```

## How It Works Now

### Startup Behavior

| Scenario | What Happens | Data State |
|----------|--------------|------------|
| **First start** | Creates tables only | ❌ No data |
| **Normal restart** | Uses existing DB | ✅ Data preserved |
| **After `rm -rf volumes/postgres`** | Fresh DB, empty tables | ❌ No data |

**Key Point:** Data is **NEVER** loaded automatically. You must run `./load-data.sh` manually.

## Environment Variables

### In docker-compose.yaml

```yaml
environment:
  # Data loading API credentials (CHANGE IN PRODUCTION!)
  - DataLoad__Username=${DATALOAD_USERNAME:-admin}
  - DataLoad__Password=${DATALOAD_PASSWORD:-changeme}
```

### For load-data.sh

```bash
# Set before running script
export DATALOAD_USERNAME=admin
export DATALOAD_PASSWORD=changeme
export API_BASE=http://localhost:8080/api/DataLoad

# Then run
./load-data.sh
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
