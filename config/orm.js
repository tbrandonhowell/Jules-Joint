// TODO: the "cats"/mvc (16) example had a bunch of helper functions in it - do we need those?

// Import MySQL connection.
const connection = require("../config/connection.js");

// create the ORM object
const orm = { // create the ORM object, which will hold prototypical SQL queries to be reused elsewhere
    all: function(table, cb) {
        const queryString = "select * from " + table + ";";
        console.log("queryString: ",queryString);
        connection.query(queryString, function(err,result) {
            if (err) {
                throw err;
            }
            cb(result);
            // TODO: ^^ how does this callback actually work? it's passed as an argument to the function. or is the last argument to a function always a callback?
        });
    },
    allWhere: function(table, column, match, cb) { // our function for grabbing the uneaten burgers from the DB (aka "select * from {table} where {column} = {value}")
        const queryString = "select * from " + table + " where " + column + " = " + match + ";"; // build out the SQL query based on the function argument values
        console.log("queryString: ",queryString);
        connection.query(queryString, function(err,result) { // use the query method on the connection object we imported to query the DB
            if (err) {
                throw err;
            }
            cb(result); // return the result of the connection
            // TODO: ^^ how does this callback actually work? it's passed as an argument to the function. or is the last argument to a function always a callback?
        });
    }, 
    createSimple: function(table, column, value, cb) { // function for creating a new record. Called it "createSimple" since it is only meant to ever receive a single column and value in this instance.
        const queryString = 'insert into ' + table + ' (' + column + ') values ("' + value + '");'; // build out the SQL query
        console.log("queryString: ",queryString);
        connection.query(queryString, function(err,result) {
            if (err) {
                throw err;
            }
            cb(result);
        });
        // TODO: Am i sanitizing these inputs?
    },
    updateSimple: function(table, column, value, match, cb) { // function for updating a record. Called it "updateSimple" since it is only meant to update a single field based on ID
        const queryString = "update " + table + " set " + column + " = " + value + " where id = " + match + ";"; // build out the SQL query
        console.log("queryString: ",queryString);
        connection.query(queryString, function(err,result) {
            if (err) {
                throw err;
            }
            cb(result);
        });
        // TODO: Am i sanitizing these inputs?
    }
}; // close ORM object


// Export the orm object for the model (burgers.js).
module.exports = orm;