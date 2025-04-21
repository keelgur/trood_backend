const express = require("express");
const router = express.Router();

router.put("/:id", (req, res, next) => {
  res.status(200).json({
    message: "You have updated the vacancy!",
  });
});

router.delete("/:id", (req, res, next) => {
  res.status(200).json({
    message: "You have deleted the vacancy!",
  });
});

module.exports = router;
