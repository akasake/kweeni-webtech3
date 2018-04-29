const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const User = require('../models/user-model');

const questionSchema = new Schema({
    question: String,
    slug: String,
    date: Date,
    likes: { type: Schema.Types.ObjectId, ref: 'Like' },
    author: { type: Schema.Types.ObjectId, ref: 'User' },
    comment: { type: Schema.Types.ObjectId, ref: 'Comment' }
});

const commentSchema = new Schema({
    comment: String,
    author: { type: Schema.Types.ObjectId, ref: 'User' },
    subcomment: { type: Schema.Types.ObjectId, ref: 'Subcomment' }
});

const subcommentSchema = new Schema({
    comment: String,
    author: { type: Schema.Types.ObjectId, ref: 'User' }
});

const likeSchema = new Schema({
    author: { type: Schema.Types.ObjectId, ref: 'User' }
});

const Question = mongoose.model('Question', questionSchema);
const Comment = mongoose.model('Comment', commentSchema);
const Subcomment = mongoose.model('Subcomment', subcommentSchema);
const Like = mongoose.model('Like', likeSchema);

module.exports = Question;