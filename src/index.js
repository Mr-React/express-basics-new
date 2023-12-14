const express = require("express");
const groceryRoute = require("./routes/groceries");

const app = express();
const PORT = 3000;

// midllerwares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use((req, res, next) => {
  console.log(`${req.method}:${req.url}`);
  next();
});

app.use("/api/v1/", groceryRoute);

app.listen(PORT, () => {
  console.log("http://localhost:3000/ => running on port " + PORT);
});
