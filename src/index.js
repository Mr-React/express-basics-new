const express = require("express");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const groceryRoute = require("./routes/groceries");
const marketRoute = require("./routes/market");
const authRoute = require("./routes/auth");

const app = express();
const PORT = 3000;

// midllerwares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  session({
    secret: "wordecrYPT",
    resave: false,
    saveUninitialized: false,
  })
);

app.use((req, res, next) => {
  console.log(`${req.method}:${req.url} \nOriginal URL: ${req.originalUrl}`);
  next();
});

app.use("/api/v1/auth", authRoute);
app.use("/api/v1/", groceryRoute);
app.use("/api/v1/supermarket", marketRoute);

app.listen(PORT, () => {
  console.log("http://localhost:3000/ => running on port " + PORT);
});
