const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//WE CAN STORE THIS IN JSON MUCH MORE EASILY :) 
//create Schema and Model of whitelist
const whitelistSchema = new Schema({
    highschoolId: String, //
    studentId: String, //local, part of email pre-id
})
module.exports = mongoose.model('Whitelist', whitelistSchema)

//whitelist will be cross-checked with googleAuth
//API gateway can sit between...
//Authorization code coming in
//and Exchange code for token going out