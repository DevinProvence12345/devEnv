//shown when compose-processer is running
console.log("Backend Server is starting....");

//This is a minimalist web-framework for NodeJS
var express = require("express");

// //GraphQL Playlist Dependencies
// const graphqlHTTP = require('express-graphql');
// const schema = require('./schema/schema');
// const mongoose = require('mongoose');
// const cors = require('cors');


//This is a parser middleware, that helps to parse the incoming requests' body
var bodyparser = require("body-parser");

// Cookie middleware 
var cookieParser = require("cookie-parser");

//Helps to handle session 
var session = require("express-session");

//We can log useful info in commandline about requests
var morgan = require("morgan");

// Init Express app 
var app = express();

// //allow cross-origin requests
// app.use(cors());

//  //connect to DB
//  var mongoDB = 'mongodb+srv://testAuth:bhsmap@cluster0-fnkyq.gcp.mongodb.net/test?retryWrites=true&w=majority';
//  mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true});
//  var db = mongoose.connection;
//  db.once('open', () => {
//      console.log('connected to db');
//  })
//  db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// app.use('/graphql',graphqlHTTP({
//    schema, 
//    graphiql: true
// }));


//Set the initial port of backend app
app.set("port", 4000);

//In !Development! mode we can set to log the requests
app.use(morgan("dev"));

// body-parser init, it will parse the incoming parameters into req body
app.use(bodyparser.urlencoded({ extended: true }));

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:80");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
});

var handlerFn = (req, res, next) => {
    next();
};

///// serving json data ///////////////
//Initial route
app.get("/", handlerFn, (req, res) => {
    res.redirect("/api");
});

//Api route
app.route("/api").get(handlerFn, (req, res) => {
    res.sendFile(__dirname + "/public/api.html");
});

//Cars list 
app.route("/api/cars").get(handlerFn, (req, res) => {
    res.sendFile(__dirname + "/public/cars.json");
}); 
/////////////////////////////////////


        //callback route from google
 app.route("/signin/callback").get(handlerFn, (req, res) => {
    //declare vars from query string api return for later use
    console.log(req.query);
    let state = req.query.state;
    let code = req.query.code;
    let scope = req.query.scope;
    let authuser = req.query.authuser;
    let hd = req.query.hd;
    let prompt = req.queryprompt;
     res.send('example with route params')
 });



 //ERR HANDLING ROUTES/////////////////////////////

// Route for handling 404 request(unavailable routes)
app.use(function(req, res, next) {
    res.status(404).send("Sorry can't find that!");
});

// 500 error handler
function clientErrorHandler(err, req, res, next) {
    if (req.xhr) {
        res.status(500).send({ error: "Something failed!" });
    } else {
      next(err);  
    }
}
app.use(clientErrorHandler);


/////////////////////////////////////////////////


//start the express server
app.listen(app.get("port"), () =>
console.log(`App started on port ${app.get("port")}`)
);

module.exports = app;