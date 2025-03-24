const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    firstName : String,
    lastName : String,
    userName : {
        type : String,
        required : true,
        unique : true
    },
    email : {
        type : String,
        required : true,
        unique : true
    },
    password : {
        type : String,
        required : true
    }

});

module.exports = mongoose.model('User', userSchema);
