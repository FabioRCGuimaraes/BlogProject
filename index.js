//================================================
//                  CONFIG
//================================================

// MODULES IMPORTS
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const passport = require("passport");
const passportLocal = require("passport-local");
const passportLocalMongoose = require("passport-local-mongoose");
const methodOverride = require("method-override");

// FILES IMPORTS
const indexRoutes = require("./routes/index");
const projectRoutes = require("./routes/projects");

const User = require("./models/user");
const Project = require("./models/project");
const Comment = require("./models/comment");


// VARIABLES
const app = express();


// SETTINGS
mongoose.connect("mongodb://localhost/projectsBlogDB", { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false});

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true}));


// PASSPORT CONFIG
app.use(require("express-session")({
    secret: "Project Blog is awsome!",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new passportLocal(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


//================================================
//                  ROUTES
//================================================

// MIDDLEWARE
// app.use((req, res, next) => {
//     res.locals.currentUser = req.user;
//     next();
// });

// ROUTES
app.use(indexRoutes);
app.use("/projects", projectRoutes);


// Project.create({
//     name: "Project Test 1",
//     image: "https://images.pexels.com/photos/669615/pexels-photo-669615.jpeg?auto=compress&cs=tinysrgb&h=350",
//     description: "This is a description test."
// });


//================================================
//                  PORT CONFIG
//================================================
app.listen(4200, () => {
    console.log("Server on! Port 4200");
});