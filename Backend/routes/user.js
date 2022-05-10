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
  console.log("user signup endpoint accessed");
  let db_connect = dbo.getDb();
  let db_client = dbo.getClient();
  let myobj = {
    fname: req.body.fname,
    lname: req.body.lname,
    email: req.body.email,
    password: req.body.password,
    balance: 0
  };
  db_client.db("IR").collection("users").insertOne(myobj, function (err, res) {
    if (err) throw err;
    // response.json(res);
  });
  console.log("very end of user signup endpoint reached");
  // response.json({status: 200});
  response.status(200).send({"status": 220, "id": "100-000001"});
});

// userRoutes.post("/user/login", async (req, res) => {
//   let db_client = dbo.getClient();
//   const username = req.body.email;
//   const pass = req.body.password;

//   let existingUser = await db_client.db("IR").collection("users").findOne({email: username}, {}).toArray();
//   console.log(existingUser);
//   if (existingUser.length == 0)
//   {
//     res.end("Error: Email doesn't exist in our records.");
//   }


// });

//took from Abdel's sample code, registering a new user
userRoutes.post("/user/register", async (req, res) => {
  let db_connect = dbo.getDb();
  let db_client = dbo.getClient();

  console.log("entered register user");
  console.log(req.body);
  const { firstname, lastname, new_username, email, password } = req.body;

  console.log("");
  // let existingUser = await db_client.db("IR").collection("users").find({username: new_username}).toArray();
  // console.log(existingUser);
  // if (existingUser.length != 0)
  // {
  //   res.end("Error: Username is already in use.");
  // }
  // res.end("about to sign up a new user");

  const hash = await bcrypt.hash(password, 12);
  const user = new User({
    firstname,
    lastname,
    new_username,
    email,
    password: hash,
    balance: 0,
    isAdmin: false,
  });

  // let db_client = dbo.getClient();
  await db_client.db("IR").collection("users").insertOne(user);
  // res.json(user);
  res.end("Customer added.");
  // after signing up, redirect to login page
  // res.redirect("/login");
});

//also taken from Abdel's sample code, logging in a user
userRoutes.post("/user/login", async (req, res) => {
  let db_client = dbo.getClient();
  const { username, password } = req.body;
  const user = await db_client.db("IR").collection("users").findOne({ email: username }, {});
  if (!user)
  {
    console.log("username doesn't exist");
    res.end("failed login for: " + username);
  }
  else
  {
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
      res.end("failed login for: " + username);
    }
  }
});

module.exports = userRoutes;