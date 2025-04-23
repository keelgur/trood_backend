const express = require("express");
const router = express.Router();

const vacancies_ctrl = require("../controllers/vacancies");

//Setting up routing
router.put("/:id", vacancies_ctrl.vacancies_update_vacancy);
router.delete("/:id", vacancies_ctrl.vacancies_delete_vacancy);

module.exports = router;
