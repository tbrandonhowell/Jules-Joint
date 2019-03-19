

const express = require("express"); // pull in express again within the controller so that we can use the Router() method
const router = express.Router(); // utilize the Router() express method to create our routes. the "router" constant in this case is an object.


// Import the model (burgers.js) to use its (more specific) database functions.
const burgersModel = require("../models/burgers.js");


// V1 - WAS TRYING TO DO TWO SEPARATE SQL QUERIES INSTEAD OF ONE (AND THEN PARSING LATER)
// router.get("/", function(req,res) { // adding this get() method to our router object. looking for a GET to the root so we can display the page/app
//     console.log("GET request received");
//     burgersModel.allWhereFresh(function(data) { // use the 'allWhereFresh' query from the burgers model, feed it the only argument needed (a callback function)
//         const hbsObject = { // create an object that will be fed into our handlebars res.render below
//             freshBurgers: data // make the data object that comes back from the mysql query the value for the "burgers" key
//         };
//         console.log(hbsObject);
//         res.render("index", hbsObject); // for this route, render the index template, and feed the hbsObject data into the templates via handlebars.
//     });
//     // let freshBurgers = burgersModel.allWhereFresh(); // pull in the list of fresh burgers
//     // let devouredBurgers = burgersModel.allWhereDevoured(); // pull in the list of devoured burgers
//     // TODO: I had originally planned to have two mysql queries back-to-back to get fresh and devoured, but not sure if I can do that. right now we're just pulling the "fresh" list.
// });

// V2 - SINGLE SQL QUERY, THEN PARSING ONCE RETRIEVED
router.get("/", function(req,res) { // adding this get() method to our router object. looking for a GET to the root so we can display the page/app
    console.log("GET request received");
    burgersModel.all(function(data) { // use the 'alL' query from the burgers model, feed it the only argument needed (a callback function)
        const hbsObject = { // create an object that will be fed into our handlebars res.render below
            burgers: data // make the data object that comes back from the mysql query the value for the "burgers" key in this object that we'll loop through with handlebars
        };
        console.log(hbsObject);
        res.render("index", hbsObject); // for this route, render the index template, and feed the hbsObject data into the templates via handlebars.
    });
});




router.post("/", function(req,res) { // adding this post() method to our router object. looking for a POST to the root so we can add an entry to DB
    console.log("POST request received");
    burgersModel.createSimple(req.body.burger_name, function(result) { // use the 'createSimple' query from the burgers model, feed it the newBurger value from the POST body, and then feed it a callback function
        console.log(result);
        // TODO: What is this res.json for? (from the cats example.) Do we actually need to return this?
        res.json({ id: result.insertId });
        // TODO: reload the page? << this should happen on the front-end JS in the callback from the jquery POST
    });
});

router.put("/:id", function(req,res) { // adding this put() method to our router object. looking for a PUT to the root so we can update an entry in DB
    console.log("PUT request received");
    burgersModel.updateSimple(req.params.id, function(result) { // use the 'updateSimple' query from the burgers model to set a burger to 'true' for devoured. Feed it the burger ID from the PUT request, and then feed it a callback function
        if (result.changedRows === 0) { // if this is true, then something went wrong
            return res.status(404).end();
        } 
        return res.status(200).end(); // return a 200 server status if everything went okay.
    });
});

module.exports = router; // pass this router object (that holds all our routes) through whenever burger_controller.js is imported