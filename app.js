require("./utils/loadEnv");

const express = require('express');
const app = express();
const path = require("path");
const engine = require("ejs-mate");
const mongoose = require('mongoose');
var methodOverride = require('method-override');

const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user");

const questionRoutes = require("./routes/questions.js");
const answerRoutes = require("./routes/answers.js");

// Values now come from the .env file
const port = process.env.PORT || 8080;
const mongoUrl = process.env.MONGO_URL || "mongodb://127.0.0.1:27017/MyQuery";
const sessionSecret = process.env.SESSION_SECRET || "mysupersecret";

app.engine("ejs",engine);
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.static(path.join(__dirname,"public")));

app.use(express.urlencoded({extended:true}));
app.use(methodOverride('_method'));

main()
.then((res)=>console.log("Database Connected Successfully"))
.catch(err => console.log(err));

async function main() {
  await mongoose.connect(mongoUrl)
}

app.listen(port,()=>{
    console.log("app is Listening");
})


// Setup session so the server can remember the logged in user
app.use(session({
   secret: sessionSecret,
   resave: false,
   saveUninitialized: false
}));

// Initialize passport
app.use(passport.initialize());
app.use(passport.session());

// Tell passport how login should work
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// These values become available inside every EJS file
app.use((req, res, next) => {
   res.locals.currentUser = req.user;
   res.locals.successMessage = req.session.successMessage;
   res.locals.errorMessage = req.session.errorMessage;

   delete req.session.successMessage;
   delete req.session.errorMessage;

   next();
});

// Register page
app.get("/register", (req, res) => {
   res.render("register.ejs");
});

// Register user
app.post("/register", async (req, res, next) => {
   try {
      const { username, email, password } = req.body;

      // Create user object first, then passport-local-mongoose stores hashed password
      const newUser = new User({ username, email });
      const registeredUser = await User.register(newUser, password);

      // Login right after successful signup
      req.login(registeredUser, (err) => {
         if (err) {
            return next(err);
         }

         req.session.successMessage = "Registration successful. You are now logged in.";
         res.redirect("/");
      });
   } catch (e) {
      req.session.errorMessage = e.message;
      res.redirect("/register");
   }
});

// Login page
app.get("/login", (req, res) => {
   res.render("login.ejs");
});

// Login user
app.post(
   "/login",
   (req, res, next) => {
      passport.authenticate("local", (err, user) => {
         if (err) {
            return next(err);
         }

         if (!user) {
            req.session.errorMessage = "Invalid username or password.";
            return res.redirect("/login");
         }

         req.logIn(user, (loginErr) => {
            if (loginErr) {
               return next(loginErr);
            }

            req.session.successMessage = "Welcome back. You are logged in now.";

            // If user was sent to login from a protected page, take them back there
            const redirectUrl = req.session.returnTo || "/";
            delete req.session.returnTo;

            res.redirect(redirectUrl);
         });
      })(req, res, next);
   }
);

// Logout user
app.get("/logout", (req, res, next) => {
   req.logout((err) => {
      if (err) {
         return next(err);
      }

      req.session.successMessage = "You have logged out successfully.";
      res.redirect("/");
   });
});

app.use("/",questionRoutes);
app.use("/:id",questionRoutes);
app.use("/:id/edit",questionRoutes);
app.use("/:id/delete",questionRoutes);
app.use("/",answerRoutes);

app.use((req,res,next)=>{
   const statusCode=404;
   const message = "Page Not Found";
   res.render("error.ejs",{message,statusCode});
   next();
})

app.use((err,req,res,next)=>{
   const {statusCode = 500 , message = "Something Error Occured!"} = err;
   res.render("error.ejs",{statusCode,message});
})
