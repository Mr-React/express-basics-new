# Express-JS Basics

## Project Setup

- run npm init -y command to create package.json file
- run npm i express to install express js
- run npm i -D nodemon to install nodemon for file watcher
- added following line in package.json file to configure express and nodemon
    ```
    "start": "node ./src/index.js",
    "start:dev": "nodemon ./src/index.js"
    ```
- run npm run start to start server
- run npm run start:dev to start server with nodemon