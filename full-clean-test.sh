#!/bin/bash

echo "=== COMPLETE CLEAN RESTART TEST ==="
echo ""

echo "Step 1: Stopping and removing ALL containers and volumes..."
docker-compose down -v
echo ""

echo "Step 2: Removing local postgres directory..."
rm -rf ./volumes/postgres
rm -rf ./volumes
echo "✓ Volumes removed"
echo ""

echo "Step 3: Verify volumes are gone..."
ls -la ./volumes/ 2>&1 || echo "✓ Volumes directory does not exist (good!)"
echo ""

echo "Step 4: Rebuilding backend image from scratch (no cache)..."
docker-compose build --no-cache backend
echo "✓ Backend rebuilt"
echo ""

echo "Step 5: Starting services..."
docker-compose up -d
echo "✓ Services started"
echo ""

echo "Step 6: Watching postgres initialization..."
echo "Postgres logs:"
docker-compose logs postgres | head -20
echo ""

echo "Step 7: Waiting 30 seconds for backend startup..."
sleep 30
echo ""

echo "Step 8: Checking backend logs..."
docker-compose logs backend | grep -E "AUTO_LOAD|Loading|loaded successfully|Error|Exception" | tail -30
echo ""

echo "Step 9: Checking database counts..."
./check-data.sh
echo ""

echo "=== TEST COMPLETE ==="
