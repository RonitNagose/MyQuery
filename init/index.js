const mongoose = require('mongoose');
const Question = require("../models/question.js");
const Data = require("./data.js");

main()
.then((res)=>console.log("Database Connected Successfully"))
.catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/MyQuery')
}

const initDb = async()=>{
    await Question.deleteMany({});
    await Question.insertMany(Data.data);
    console.log("Data was Initialized");
}

initDb();