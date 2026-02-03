# Giger Web App

Welcome to the Giger Web App! This application simulates a dystopian cyberpunk world where players can interact with various gigs and immerse themselves in the futuristic setting.

# Testing
CI automatically builds and deploys new env on each pull request (with URL based on the PR name, you will get info about URL in github actions log).

Data loaded to the test database, are taken from https://github.com/gig3r-com/giger-data repository, and selected based on branch parameter in data submodule: https://github.com/gig3r-com/giger/blob/main/.gitmodules

```
[submodule "data"]
    path = data
    url = git@github.com:gig3r-com/giger-data.git
    branch = main
```

To change loaded data:
1. Change data in giger-data repo
2. Either merge to main, or change REF for your giger branch to one in giger-data
3. Run `git module update --remote` on main giger app
CAUTION: If you merge this to main, base env will be loading dataset from REF on each deploy

## Installation

Before you start, make sure you have Node.js and npm (Node Package Manager) installed on your machine.

# Clone the repository:
git clone <repository-url>
Navigate to the project directory:

cd giger

## Install dependencies:
npm install
Running the App
To start the development server and run the application, follow these steps:

## Run the development server:
npm run dev
Open your web browser and visit: http://localhost:5137
You should now see the Giger Web App running in your browser.

Features
Explore a range of illegal gigs in a cyberpunk world.
Engage with various gig categories, messages, and statuses.
Immerse yourself in the futuristic setting through the app's user interface.
Technologies Used
Vite: Build tool for rapid web development.
React: JavaScript library for building user interfaces.
TypeScript: Superset of JavaScript with static types.

## Contributing
Contributions are welcome! Feel free to fork the repository and submit pull requests for any enhancements or bug fixes.

## License
This project is licensed under the Creative Commons License.
If you want to use this application with your larp, you can do it freely - as long as you include "Powered by GiG3R Project" in your credits.

Created with ❤️ by GIG3R Larp Team and LarpVenture

Frontend & Coordination
Borys Juśkiw

Design & UX
Marta Salamon

Backend
Jakub Zielnik

Hacking Module / Electron App
Karol Hinc

DEVOps
Grzegorz Kawka-Osik

ITPM:
Anna Kowalska

Idea & High Level Design:
Maciej Starzycki
Paweł Jasiński
Ida Pawłowicz

For any inquiries, please contact juskiw.borys - at - gmail.com

## DevOps

- Run application stack from the root of the repository:
    ```sh
    docker compose up -d --build
    ```
- Reinitialize mongo database:
    ```sh
    docker compose down
    rm ./docker/volumes/mongo
    docker compose up -d
    ```


App should be now available on localhost:8080. If you don't like the port, create file `.env` and add `PORT=your_desiderd_port`.

---

## 🚀 Quick Start for Developers (New PostgreSQL-based Setup)

**Note:** This project is transitioning from MongoDB to PostgreSQL. The instructions below are for the new setup on the `migration-to-relation-db-zefir-experiment-betterload` branch.

### Prerequisites
- Docker and Docker Compose installed
- Git with submodules support

### Getting Started (< 2 minutes)

1. **Clone the repository with data submodule:**
   ```bash
   git clone --recurse-submodules https://github.com/gig3r-com/giger.git
   cd giger
   
   # If you already cloned without --recurse-submodules:
   git submodule update --init --recursive
   ```

2. **Start the services:**
   ```bash
   docker-compose up -d
   ```

3. **Load the test data:**
   ```bash
   # Wait for backend to be ready (~10 seconds)
   sleep 10
   
   # Load data via API
   ./load-data.sh
   ```
   
   The script will:
   - Load all test data (~30 seconds)
   - Handle duplicates and data quality issues automatically
   - Show you progress for each data type

4. **Access the application:**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:3000/api
   - API Documentation: http://localhost:3000/swagger

### What Data Gets Loaded?

The system automatically loads test data including:
- ~200 users
- ~225 bank accounts with transactions  
- ~259 gigs (jobs)
- ~590 conversations with ~5,000 messages
- Networks, subnetworks, hack configs, logs, and more

### Common Development Commands

```bash
# View backend logs
docker-compose logs -f backend

# View frontend logs  
docker-compose logs -f frontend

# Restart a service
docker-compose restart backend

# Stop everything
docker-compose down

# Complete reset (wipes database and reloads data)
docker-compose down
rm -rf ./volumes/postgres
docker-compose up -d
# Data will automatically reload
```

### Manual Data Loading

If you prefer to control when data is loaded:

```bash
# Start without auto-loading
AUTO_LOAD_DATA=false docker-compose up -d

# Then manually load data
./load-data.sh
```

### Troubleshooting

**Problem: No data loaded / database is empty**
```bash
# Check if auto-load worked
docker-compose logs backend | grep -i "data"

# Manually load if needed
./load-data.sh
```

**Problem: Submodule 'data' is empty**
```bash
git submodule update --init --recursive
docker-compose restart backend
```

**Problem: Port already in use**
```bash
# Change port in .env file
echo "APP_PORT=8080" > .env
docker-compose up -d
```

### Additional Documentation

For more detailed information:
- **Quick Reference**: [DATA_LOADING_QUICK_REFERENCE.md](./DATA_LOADING_QUICK_REFERENCE.md)
- **Complete Guide**: [DATA_LOADING_CI_CD.md](./DATA_LOADING_CI_CD.md)
- **Data Loading Guide**: [DATA_LOADING_GUIDE.md](./DATA_LOADING_GUIDE.md)

### For Production Deployments

**IMPORTANT:** Disable automatic data loading in production!

```bash
# Use production override
docker-compose -f docker-compose.yml -f docker-compose.prod.yaml up -d

# Then manually load data with authentication
./load-data.sh
```

See [DATA_LOADING_CI_CD.md](./DATA_LOADING_CI_CD.md) for complete production setup instructions.

---

