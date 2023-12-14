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
