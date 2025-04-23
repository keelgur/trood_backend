const express = require("express");
const router = express.Router();

const project_ctrl = require("../controllers/projects");

//Setting up routing
router.get("/", project_ctrl.projects_get_all);
router.get("/:id/vacancies", project_ctrl.project_get_all_vacs);
router.post("/", project_ctrl.project_create);
router.post("/:id/vacancies", project_ctrl.project_add_vacancy);
router.put("/:id", project_ctrl.projects_update_project);
router.delete("/:id", project_ctrl.projects_delete_project);

module.exports = router;
