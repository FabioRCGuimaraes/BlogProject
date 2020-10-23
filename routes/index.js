const express = require("express");
const router = express.Router();
const passport = require("passport");
const User = require("../models/user");


//================================================
//                  ROOT ROUTE
//================================================

router.get("/", (req, res) => {
    res.render("index");
});

//================================================
//                  AUTH ROUTES
//================================================

// Register form
router.get("/register", (req, res) => {
    res.render("register");
});

// Send register form to DB
router.post("/register", (req, res) => {
    User.register(new User({ username: req.body.username }), req.body.password, (err, user) => {
        if(err) {
            console.log(err);
            return res.redirect("back");
        }
        
        passport.authenticate("local")(req, res, () => {
            res.redirect("/projects");
        });
    });
});


// Login form
router.get("/login", (req, res) => {
    res.render("login");
});

// Handle Login form
router.post("/login", passport.authenticate("local", {
    successRedirect: "/projects",
    failureRedirect: "/login"
}), (req, res) => {

});

// Handle Logout
router.get("/logout", (req, res) => {
    req.logOut();
    console.log("User logged out.");
    res.redirect("/");
});


// Export the router
module.exports = router;