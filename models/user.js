const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");

const userSchema = new mongoose.Schema({
   email: {
      type: String,
      required: true,
      unique: true
   }
});

// Some versions expose the plugin on `.default`, so we support both forms
userSchema.plugin(passportLocalMongoose.default || passportLocalMongoose);

module.exports = mongoose.model("User", userSchema);
