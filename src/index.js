const express = require("express");

const app = express();
const PORT = 3000;

// midllerwares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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

app.get("/groceries", (req, res) => {
  console.log("Groceries GET api");

  res.status(200).send(groceryList);
});

app.post("/groceries", (req, res) => {
  console.log(req.body);
  groceryList.push(req.body);
  res.status(201).send("Created!");
});

app.listen(PORT, () => {
  console.log("http://localhost:3000/ => running on port " + PORT);
});
