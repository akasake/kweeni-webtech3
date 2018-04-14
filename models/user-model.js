const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    facebookId: String,
    firstName: Schema.Types.Mixed
});

const User = mongoose.model('user', userSchema);

module.exports = User;