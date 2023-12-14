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
  app.use((req, res, next) => {
      console.log(`${req.method}:${req.url}`);
      next();
    });
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

- GET method to get data from server (call api using postman with url => http://localhost:3000/api/v1/groceries)

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

- POST method to post data to server (call api using postman with url => http://localhost:3000/api/v1/groceries)

  ```
  const groceryList = [];
  app.post("/groceries", (req, res) => {
      console.log(req.body);
      groceryList.push(req.body);
      res.status(201).send("Created!");
  });
  ```

- Route Params (call api using postman with url => http://localhost:3000/api/v1/apple)

  ```
  app.get("/grocery_param/:item", (req, res) => {
    const { item } = req.params;
    const groceryItem = groceryList.find((it) => it.item === item);

    res.status(200).send(groceryItem);
  });
  ```

- Routes in express

  1. move all app.get() and app.post from index. js to newly created /routes/groceries.js file
  2. In index.js file add following line
     ```
     a. const groceryRoute = require("./routes/groceries");
     b. app.use("/api/v1/", groceryRoute);
     ```
  3. In groceries.js file add following line
     ```
     a. const { Router } = require("express");
     b. const route = Router();
     c. module.exports = route;
     ```

- New market route added (call api using postman with url => http://localhost:3000/api/v1/supermarket)

  1. Add following line in index.js
     ```
     const marketRoute = require("./routes/market");
     app.use("/api/v1/supermarket", marketRoute);
     ```
  2. Create new market.js file in /routes/ folder and following code

  ```
  const { Router } = require("express");

  const router = Router();

  const superMarket = [
    {
      store: "Dmart",
    },
    {
      store: "RelianceMart",
    },
    {
      store: "FlipkartMart",
    },
  ];

  router.get("/", (req, res) => {
    res.status(200).send(superMarket);
  });

  module.exports = router;
  ```
