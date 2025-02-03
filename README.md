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


