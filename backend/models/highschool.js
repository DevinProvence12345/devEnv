const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//create Schema and Model of Group
const highschoolSchema = new Schema({
    name: String, 
    primaryColor: String,
    secondaryColor: String
  })

module.exports = mongoose.model('Highschool', highschoolSchema)

//mongoose creates uuid for each schema

//long term - can design css on group.name basis
//e.g/Grossmont school colors blue/gold,
//but Valhala school colors orange/white,
//each school has a logo... 
//this can give experience with rendering png
