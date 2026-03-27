const mongoose = require('mongoose');
const {Schema} = mongoose;

const answerSchema = new Schema({
    answer:String,
    created_at:Date,
    // This stores which user created the answer
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
})

const Answer = new mongoose.model("Answer",answerSchema);

module.exports = Answer;
