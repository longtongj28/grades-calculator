const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique:true,
        minlength: 5
    },
    password: {
        type: String,
        required: true,
        minLength: 5
    }
})

module.exports = User = mongoose.model('user', UserSchema);