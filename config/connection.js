
// MYSQL PACKAGE INCLUDE
// ==================================================
const mysql = require("mysql"); // pull in the mysql package so we can use it for our DB connection
// ==================================================


// CREATE CONNECTION SPECS OBJECT
// ==================================================
// const connection = mysql.createConnection({ // use the createConnection() method for the mysql package. we feed createConnection() an object w/ the connection parameters
//     host: "localhost",
//     port: 3306,
//     user: "root",
//     password: "uncb00tc4mp",
//     database: "burgers_db"
// });
// so far we've taken the mysql package, created a connection object with it, and named it "connection"
// ==================================================


// CREATE CONNECTION SPECS OBJECT V2 (FOR HEROKU DB)
// ==================================================
var connection;
if(process.env.JAWSDB_URL) {
    connection = mysql.createConnection(process.env.JAWSDB_URL);
} else {
    connection = mysql.createConnection({ // use the createConnection() method for the mysql package. we feed createConnection() an object w/ the connection parameters
        host: "localhost",
        port: 3306,
        user: "root",
        password: "uncb00tc4mp",
        database: "burgers_db"
    });
}
// ==================================================





// OPEN THE ACTUAL CONNECTION TO THE DB
// ==================================================
connection.connect(function(err) { // accessing the connect() function of the "connection" object we created to actually connect with the DB using our spec
    if (err) {
        console.error(`error connecting: ${err.stack}`); // node's error.stack is a string describing the point in the code at which the Error was instantiated
        return; // hop out of the connection because we've hit an error
    } 
    console.log(`Connected as ID ${connection.threadId}`); // CLI notification that we're connected, uses the threadId value from the open connection
});
// ==================================================


// MAKE THIS CONNECTION INFORMATION AVAILABLE WHEN IMPORTED:
// ==================================================
module.exports = connection; // pass this connection object through whenever connection.js is imported
// ==================================================