const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: { type: String, required: true },
  field: { type: String, required: true },
  experience: { type: String, default: "0 years", required: true },
  deadline: { type: String, required: true },
  description: { type: String, default: "" },
  vacancies: { type: Array, required: true },
});

module.exports = mongoose.model("Project", projectSchema);
