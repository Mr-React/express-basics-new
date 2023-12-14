const express = require("express");

const app = express();
const PORT = 3000;

app.use(express.json());

app.get("/", (req, res) => {
  console.log("Simple get implemented");

  res.status(200).send("Hello World!");
});

app.listen(PORT, () => {
  console.log("http://localhost:3000/ => running on port " + PORT);
});
