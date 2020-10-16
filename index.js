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


// VARIABLES
const app = express();


// SETTINGS



//================================================
//                  ROUTES
//================================================

app.get("/", (req, res) => {
    res.send("This is a test!");
});



//================================================
//                  PORT CONFIG
//================================================
app.listen(4200, () => {
    console.log("Server on! Port 4200");
});