const express = require("express");
const router = express.Router();

router.get("/", (req, res, next) => {
  res.status(200).json({
    message: "You have got all the projects!",
  });
});

router.get("/:id/vacancies", (req, res, next) => {
  res.status(200).json({
    message: "You have got all the vacancies for a project!",
  });
});

router.post("/", (req, res, next) => {
  res.status(201).json({
    message: "You have created a project!",
  });
});

router.post("/:id/vacancies", (req, res, next) => {
  res.status(201).json({
    message: "You have added a vacancy to a project!",
  });
});

router.put("/:id", (req, res, next) => {
  res.status(200).json({
    message: "You have updated the project!",
  });
});

router.delete("/:id", (req, res, next) => {
  res.status(200).json({
    message: "You have deleted the project!",
  });
});

module.exports = router;
