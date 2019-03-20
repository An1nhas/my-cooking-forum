const usersController = require('../controllers/usersController');
const recipesController = require('../controllers/recipesController');
const commentsController = require('../controllers/commentsController');


module.exports = function(app){
    app.get('/ping', (req, res) => res.send('pong'));

    app.post('/api/register', usersController.createUser);

    app.post('/api/login', usersController.loginUser);

    app.get('/api/session', (req, res)=> res.json({session:req.session}));

    app.get('/api/logout', usersController.logout);

    app.get('/api/user', usersController.getSessionName);
    
    app.post('/api/create', recipesController.createRecipe);
    
    app.get('/api/recipe/:title',  recipesController.getOneRecipe);
    
    app.get('/api/recipes', recipesController.getAllRecipes);

    app.delete('/api/recipe/delete/:title', recipesController.deleteRecipe);

    app.put('api/recipe/edit/:title', recipesController.editRecipe);

    app.post('/api/create/comment', commentsController.createComment);

    app.post('/api/comments', commentsController.getAllComments);
    
};
    
