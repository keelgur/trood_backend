const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: String,
  field: String,
  experience: String,
  deadline: String,
  description: { type: String, default: "" },
  vacancies: { type: Array, required: true },
});

module.exports = mongoose.model("Project", projectSchema);
