let mongoose = require('mongoose');
let Comment = mongoose.model('Comment');


function createComment(req, res, next){
    let comment = new Comment(req.body);
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
    Comment.find({title : req.body.title} ,(err, comments) => {
        if(err) {
            console.log('Error getting comments: ', err);
           return next();
        }
        res.json(comments);
    });
};

function deleteComment(req, res, next){
    Comment.findOneAndDelete({ _id: req.params.id })
    .then(deletedOne => res.send(deletedOne))
    .catch(err => {res.send(err)});
}


module.exports = {
   createComment,
   getAllComments,
   deleteComment
};