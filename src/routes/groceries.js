const { Router } = require("express");

const route = Router();

// local store
const groceryList = [
  {
    item: "milk",
    quantity: 1,
  },
  {
    item: "apple",
    quantity: 2,
  },
  {
    item: "cereal",
    quantity: 1,
  },
];

route.get(
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

route.get("/grocery_param/:item", (req, res) => {
  const { item } = req.params;
  const groceryItem = groceryList.find((it) => it.item === item);

  res.status(200).send(groceryItem);
});

route.post("/groceries", (req, res) => {
  console.log(req.body);
  groceryList.push(req.body);
  res.status(201).send("Created!");
});

module.exports = route;
