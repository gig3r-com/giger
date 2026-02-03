#!/bin/bash

echo "=== Testing AUTO_LOAD_DATA Feature ==="
echo ""

echo "Step 1: Stopping all containers..."
docker-compose down
echo ""

echo "Step 2: Removing old database volume (simulate fresh start)..."
rm -rf ./volumes/postgres
echo "✓ Database volume removed"
echo ""

echo "Step 3: Rebuilding backend with new code..."
docker-compose build --no-cache backend
echo "✓ Backend rebuilt"
echo ""

echo "Step 4: Starting all services..."
docker-compose up -d
echo "✓ Services started"
echo ""

echo "Step 5: Waiting for backend to start (30 seconds)..."
sleep 30
echo ""

echo "Step 6: Checking backend logs for auto-load..."
docker-compose logs backend | grep -i "auto\|loading data\|loaded successfully"
echo ""

echo "Step 7: Verifying data in database..."
echo "Auths count:"
docker exec giger-postgres-1 psql -U giger -d giger -c 'SELECT COUNT(*) FROM "Auths";'
echo ""
echo "Users count:"
docker exec giger-postgres-1 psql -U giger -d giger -c 'SELECT COUNT(*) FROM "Users";'
echo ""
echo "Conversations count:"
docker exec giger-postgres-1 psql -U giger -d giger -c 'SELECT COUNT(*) FROM "Conversations";'
echo ""

echo "=== Test Complete ==="
echo ""
echo "If you see ~195 Auths, ~200 Users, and ~590 Conversations, it worked! 🎉"
echo ""
echo "To watch live logs: docker-compose logs -f backend"
echo "To access app: http://localhost:3000"
