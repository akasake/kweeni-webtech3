const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const questionSchema = new Schema({
    question: String,
    slug: String,
    likes: Number,
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

const Question = mongoose.model('question', questionSchema);

module.exports = Question;