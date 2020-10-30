//================================================
//              MIDDLEWARES
//================================================

const Project = require("../models/project");
const Comment = require("../models/comment");

let middlewareObj = {};

middlewareObj.isLoggedIn = (req, res, next) => {
    if(req.isAuthenticated()) return next();
    res.redirect("/login");
};

middlewareObj.checkProjectOwnership = (req, res, next) => {
    if(req.isAuthenticated()) {
        Project.findById(req.params.id, (err, foundProject) => {
            if(err) {
                console.log(err);
                res.redirect("back");
            }
            else {
                if(foundProject.author.id.equals(req.user._id)) {
                    next();
                }
                else {
                    res.redirect("back");
                }
            } 
        });
    }
    else {
        res.redirect("back");
    }
};

middlewareObj.checkCommentOwnership = (req, res, next) => {
    if(req.isAuthenticated()) {
        Comment.findById(req.params.comment_id, (err, foundComment) => {
            if(err) {
                console.log(err);
                res.redirect("back");
            } else {
                if(foundComment.author.id.equals(req.user._id)) {
                    next();
                }
                else {
                    res.redirect("back");
                }
            } 
        });
    }
    else {
        res.redirect("back");
    }
};

module.exports = middlewareObj;