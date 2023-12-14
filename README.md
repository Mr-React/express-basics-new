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

## ![#1589F0](https://via.placeholder.com/15/1589F0/000000?text=+) Important Notes

1. Using Postman to test api

## Middlewares

- express.json() and express.urlencoded() middleware is used to parse request body

  ```
  // for parsing application/x-www-form-urlencoded
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
     const groceryRoute = require("./routes/groceries");
     app.use("/api/v1/", groceryRoute);
     ```
  3. In groceries.js file add following line
     ```
     const { Router } = require("express");
     const route = Router();
     module.exports = route;
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

- Query Param (call api using postman with url => http://localhost:3000/api/v1/supermarket/queryParam?miles=3&SortedBy=ASC)

  1. In market.js file do following changes

     ```
     const superMarket = [
       {
         id: 1,
         store: "Dmart",
         miles: 0.6,
       },
       {
         id: 2,
         store: "RelianceMart",
         miles: 0.9,
       },
       {
         id: 3,
         store: "FlipkartMart",
         miles: 0.2,
       },
       {
         id: 4,
         store: "Willmart",
         miles: 3.5,
       },
       {
         id: 5,
         store: "Kmart",
         miles: 5.5,
       },
     ];

     router.get("/queryParam", (req, res) => {
      const { miles } = req.query;
      const parseMiles = parseInt(miles);

      if (!isNaN(parseMiles)) {
        const filterSM = superMarket.filter((s) => s.miles <= miles);
        res.status(200).send(filterSM);
      } else {
        res.status(200).send(superMarket);
      }
     });
     ```

- Cookies

  Install cookie-parser using npm i cookie-parser and add following line in index.js
  To call cookie api first call http://localhost:3000/api/v1/cookie-example and then http://localhost:3000/api/v1/groceries

  ```
  const cookieParser = require("cookie-parser");
  app.use(cookieParser());
  ```

  In groceries.js file update and add following line

  ```
  route.get("/groceries", (req, res) => {
    console.log("Cookie: ", req.cookies);

    res.status(200).send(groceryList);
  });

  route.get("/cookie-example", (req, res) => {
    console.log(`baseURL: ${req.baseUrl}`);

    res.cookie("visited", true, {
      maxAge: 10000,
    });

    res.status(200).send(groceryList);
  });
  ```

- Session

  1. Install express-session using npm i express-session
  2. Add following line in index.js

  ```
  const session = require("express-session");
  app.use(
    session({
      secret: "wordecrYPT",
      resave: false,
      saveUninitialized: false,
    })
  );
  ```

  3. In groceries.js file add following code

  ```
  route.get("/shopping/cart", (req, res) => {
    const { cart } = req.session;
    if (!cart) {
      res.send("You have no cart session");
    } else {
      res.send(cart);
    }
  });

  route.post("/shopping/cart/item", (req, res) => {
    const { item, quantity } = req.body;
    const cartItem = { item, quantity };
    console.log(cartItem);

    const { cart } = req.session;
    if (cart) {
      req.session.cart.items.push(cartItem);
    } else {
      req.session.cart = {
        items: [cartItem],
      };
    }
    res.send(201);
  });
  ```
