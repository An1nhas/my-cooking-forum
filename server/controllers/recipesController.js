let mongoose = require('mongoose');
let Recipe = mongoose.model('Recipe');


function createRecipe(req, res, next){
    let recipe = new Recipe(req.body);
    recipe.user = req.session.user._id;
    recipe.user ={
        name: req.session.user.username
    }
    recipe.save((err)=>{
         if(err){
             console.log('Error saving recipe: ', recipe);
             return next();
         };
         res.json({ok: true});
    });
 };


function getOneRecipe(req, res, next){
    Recipe.findOne({title:req.params.title}, ['title', 'description', 'comment'],(err, recipe) =>{
        
        if(err) {
            console.log('Error getting the article: ', recipe);
           return next();
        }
        res.json(recipe);
    })
}


function getAllRecipes(req, res, next){
    Recipe.find({}, ['title','comment','user'], (err, recipes) => {
        if(err) {
            console.log('Error getting recipes: ', err);
           return next();
        }
       
        res.json(recipes);
    });
};

function deleteRecipe(req, res, next){
    Recipe.findOneAndDelete({ title: req.params.title })
    .then(deletedOne => res.send(deletedOne))
    .catch(err => {res.send(err)});
}

function editRecipe(req, res, next){
    Recipe.findOne({ title: req.params.title })
    .then(recipe => {
        console.log(recipe)
	    recipe.title = req.body.title;
        recipe.description = req.body.description;
		recipe.save().then(savedRecipe => {
			res.send(savedRecipe);
		});
	});
}

module.exports = {
   createRecipe,
   getOneRecipe,
   getAllRecipes,
   deleteRecipe,
   editRecipe
};