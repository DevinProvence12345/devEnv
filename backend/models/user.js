const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//create Schema and Model of User
const userSchema = new Schema({
    googleId: String, //source - ??? redis??? 
    highschoolId: String, //source- mongoDB from W.L.
    placeId: String, //source - Place Search
  });
  
module.exports = mongoose.model('User', userSchema);

//USER DATA STORED ON GOOGLE SERVERS 
//GET FROM API REQ 
//start with basicGoogleAccountInformation 
//-email,givenName,familyName,