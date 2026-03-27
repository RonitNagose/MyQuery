const Question = require("../models/question");
const Answer = require("../models/answer");

module.exports.isLoggedIn = (req, res, next) => {
   // If user is not logged in, remember the page and send them to login
   if (!req.isAuthenticated()) {
      req.session.returnTo = req.originalUrl;
      req.session.errorMessage = "Please login first to continue.";
      return res.redirect("/login");
   }

   next();
};

module.exports.isQuestionOwner = async (req, res, next) => {
   const { id } = req.params;
   const question = await Question.findById(id);

   // Extra check in case question is missing
   if (!question) {
      req.session.errorMessage = "Question not found.";
      return res.redirect("/");
   }

   // Only the creator of the question can edit or delete it
   if (!question.owner || !question.owner.equals(req.user._id)) {
      req.session.errorMessage = "You are not allowed to change this question.";
      return res.redirect(`/${id}`);
   }

   next();
};

module.exports.isAnswerOwner = async (req, res, next) => {
   const { id, answerId } = req.params;
   const answer = await Answer.findById(answerId);

   // Extra check in case answer is missing
   if (!answer) {
      req.session.errorMessage = "Answer not found.";
      return res.redirect(`/${id}`);
   }

   // Only the creator of the answer can edit or delete it
   if (!answer.owner || !answer.owner.equals(req.user._id)) {
      req.session.errorMessage = "You are not allowed to change this answer.";
      return res.redirect(`/${id}`);
   }

   next();
};
