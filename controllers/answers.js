const Answer = require("../models/answer.js");
const catchAsync = require("../utils/catchAsync.js");
const Question = require("../models/question.js");

module.exports.addAnswer = catchAsync(async(req,res,next)=>{
   const {id} = req.params;
   const {answerInput} = req.body;
   
   const newAnswer = new Answer({
      answer : answerInput,
      created_at: new Date,
      // Save which user created this answer
      owner: req.user._id
   });

   const question = await Question.findById(id);
   question.answers.push(newAnswer._id);
   await question.save();

   await newAnswer.save();
   res.redirect(`/${id}`);
});

module.exports.deleteAnswer = catchAsync(async(req,res,next)=>{
   let {id,answerId} = req.params;
   const answer = await Answer.findById(answerId);
   await Answer.deleteOne(answer);
   
   await Question.findByIdAndUpdate(id,{$pull:{answers:answerId}});

   res.redirect(`/${id}`);
});

module.exports.editAnswerPage = catchAsync(async(req,res,next)=>{
   const {id,answerId} = req.params;
   let question = await Question.findById(id);
   let answer = await Answer.findById(answerId);
   res.render("answerEditPage.ejs",{question,answer})
});

module.exports.editAnswer = catchAsync(async(req,res,next)=>{
   const {id,answerId}=req.params;
   const answer = await Answer.findById(answerId);
   const {editedAnswer} = req.body;
   answer.answer = editedAnswer;
   answer.created_at = new Date();

   await answer.save();
   res.redirect(`/${id}`)
});
