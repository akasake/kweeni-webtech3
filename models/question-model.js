const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const User = require('../models/user-model');

const subcommentSchema = new Schema({
    comment: String,
    postedBy: {
        type: Schema.Types.ObjectId, 
        ref: 'User'
    }
});

const commentSchema = new Schema({
    comment: String,
    subComments: [subcommentSchema],
    postedBy: {
        type: Schema.Types.ObjectId, 
        ref: 'User'
    }
});

const likeSchema = new Schema({
    author: { type: Schema.Types.ObjectId, ref: 'User' }
});

const questionSchema = new Schema({
    question: String,
    slug: String,
    date: Date,
    likes: [{ 
        likedBy: {
            type: Schema.Types.ObjectId, 
            ref: 'Like' 
        }
    }],
    author: { type: Schema.Types.ObjectId, ref: 'User' },
    comment: [commentSchema]
});

const Question = mongoose.model('Question', questionSchema);
const Comment = mongoose.model('Comment', commentSchema);
const Subcomment = mongoose.model('Subcomment', subcommentSchema);
const Like = mongoose.model('Like', likeSchema);

module.exports = Question;