const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const Project = require("../models/project");
const Vacancy = require("../models/vacancy");

router.get("/", (req, res, next) => {
  Project.find()
    .exec()
    .then((docs) => {
      res.status(200).json(docs);
    })
    .catch((err) => {
      // console.log(err);
      res.status(500).json({ error: err });
    });
});

router.get("/:id/vacancies", (req, res, next) => {
  const id = req.params.id;
  Project.findById(id)
    .exec()
    .then((doc) => {
      if (doc) {
        res.status(200).json(doc.vacancies);
      } else {
        res
          .status(404)
          .json({ message: "No valid document found for provided ID" });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: err });
    });
});

router.post("/", (req, res, next) => {
  const project = new Project({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    field: req.body.field,
    experience: req.body.experience,
    deadline: req.body.deadline,
    description: req.body.description,
    vacancies: new Array(),
  });
  project
    .save()
    .then((result) => {
      res.status(201).json({
        message: "You have created a project!",
        createdProject: result._id,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: err });
    });
});

router.post("/:id/vacancies", (req, res, next) => {
  const id = req.params.id;
  const vacancy = new Vacancy({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    field: req.body.field,
    experience: req.body.experience,
    country: req.body.country,
    description: req.body.description,
  });

  Project.updateOne({ _id: id }, { $push: { vacancies: vacancy } }).then(
    (res) => {
      console.log(res);
    }
  );

  vacancy
    .save()
    .then((result) => {
      // console.log(result);
      res.status(201).json({
        message: "You have added a vacancy to a project!",
        createdVacancy: result._id,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: err });
    });
});

router.put("/:id", (req, res, next) => {
  const id = req.params.id;
  Project.findByIdAndUpdate(
    { _id: id },
    {
      $set: {
        name: req.body.name,
        field: req.body.field,
        experience: req.body.experience,
        deadline: req.body.deadline,
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
          messsage: "Updated the project!",
        });
      } else {
        res.status(201).json({
          messsage: "Not found project with supplied ID. Created new.",
        });
      }
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
});

router.delete("/:id", (req, res, next) => {
  const id = req.params.id;
  Project.deleteOne({ _id: id })
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
