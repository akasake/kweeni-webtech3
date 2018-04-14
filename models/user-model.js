const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    facebookId: String,
    username: String,
    email: String,
    picture: String
});

const User = mongoose.model('user', userSchema);

module.exports = User;