const express = require("express");
const router = express.Router();

const Vacancy = require("../models/vacancy");

router.put("/:id", (req, res, next) => {
  const id = req.params.id;
  Vacancy.findByIdAndUpdate(
    { _id: id },
    {
      $set: {
        name: req.body.name,
        field: req.body.field,
        experience: req.body.experience,
        country: req.body.country,
        description: req.body.description,
      },
    },
    {
      upsert: true,
    }
  )
    .exec()
    .then((result) => {
      if (result) {
        res.status(200).json({
          messsage: "Updated the vacancy!",
        });
      } else {
        res.status(201).json({
          messsage: "Not found vacancy with supplied ID. Created new.",
        });
      }
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
});

router.delete("/:id", (req, res, next) => {
  const id = req.params.id;
  Vacancy.deleteOne({ _id: id })
    .exec()
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: err });
    });
});

module.exports = router;
