const mongoose = require('mongoose');
const {Schema} = mongoose;
// const Answer = require("./answer.js");

const questionSchema = new Schema({
    username:String,
    description:String,
    created_at:Date,
    // This stores which user created the question
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    answers:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Answer"
        }
    ]
});

const Question = new mongoose.model("Question",questionSchema);

module.exports = Question;
