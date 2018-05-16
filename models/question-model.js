const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const User = require('../models/user-model');

const questionSchema = new Schema({
    question: String,
    author: { type: Schema.Types.ObjectId, ref: 'User' },
    slug: String,
    date: Date,
    likes: [{ 
        likedBy: { type: Schema.Types.ObjectId, ref: 'User' }
    }],
    comment: [{
        comment: String,
        subComments: [{
            comment: String,
            postedBy: { type: Schema.Types.ObjectId, ref: 'User' }
        }],
        postedBy: { type: Schema.Types.ObjectId, ref: 'User' }
    }]   
});


const Question = mongoose.model('question', questionSchema);
const Comment = mongoose.model('Comment', commentSchema);
const Subcomment = mongoose.model('Subcomment', subcommentSchema);
const Like = mongoose.model('Like', likeSchema);

module.exports = Question;