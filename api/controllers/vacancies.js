const Vacancy = require("../models/vacancy");

exports.vacancies_update_vacancy = (req, res, next) => {
  const id = req.params.id;
  Vacancy.findByIdAndUpdate(
    // Basically finding entry with given id and updating it using $set flag
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
      upsert: true, //This option will ensure that if entry with given ID isn't found it will create a new one with it
    }
  )
    .exec()
    .then((result) => {
      if (result) {
        //Checking if entry-to-be-updated found
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

exports.vacancies_delete_vacancy = (req, res, next) => {
  const id = req.params.id;
  Vacancy.deleteOne({ _id: id })
    .exec()
    .then((result) => {
      if (result.deletedCount !== 0)
        // Checking if command has found and deleted something
        res.status(200).json({
          message: "Successfully deleted the vacancy!",
          deletedId: id,
        });
      else
        res.status(404).json({
          message: "Not found vacancy with supplied ID.",
          givenID: id,
        });
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
