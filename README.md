# CyberCrush Web App

This is a fork of Giger App. We develop it to fit our cyberpunk world and the CyberCrush Larp. Doue to that some freatures might be missing and some will be added. 

## Installation (Linux)

### 1. Prerequesits

Before you start, make sure you have all those tools installed on your development machine.
 - .Net 8
 - Docker
 - Node.js

### 2. Clone the repository
Use the `git clone` command to clone the repository. Go into the CyberCrush folder.

### 3. Setup the database (optional)
Before you create new accounts we recommend to run the app on some example data and see if everything is working. To generate example data go to `backendDotnet/DatabaseSerializer`. There you will find a file named `Program.cs`. Use the `dotnet run` command on the `Program.cs` and wait for the output (it might take a while). If everything worked correctly you should see a new folder called `bin`. In it you should see a folder named `ModelsExample`, this folder contains Mongodb `.json` files.

Go to the root folder and find the `data` directory. In it create a new folder named mongo. At last copy all the generated `.json` files into that folder.

### 4. Use docker to build the app
Run application stack from the folder root of the project.

    docker compose up -d --build

### 5. Check if everything is working
Open a web browser and go to `127.0.0.1:8081` to access the database. The default login credentials are `Admin` for the username and `pass` for the password. Find the `Auth` collection and check if it contains 3 entries.

In an another tab go to `127.0.0.1:8080` to access the web app. Use the login credentials from the database to login.

## Contributing
Contributions are welcome! Feel free to fork the repository and submit pull requests for any enhancements or bug fixes.

## Giger License
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