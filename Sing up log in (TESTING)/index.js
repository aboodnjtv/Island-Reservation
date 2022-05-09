const express = require("express");
const app = express();
const User = require("./models/user");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const session = require("express-session");
const { render } = require("ejs");

//connecting to mongoose
mongoose
  .connect("mongodb://localhost:27017/authDemo", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MONGO CONNECTION OPEN!!!");
  })
  .catch((err) => {
    console.log("OH NO MONGO ERROR!!!");
    console.log(err);
  });

// so we can use the stylesheets
app.use(express.static("AuthDemo"));
app.use("/stylesheets", express.static(__dirname + "/stylesheets"));
//to use iamges in ejs files
app.use(express.static("public"));
//bootstrap
app.use("/css", express.static(__dirname + "/node_modules/bootstrap/dist/css"));

// for the ejs and to be able to render
app.set("view engine", "ejs");
app.set("views", "views");

//to be able to parse req.body
app.use(express.urlencoded({ extended: true }));
// for the session
app.use(session({ secret: "notagoodsecret" }));

//middleware to help us verify if a user is logged in or not
const requireLogin = (req, res, next) => {
  if (!req.session.user_id) {
    return res.redirect("/login");
  }
  next();
};

app.get("/", (req, res) => {
  res.render("home");
});

// Admin Stuff (Start)-------------------------
app.get("/Admin-register", (req, res) => {
  res.render("Admin-register");
});

app.post("/Admin-register", async (req, res) => {
  const { firstname, lastname, username, email, password } = req.body;
  const hash = await bcrypt.hash(password, 12);
  const user = new User({
    firstname,
    lastname,
    username,
    email,
    password: hash,
    balance: 0,
    isAdmin: true,
  });

  await user.save();
  // after signing up, redirect to login page
  res.redirect("/login");
});

app.post("/delete-user", async (req, res) => {
  const { adminId, id } = req.body;
  const user = await User.findOne({ _id: adminId });
  const deletedUser = await User.deleteOne({ _id: id });
  const allCustomers = await User.find({ isAdmin: false });
  const allAdmins = await User.find({ isAdmin: true });
  res.render("Admin", { user, allCustomers, allAdmins });
});

// Admin Stuff (end)-------------------------
/*************************************************/

// Sign up (Register) Routes (Start) -----------------------------
app.get("/register", (req, res) => {
  res.render("register");
});

/*
- extract username and password
- hash the password
- create new user
- add to database
  */
app.post("/register", async (req, res) => {
  const { firstname, lastname, username, email, password } = req.body;
  const hash = await bcrypt.hash(password, 12);
  const user = new User({
    firstname,
    lastname,
    username,
    email,
    password: hash,
    balance: 0,
    isAdmin: false,
  });

  await user.save();
  // after signing up, redirect to login page
  res.redirect("/login");
});
// Sign up (Register) Routes (End) -----------------------------
/*************************************************/
// Login Routes (Start) -----------------------------
app.get("/login", (req, res) => {
  res.render("login");
});

/*
- extract the username and password
- find the user with the username
- after finding the user
- compare the password to the hashed password
- if a valid login, add to session
*/

app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  const validPassword = await bcrypt.compare(password, user.password);
  if (validPassword) {
    // if a successful login, store user id in session
    req.session.user_id = user._id;
    if (user.isAdmin) {
      const allCustomers = await User.find({ isAdmin: false });
      const allAdmins = await User.find({ isAdmin: true });

      res.render("Admin", { user, allCustomers, allAdmins });
    } else {
      res.render("profile", { user });
    }

    // res.redirect("/secret");
  } else {
    res.redirect("/login");
  }
});
// Login Routes (End) -----------------------------
/******************************************/
// Log out Route (Start) -----------------------------
/*
- to log out
- remove user id from the session
- redirect to home, or login page
*/
app.post("/logout", async (req, res) => {
  //   req.session.user_id = null;
  req.session.destroy(); //more powerful
  res.redirect("/");
});
// log out Route (End) -----------------------------

// A route to add balance to user
app.post("/addBalance", async (req, res) => {
  const { addedBalance, id } = req.body;
  const user = await User.findOne({ _id: id });
  console.log("TO ADD: " + parseInt(addedBalance));
  console.log("user.balance: " + user.balance);
  user.balance += parseInt(addedBalance);
  await user.save();
  res.render("profile", { user });
});

// to protect (only valud if logged it)
// add an if statment to check if session has user id
app.get("/secret", requireLogin, (req, res) => {
  res.render("secret");
});

app.listen(3000, () => {
  console.log("SERRVING YOUR APP! on port 3000");
});
