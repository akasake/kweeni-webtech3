const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const questionSchema = new Schema({
    question: String,
    slug: String,
    date: Date,
    likes: [{ 
        likedBy: { type: Schema.Types.ObjectId, ref: 'User' }
    }],
    author: { type: Schema.Types.ObjectId, ref: 'User' },
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


module.exports = Question;