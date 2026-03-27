const Question = require("../models/question.js");
const catchAsync = require("../utils/catchAsync.js");

module.exports.getAllQuestions = catchAsync(async(req,res,next)=>{
    const allQuestions = await Question.find({}).populate("owner");
    res.render("allQuestions",{allQuestions});
});

module.exports.newQuery = (req,res)=>{
    res.render("new");
};

module.exports.infoPage = (req,res)=>{
   res.render("info");
};

module.exports.createQuery = (req,res)=>{
  const {description} = req.body;
  const newQuery = new Question({
    // Username comes from the logged in user
    username:req.user.username,
    description:description,
    created_at:Date(),
    owner: req.user._id
  })
  newQuery.save();
  res.redirect("/");
};

module.exports.questionDetails = catchAsync(async(req,res,next)=>{
      const {id} = req.params;
      let askedQuery = await Question.findById(id)
      .populate("owner")
      .populate({
         path: "answers",
         populate: {
            path: "owner"
         }
      });
      const answers = askedQuery.answers;
      res.render("show.ejs",{askedQuery,answers});   
});

module.exports.editPage = catchAsync(async(req,res,next)=>{
   const {id} = req.params;
   let singleQuery = await Question.findById(id);
   res.render("edit.ejs",{singleQuery});
});

module.exports.editQuestion = catchAsync(async(req,res,next)=>{
   const {id} = req.params;
   let {description} = req.body;
   
   let requestedQuery = await Question.findById(id);
   requestedQuery.description = description;
   requestedQuery.created_at = Date();
   await requestedQuery.save();
   res.redirect("/");
});

module.exports.deleteQuery = catchAsync(async(req,res,next)=>{
   const {id} = req.params;
   let singleQuery = await Question.findById(id);
   await Question.deleteOne(singleQuery);
   res.redirect("/");
});

