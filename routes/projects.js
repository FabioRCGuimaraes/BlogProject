//================================================
//            PROJECTS ROUTES
//================================================

const express = require("express");
const router = express.Router();
const Project = require("../models/project");


//Show all projects
router.get("/", (req, res) => {
    // Project.find({}, (err, projects) => {
    //     if(err) console.log(err);
    //     else res.render("projects/index", {projects: projects});
    // });
    res.render("projects/index");
});

module.exports = router;