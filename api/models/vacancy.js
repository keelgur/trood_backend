const mongoose = require("mongoose");

const vacancySchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: String,
  field: String,
  experience: String,
  country: String,
  description: { type: String, default: "" },
});

module.exports = mongoose.model("Vacancy", vacancySchema);
