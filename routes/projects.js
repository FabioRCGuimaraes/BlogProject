//================================================
//            PROJECTS ROUTES
//================================================

const express = require("express");
const router = express.Router();
const Project = require("../models/project");
const middleware = require("../middleware");

//INDEX - Show all projects
router.get("/", (req, res) => {
    Project.find({}, (err, projects) => {
        if(err) console.log(err);
        else res.render("projects/index", {projects: projects});
    });
});

//CREATE - add new project to DB
router.post("/", middleware.isLoggedIn, (req, res) => {
    //Get data from a form
    const name = req.body.name;
    const img = req.body.image;
    const description = req.body.description;
    let author = {
        id: req.user._id,
        username: req.user.username
    };

    //Create a project
    const newProject = new Project({
        name: name,
        image: img,
        description: description,
        author: author
    });

    //Save project to DB
    Project.create(newProject, (err, newProj) => {
        if(err) console.log(err);
        else res.redirect("projects");
    });

});

//NEW - Show a form to create a new project
router.get("/new", middleware.isLoggedIn, (req, res) => {
    res.render("projects/new");
});

//SHOW - Show info about one project
router.get("/:id", (req, res) => {
    Project.findById(req.params.id).populate("comments").exec((err, foungProject) => {
        if(err) console.log(err);
        else {
            res.render("projects/show", {project: foungProject});
        };
    });
});

//EDIT - Form to edit one project
router.get("/:id/edit", middleware.checkProjectOwnership, (req, res) => {
    Project.findById(req.params.id, (err, foundProject) => {
        if(err) {
            console.log(err);
            res.redirect("projects");
        }
        else {
            res.render("projects/edit", {project: foundProject});
        }
    });
});

//UPDATE - Send the edit form to DB
router.put("/:id", middleware.checkProjectOwnership, (req, res) => {
    Project.findByIdAndUpdate(req.params.id, req.body, (err, updatedProject) => {
        if(err) {
            console.log(err);
            res.redirect("/projects");
        }
        else {
            res.redirect("/projects/" + req.params.id);
        }
    });
});

//DESTROY - Delete a project from DB
router.delete("/:id", middleware.checkProjectOwnership, (req, res) => {
    Project.findByIdAndRemove(req.params.id, (err, deletedProject) => {
        if(err) {
            console.log(err);
            res.redirect("/projects");
        }
        else {
            res.redirect("/projects");
        }
    });
});

module.exports = router;