# Giger Web App

Welcome to the Giger Web App! This application simulates a dystopian cyberpunk world where players can interact with various gigs and immerse themselves in the futuristic setting.

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

running application stack from the root of the repository:

```sh
docker-compose up -d --build
docker-compose exec backend flask db upgrade

#below are to be run only on first launch ((probably (i'm only devops, don't believe me))
docker-compose exec backend flask init staticdata
docker-compose exec backend flask init backdoor
```

App should be now available on localhost 8080. If you don't like the port, create file `.env` and add `PORT=your_desiderd_port`.

