const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const questionSchema = new Schema({
    title: String,
    author: String
})
const Question = mongoose.model("question", questionSchema);

module.exports = Question;