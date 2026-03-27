const express = require('express');
const router = express.Router();

const {getAllQuestions, newQuery , infoPage, createQuery, questionDetails,editPage, editQuestion, deleteQuery} = require("../controllers/questions");
const { isLoggedIn, isQuestionOwner } = require("../utils/authMiddleware");

router.get("/",getAllQuestions);

router.get("/newquery",isLoggedIn,newQuery);

router.post("/newquery",isLoggedIn,createQuery);

router.get("/:id",questionDetails);

router.get("/:id/edit",isLoggedIn,isQuestionOwner,editPage);

router.put("/:id/edit",isLoggedIn,isQuestionOwner,editQuestion);

router.delete("/:id/delete",isLoggedIn,isQuestionOwner,deleteQuery);

module.exports = router;
