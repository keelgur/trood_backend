const Project = require("../models/project");
const Vacancy = require("../models/vacancy");

const mongoose = require("mongoose");

exports.projects_get_all = (req, res, next) => {
  Project.find() // Passing no arguments means we get all entries in the collection
    .exec()
    .then((docs) => {
      res.status(200).json(docs);
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
};

exports.project_get_all_vacs = (req, res, next) => {
  const id = req.params.id;
  Project.findById(id) // Finding first entry with given id
    .exec()
    .then((doc) => {
      if (doc) {
        // Checking if response is not null
        res.status(200).json(doc.vacancies);
      } else {
        res
          .status(404)
          .json({ message: "No valid document found for provided ID" });
      }
    })
    .catch((err) => {
      if (err.name === "CastError") {
        // Checking if caught error was due to impossible casting to an ObjectId with given id
        res.status(400).json({
          message: "Invalid ObjectId was requested.",
          id: err.value._id,
        });
      } else {
        res.status(500).json({ error: err });
      }
    });
};

exports.project_create = (req, res, next) => {
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
};

exports.project_add_vacancy = (req, res, next) => {
  const id = req.params.id;
  const vacancy = new Vacancy({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    field: req.body.field,
    experience: req.body.experience,
    country: req.body.country,
    description: req.body.description,
  });

  Project.updateOne({ _id: id }, { $push: { vacancies: vacancy } }) // Updating project to add new vacancy through aggregation pipeline
    .then((result) => {
      if (result.matchedCount === 0) {
        // Checking if id matched anything in collection
        res.status(404).json({
          message: "Not found project with supplied ID.",
          givenID: id,
        });
      } else {
        vacancy
          .save()
          .then((result) => {
            res.status(201).json({
              message: "You have added a vacancy to a project!",
              createdVacancy: result._id,
            });
          })
          .catch((err) => {
            res.status(500).json({ error: err });
          });
      }
    })
    .catch((err) => {
      if (err.name === "CastError") {
        // Checking if caught error was due to impossible casting to an ObjectId with given id
        res.status(400).json({
          message: "Invalid ObjectId was requested.",
          id: err.value._id,
        });
      } else {
        res.status(500).json({ error: err });
      }
    });
};

exports.projects_update_project = (req, res, next) => {
  const id = req.params.id;
  Project.findByIdAndUpdate(
    // Basically finding entry with given id and updating it using $set flag
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
      upsert: true, //This option will ensure that if entry with given ID isn't found it will create a new one with it
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
      if (err.name === "CastError") {
        // Checking if caught error was due to impossible casting to an ObjectId with given id
        res.status(400).json({
          message: "Invalid ObjectId was requested.",
          id: err.value._id,
        });
      } else {
        res.status(500).json({ error: err });
      }
    });
};

exports.projects_delete_project = (req, res, next) => {
  const id = req.params.id;
  Project.deleteOne({ _id: id })
    .exec()
    .then((result) => {
      if (result.deletedCount !== 0) {
        // Checking if command has found and deleted something
        res.status(200).json({
          message: "Successfully deleted the project!",
          deletedId: id,
        });
      } else {
        res.status(404).json({
          message: "Not found project with supplied ID.",
          givenID: id,
        });
      }
    })
    .catch((err) => {
      if (err.name === "CastError") {
        // Checking if caught error was due to impossible casting to an ObjectId with given id
        res.status(400).json({
          message: "Invalid ObjectId was requested.",
          id: err.value._id,
        });
      } else {
        res.status(500).json({ error: err });
      }
    });
};
