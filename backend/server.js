//shown when compose-processer is running
console.log("Backend Server is starting....");

//This is a minimalist web-framework for NodeJS
var express = require("express");

// //GraphQL Playlist Dependencies
// const graphqlHTTP = require('express-graphql');
// const schema = require('./schema/schema');
// const mongoose = require('mongoose');
// const cors = require('cors');

//axios - handles HTTP requests
const axios = require("axios");


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

 app.get("/signin/callback", (req, res, next) => {
    //declare vars from query string api return for later use
    console.log(req.query);
    let hd = req.query.hd;
    let authCode = req.query.code;

    if(hd !== 'guhsd.net') {
        console.log('you are not good to pass')
        // The return is for not continueing to execute the controller
        return res.redirect(301, 'http://localhost:3000/?error=invalid_domain');
    } 

    res.send('making a post to exchange auth code for tokens')
        axios.post('https://oauth2.googleapis.com/token', {
               client_id: '243566847102-u4dk85cmjr12mh2knrpv3ins2tcrps8u.apps.googleusercontent.com',
               client_secret: 'N8MGvBc9ygb9XtGcuO99jtR3',
               code: authCode,
               grant_type: 'authorization_code',
               //goolge handles redirect to frontend
               redirect_uri: 'http://localhost:3000'
       })
       .then((response) => {
           console.log('Your token must to be here');
           console.log(response);
       })
       .catch((error) => {
           console.log('Error happened');
           next(error);
       });
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