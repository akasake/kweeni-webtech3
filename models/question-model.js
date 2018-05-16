const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const User = require('../models/user-model');

const questionSchema = new Schema({
    question: String,
    slug: String,
    likes: Number,
    author: { type: Schema.Types.ObjectId, ref: 'user' },
    date: Date
});

const Question = mongoose.model('question', questionSchema);

module.exports = Question;