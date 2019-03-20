let mongoose = require('mongoose');
let Comment = mongoose.model('Comment');


function createComment(req, res, next){
    console.log("req body", req.body.title)
    console.log("req body", req.body.comment)
    let comment = new Comment(req.body);
    console.log('before assignment')
    comment.user ={
        name: req.session.user.username
    }
    console.log(comment)
    comment.save((err)=>{
         if(err){
             console.log(`Error occured ${err}`, comment);
             return next();
         };
         res.json({ok: true});
    });
 };


function getAllComments(req, res, next){
    console.log(req.body.title)
    Comment.find({title : req.body.title} ,(err, comments) => {
        if(err) {
            console.log('Error getting comments: ', err);
           return next();
        }
       console.log(req.body)
        res.json(comments);
    });
};



module.exports = {
   createComment,
   getAllComments
};