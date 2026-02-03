#!/bin/bash

echo "=== New Developer Onboarding Test ==="
echo "Simulating a fresh developer getting started..."
echo ""

echo "Step 1: Clean slate"
docker-compose down -v
rm -rf ./volumes
echo "✓ Clean"
echo ""

echo "Step 2: Start services"
docker-compose up -d --build
echo "✓ Services starting..."
echo ""

echo "Step 3: Wait for backend (15 seconds)"
sleep 15
echo "✓ Backend should be ready"
echo ""

echo "Step 4: Load data with ./load-data.sh"
echo "n" | ./load-data.sh
echo ""

echo "Step 5: Verify data loaded"
echo ""
./check-data.sh
echo ""

echo "=== Test Complete ==="
echo ""
echo "✅ If you see ~195 Auths and ~590 Conversations, SUCCESS!"
echo "🌐 Access app at: http://localhost:3000"
