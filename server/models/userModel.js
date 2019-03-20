const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;

let UsersSchema = new Schema({
    
    username: String,
    email: String,
    password: String,
    created_at: {
        type: Date,
        default: Date.now
    },
    updated_at: {
        type: Date,
        default: Date.now
    }
});

UsersSchema.methods.hashPassword = function(password){
    return bcrypt.hashSync(password, 12);
};

UsersSchema.methods.comparePassword = function(password, hashedPassword){
    return bcrypt.compareSync(password, hashedPassword);
}

module.exports = mongoose.model('User', UsersSchema);