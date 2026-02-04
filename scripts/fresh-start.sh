#!/bin/bash

# Script for a completely fresh start with new data

echo "🚀 Fresh Start - Clearing everything and reloading data"
echo "========================================================="
echo ""
echo "⚠️  This will:"
echo "  - Stop all containers"
echo "  - Remove database volumes"
echo "  - Rebuild backend"
echo "  - Load fresh data"
echo ""
read -p "Continue? (y/N) " -n 1 -r
echo ""

if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo "Cancelled."
    exit 1
fi

echo ""
echo "🛑 Stopping containers..."
docker-compose down -v

echo ""
echo "🗑️  Removing old database data..."
rm -rf volumes/postgres/data

echo ""
echo "🔨 Rebuilding backend..."
docker-compose build backend

echo ""
echo "🚀 Starting services..."
docker-compose up -d

echo ""
echo "⏳ Waiting for services to start (40 seconds)..."
sleep 40

echo ""
echo "✅ Fresh start complete!"
echo ""
echo "📊 Check data with: ./check-data.sh"
echo "📜 Check logs with: docker-compose logs backend"
