const express = require("express");
const app = express();
const morgan = require("morgan");

const projectRoutes = require("./api/routes/projects");
const vacancyRoutes = require("./api/routes/vacancies");

//Setting up logging
app.use(morgan("dev"));

//Setting up middleware
app.use("/projects", projectRoutes);
app.use("/vacancies", vacancyRoutes);

app.use((req, res, next) => {
  const err = new Error("Not found");
  err.status = 404;
  next(err);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message,
    },
  });
});

module.exports = app;
