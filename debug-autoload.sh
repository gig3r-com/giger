#!/bin/bash

echo "=== Debugging AUTO_LOAD_DATA ==="
echo ""

echo "1. Check if backend is running:"
docker-compose ps backend
echo ""

echo "2. Check environment variable in container:"
docker exec giger-backend-1 env | grep AUTO_LOAD || echo "AUTO_LOAD_DATA not set"
echo ""

echo "3. Check if /data directory is mounted:"
docker exec giger-backend-1 ls -la /data/ || echo "Cannot access /data"
echo ""

echo "4. Check if Auths.json exists:"
docker exec giger-backend-1 ls -la /data/Auths.json || echo "Auths.json not found"
echo ""

echo "5. Check backend logs for AUTO_LOAD:"
docker-compose logs backend 2>&1 | grep -i "auto" | tail -10
echo ""

echo "6. Check backend logs for data loading:"
docker-compose logs backend 2>&1 | grep -i "loading data" | tail -10
echo ""

echo "7. Check backend logs for errors:"
docker-compose logs backend 2>&1 | grep -i "error\|exception" | tail -10
echo ""

echo "8. Check database - count Auths:"
docker exec giger-postgres-1 psql -U giger -d giger -c 'SELECT COUNT(*) FROM "Auths";' || echo "Cannot query database"
echo ""

echo "=== End Debug ==="
