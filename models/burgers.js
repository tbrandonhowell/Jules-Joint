// REQUIRE
// ==================================================
const orm = require("../config/orm.js"); // pulling in the ORM so we can make use of those mysql query templates
// ==================================================


// MODELS
// ==================================================
burgerModels = { // creating a new object containing more specific functions for the controller to use
    all: function(cb) {
        orm.all("burgers", function(res){
            cb(res);
        });
    },
    allWhereFresh: function(cb) { // create a more specific 'allWhere' function to get the uneaten burgers
        orm.allWhere("burgers", "devoured", false, function(res){ // use the 'allWhere' query template from the ORM
            cb(res);
        }); 
    },
    allWhereDevoured: function(cb) { // create a more specific 'allWhere' function to get the devoured burgers
        orm.allWhere("burgers", "devoured", true, function(res){
            cb(res);
        });
    },
    createSimple: function(newName, cb){ // create a more specific 'createSimple' function to create a new burger
        orm.createSimple("burgers", "burger_name", newName, function(res) {
            cb(res);
        });
    },
    updateSimple: function(updateID, cb){ // create a more specific 'updateSimple' function to update the 'devoured' status of a burger
        orm.updateSimple("burgers", "devoured", true, updateID, function(res) {
            cb(res);
        });
    }
};
// ==================================================


// MODULE.EXPORTS
// ==================================================
module.exports = burgerModels; // export these functions to the controller
// ==================================================