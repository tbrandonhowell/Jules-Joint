
// PORTAGE
// ==================================================
const PORT = process.env.PORT || 3000; // use the server's port, or default to 3000
// ==================================================


// EXPRESS SETUP
// ==================================================
const express = require("express");            // require express
const app = express();                         // call express "app"
app.use(express.static("public"));             // set our static public directory
app.use(express.urlencoded({extended: true})); // converts incoming URLEncoded POST bodies into objects we can access
app.use(express.json());                       // converts incoming JSON POST bodies into objects we can access
// ==================================================


// EXPRESS + HANDLEBARS SETUP
// ==================================================
const exphbs = require("express-handlebars");              // require handlebars
app.engine("handlebars", exphbs({defaultLayout: "main"})); // "registering" the handlebars function with express (i.e. making able to use handlebars)
app.set("view engine", "handlebars");                      // actually telling express to use handlebars as its template engine
// ==================================================


// ROUTING INCOMING REQUESTS
// ==================================================
const routes = require("./controllers/burger_controller.js"); // import the controller functionality
app.use(routes);                                              // tell express to use these routes
// ==================================================


// GET TO LISTENING!
// ==================================================
app.listen(PORT, () => {                                // instruct express to listen on this port
    console.log("Server is listening on port " + PORT); // return this once we're successfully listening
});
// ==================================================





// TEMPORARY STUFF THAT NEEDS TO GO ELSEWHERE

