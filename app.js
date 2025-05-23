const express = require("express");
const app = express();
const morgan = require("morgan");
const mongoose = require("mongoose");

// Concatenating private token with connection URI
const uri =
  "mongodb+srv://invisibledogeock:" +
  process.env.ATLAS_PWD +
  "@cluster0.a8rfnm9.mongodb.net/Projects&Vacancies?authSource=admin&retryWrites=true&w=majority&appName=Cluster0";

// Connecting to the DB
run().catch((err) => console.log(err));
async function run() {
  await mongoose.connect(uri).then(() => {
    console.log("Connected!");
  });
}

const projectRoutes = require("./api/routes/projects");
const vacancyRoutes = require("./api/routes/vacancies");

// Setting up logging middleware
app.use(morgan("dev"));
// Setting up parsing middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
// Handling CORS
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    return res.status(200).json({});
  }
  next();
});

// Setting up routes
app.use("/projects", projectRoutes);
app.use("/vacancies", vacancyRoutes);

// Handling not found response errors
app.use((req, res, next) => {
  const err = new Error("Not found");
  err.status = 404;
  next(err);
});

// Handling internal and other errors
app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message,
    },
  });
});

module.exports = app;
