const { Router } = require("express");

const router = Router();

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

router.get("/", (req, res) => {
  res.status(200).send(superMarket);
});

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

module.exports = router;
