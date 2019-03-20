let mongoose = require('mongoose');
let User = mongoose.model('User');

function createUser(req, res, next){
    let user = new User(req.body);
    user.password = user.hashPassword(user.password);
    user.save((err)=>{
         if(err){
             console.log('Error saving User: ', user);
             return next();
         };
         res.json({ok: true});
    });
 };

 
function loginUser(req, res, next){
    User.findOne({email: req.body.email}, (err, user)=>{
        if(err) {
            console.log('Error logging user: ', err);
           return next();
        }
        if(!user) {
            return res.json({error: true, message:'User does not exist!' });
        }
        if(!user.comparePassword(req.body.password, user.password)){
            return res.json({err: true, message: 'Password does not match!'});
        }
        req.session.user = user;
        res.json(user);
    });
};


function authUser(req, res, next){
    if(req.session.user) return next();
    res.json({err: true, message: 'Not authenticated'});
};


function getSessionName(req, res, next){
    res.json({userName: req.session.user.username});
}


function logout(req, res) {
    req.session.destroy( (err) => {
        if(err){
            console.log('Error loggin out: ', err);
            return next();
        }
        res.json({ok: true});
    })
}



module.exports = {
    createUser, 
    loginUser, 
    authUser,
    logout,
    getSessionName
};