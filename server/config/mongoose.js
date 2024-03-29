let mongoose = require('mongoose');
let fs = require('fs');

mongoose.connect('mongodb+srv://Ana_Oliveira:github2018@cluster0-55ro8.mongodb.net/cooking?retryWrites=true', { useNewUrlParser: true});

//load all the model files
var models_path = __dirname + "/../models"

//for each file in the path
fs.readdirSync(models_path).forEach(function(file){
    //check if it is a js file, if so load it
    if(file.indexOf('.js') > 0){
        //load each model file
        require(models_path + '/'+ file);
    }
});