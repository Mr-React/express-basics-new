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

## Middlewares

- express.json() and express.urlencoded() middleware is used to parse request body

  ```
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  ```

- example

  ```
  app.get(
    "/grocery",
    (req, res, next) => {
      console.log("Before hnadling request body");
      next();
    },
    (req, res) => {
      console.log("After handling request body");
      console.log("Groceries GET api");

      res.status(200).send(groceryList);
    }
  );
  ```

## Methods

- GET method to get data from server (call api using postman with url => http://localhost:3000/groceries)

  ```
  app.get("/groceries", (req, res) => {
  console.log("Groceries GET api");

  res.status(200).send([
        {
            item: "milk",
            quantity: 1,
        }
    ]);
  });
  ```

- POST method to post data to server (call api using postman with url => http://localhost:3000/groceries)

  ```
  const groceryList = [];
  app.post("/groceries", (req, res) => {
      console.log(req.body);
      groceryList.push(req.body);
      res.status(201).send("Created!");
  });
  ```
