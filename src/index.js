const express = require("express");

const app = express();
const PORT = 3000;

app.use(express.json());

app.get("/groceries", (req, res) => {
  console.log("Groceries GET api");

  res.status(200).send([
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
  ]);
});

app.listen(PORT, () => {
  console.log("http://localhost:3000/ => running on port " + PORT);
});
