const express = require("express");
const router = express.Router({mergeParams: true});
const Project = require("../models/project");
const Comment = require("../models/comment");
const middleware = require("../middleware");


//================================================
//              COMMENTS ROUTES
//================================================

//NEW - show form to create new comment
router.get("/new", middleware.isLoggedIn, (req, res) => {
    Project.findById(req.params.id, (err, project) => {
        if(err) console.log(err);
        else res.render("comments/new", {project: project});
    });
});

//CREATE - add a new comment to the DB
router.post("/", middleware.isLoggedIn, (req, res) => {
    Project.findById(req.params.id, (err, project) => {
        if(err) {
            console.log(err);
            res.redirect("/projects");
        }
        else Comment.create(req.body.comment, (err, comment) => {
            if(err) console.log(err);
            else {
                //add username and id to comment
                comment.author.id = req.user._id;
                comment.author.username = req.user.username;
                comment.save();
                
                //save comment to project
                project.comments.push(comment);
                project.save();
                res.redirect("/projects/" + project._id);
            } 
        })
    });
});

//EDIT - Form to edit a comment
router.get("/:comment_id/edit", middleware.checkCommentOwnership, (req, res) => {
    Comment.findById(req.params.comment_id, (err, foundComment) => {
        if(err) {
            console.log(err);
            res.redirect("back");
        } else {
            res.render("comments/edit", {project_id: req.params.id, comment: foundComment});
        }
    })
    
});

//UPDATE - send the comment edit form to DB
router.put("/:comment_id", middleware.checkCommentOwnership, (req, res) => {
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, (err, updatedComment) => {
        if(err) {
            console.log(err);
            res.redirect("back");
        } else {
            res.redirect("/projects/" + req.params.id);
        }
    })
});

//DESTROY - delete a comment
router.delete("/:comment_id", middleware.checkCommentOwnership, (req, res) => {
    Comment.findByIdAndRemove(req.params.comment_id, (err, deletedComment) => {
        if(err) {
            console.log(err);
            res.redirect("back");
        }
        else {
            res.redirect("/projects/" + req.params.id);
        }
    });
});

module.exports = router;