const express = require('express');
const router = express.Router();

const {addAnswer, deleteAnswer, editAnswerPage,editAnswer} = require("../controllers/answers");
const { isLoggedIn, isAnswerOwner } = require("../utils/authMiddleware");

router.post("/:id",isLoggedIn,addAnswer);

router.delete("/:id/:answerId/answer/delete",isLoggedIn,isAnswerOwner,deleteAnswer);

router.get("/:id/:answerId/answer/edit",isLoggedIn,isAnswerOwner,editAnswerPage);

router.put("/:id/:answerId/answer/edit",isLoggedIn,isAnswerOwner,editAnswer);

module.exports = router;
