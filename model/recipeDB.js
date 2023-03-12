//DB file setup steps:

// importing mongoose
const mongoose = require("mongoose");

//connecting with DB
mongoose.connect("mongodb+srv://ashlyroy10:ashlyroy1997@cluster0.zacbcqw.mongodb.net/?retryWrites=true&w=majority");

//Creating Schema(structure for DB)
const Schema = mongoose.Schema;

//Creating New Schema
var recipeSchema = new Schema({
    cuiname : String,
    recname : String,
    duration : Number,
    serve : Number
});

//adding schema to a collection with collection name 'recipes'
var RecipeInfo = mongoose.model("recipes",recipeSchema);


//to use this file in server, export 
module.exports = RecipeInfo;
