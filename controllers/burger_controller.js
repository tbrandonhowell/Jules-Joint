

const express = require("express"); // pull in express again within the controller so that we can use the Router() method
const router = express.Router(); // utilize the Router() express method to create our routes. the "router" constant in this case is an object.


// Import the model (burgers.js) to use its database functions.
const burgersModel = require("../models/burgers.js");
// TODO: ^^ not configuring this yet. Just want my routes to work.


router.get("/", function(req,res) { // adding this get() method to our router object. looking for a GET to the root so we can display the page
    console.log("GET request received");
    res.render("index");
    // TODO: put in a proper route
});


router.post("/", function(req,res) { // adding this post() method to our router object. looking for a POST to the root so we can add an entry to DB
    console.log("POST request received");
    // TODO: put in a proper route
});

router.put("/", function(req,res) { // adding this put() method to our router object. looking for a PUT to the root so we can update an entry in DB
    console.log("PUT request received");
    // TODO: put in a proper route
});

module.exports = router; // pass this router object (that holds all our routes) through whenever burger_controller.js is imported