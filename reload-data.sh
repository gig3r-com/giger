#!/bin/bash

# Script to reload data into the database
# This will restart the backend with FORCE_DATA_RELOAD=true

echo "🔄 Reloading data from JSON files..."
echo ""

# Set environment variable and restart backend
export FORCE_DATA_RELOAD=true
docker-compose up -d --force-recreate --no-deps backend

echo ""
echo "⏳ Waiting for backend to start and load data (30 seconds)..."
sleep 30

echo ""
echo "📊 Checking data load status:"
docker-compose logs backend | grep -E "Loading|Successfully|Data loaded:" | tail -10

echo ""
echo "✅ Data reload initiated. Check logs with: docker-compose logs backend"
echo ""
echo "📈 Verify data counts:"
docker exec giger-postgres-1 psql -U giger -d giger -c "SELECT 
    (SELECT COUNT(*) FROM \"Auths\") as auths,
    (SELECT COUNT(*) FROM \"Networks\") as networks,
    (SELECT COUNT(*) FROM \"Gigs\") as gigs,
    (SELECT COUNT(*) FROM \"Conversations\") as conversations,
    (SELECT COUNT(*) FROM \"Accounts\") as accounts;" 2>/dev/null || echo "Database not ready yet"
