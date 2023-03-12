//Basic Server Structure

//importing DB file to server file
const RecipeInfo = require('./model/recipeDb.js');

//for hosting
const path = require('path');

//1.Import Express
const express = require("express");

//2.Initialising Express
const app = new express();

//Parsing Body Parameter for POST function
app.use(express.urlencoded({extended : true}));
app.use(express.json());

//added for hosting
app.use(express.static(path.join(__dirname,'/build')));

//CORS Policy - Port Connection
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    res.setHeader("Access-Control-Allow-Headers", "X-Requested-With,content-type ");
    res.setHeader("Access-Control-Allow-Credentials", true);
    next();
});

//3.API Creation

//Add Recipe
app.post('/api/recipe/create',(req,res)=>{
    try{
        console.log(req.body);//data is in server
        let recipe = new RecipeInfo(req.body);//passing to database
        recipe.save();//data saved to db
        res.send("Data Added to db");
    }
   catch(error){
        res.status(500).send(error);
   }
    
});

//Read Indian Recipe
app.get('/api/recipe/readi',async (req,res)=>{
    try{
        let result = await RecipeInfo.find({"cuiname":"Indian"});
        res.json(result);
    }
    catch(error){
        res.status(500).send(error);
    }
    
});

//Read Chinese Recipe
app.get('/api/recipe/readc',async (req,res)=>{
    try{
        let result = await RecipeInfo.find({"cuiname":"Chinese"});
        res.json(result);
    }
    catch(error){
        res.status(500).send(error);
    }
    
});

//Update Recipe
app.post('/api/recipe/update',async (req,res)=>{
    try{
        console.log("update",req.body);
        let result = await RecipeInfo.findByIdAndUpdate(req.body._id,req.body);
        res.json(result);
    }
    catch(error){
        res.status(500).send(error);
    }
    
});

//Delete Recipe
app.post('/api/recipe/delete',async (req,res)=>{
    try{
        let result = await RecipeInfo.findByIdAndDelete(req.body._id);
        res.send("Data Deleted");
    }
    catch(error){
        res.status(500).send(error);
    }
    
});


//added for hosting
app.get('/*', function(req, res) {res.sendFile(path.join(__dirname,'/build/index.html')); });


//4.Setting PORT number
app.listen(8501, ()=> {console.log("Server is running in port 8501")})