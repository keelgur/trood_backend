const mongoose = require("mongoose");

const vacancySchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: { type: String, required: true },
  field: { type: String, required: true },
  experience: { type: String, default: "0 years", required: true },
  country: { type: String, required: true },
  description: { type: String, default: "" },
});

module.exports = mongoose.model("Vacancy", vacancySchema);
