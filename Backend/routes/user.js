const express = require("express");
const User = require("../models/m_user.js");
const bodyParser = require("body-parser");
const app = express();
const parser = require("../node_modules/express/node_modules/raw-body/index.js");
const bcrypt = require("bcrypt");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// const node_mods = require("../node_modules");
// const bcrypt = require("bcrypt");

// userRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /record.
const userRoutes = express.Router();
app.use("/",userRoutes);

// This will help us connect to the database
const dbo = require("../db/conn");
const { response } = require("express");

// This help convert the id from string to ObjectId for the _id.
const ObjectId = require("mongodb").ObjectId;

// This section will help you signup
userRoutes.route("/user/signup").post(function (req, response) {
  let db_connect = dbo.getDb();
  let myobj = {
    fname: req.body.fname,
    lname: req.body.lname,
    email: req.body.email
  };
  db_connect.collection("users").insertOne(myobj, function (err, res) {
    if (err) throw err;
    response.json(res);
  });
});

//took from Abdel's sample code, registering a new user
userRoutes.post("/user/register", async (req, res) => {
  let db_connect = dbo.getDb();
  console.log("entered register user");
  console.log(req.body);
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

  let db_client = dbo.getClient();
  await db_client.db("IR").collection("users").insertOne(user);
  // res.json(user);
  res.end("Customer added.");
  // after signing up, redirect to login page
  // res.redirect("/login");
});

//also taken from Abdel's sample code, logging in a user
userRoutes.post("/user/login", async (req, res) => {
  let db_client = dbo.getClient();
  const { entered_username, password } = req.body;
  const user = await db_client.db("IR").collection("users").findOne({ username: entered_username }, {});
  console.log(user);
  const validPassword = await bcrypt.compare(password, user.password);
  if (validPassword) {
    console.log("successful login");
    // if a successful login, store user id in session
    console.log("user id:" + user._id.toString());
    // req.session.user_id = user._id.toString();
    if (user.isAdmin) {
      const allCustomers = await User.find({ isAdmin: false });
      const allAdmins = await User.find({ isAdmin: true });
      // res.render("Admin", { user, allCustomers, allAdmins });
      res.end("successful admin login for: " + user._id.toString());
    } else {
      res.end("successful login for: " + user._id.toString()); 
      // res.render("profile", { user });
    }

    // res.redirect("/secret");
  } else {
    console.log("failed login");
    // res.redirect("/login");
    res.end("failed login for: " + entered_username);
  }
});

module.exports = userRoutes;