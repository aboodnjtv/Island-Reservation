const express = require("express");
const User = require("../models/m_user.js");
const bcrypt = require("bcrypt");

// userRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /user.
const userRoutes = express.Router();

// This will help us connect to the database
const dbo = require("../db/conn");

userRoutes.get('/users', async (req, res) => {
  try
  {
      let db_client = dbo.getClient();
      let data = await db_client.db("IR").collection("users").find({}).toArray();

      res.send(data);
  }
  catch(error)
  {
      res.status(500).json({message: error.message});
  }
})

// Sign up route
userRoutes.route("/user/signup").post(async (req, res) => {
  let db_client = dbo.getDb();

  // Get request body
  const { firstname, lastname, username, email, password } = req.body;
  const hash = await bcrypt.hash(password, 12);

  // Check if username or email already exists
  let existingUser = await db_client.collection("users").find({username: username}).toArray();
  let existingEmail = await db_client.collection("users").find({email: email}).toArray();
  if (existingUser.length != 0)
  {
    // If username exists, send 409 error code with an error message
    // See this for standard error code and meanings: https://restfulapi.net/http-status-codes/
    return res.status(409).send("Error: Username is already in use.");
  } else if (existingEmail.length != 0) {
    // If email exists, send 409 error code with an error message
    return res.status(409).send("Error: Email is already in use.");
  }

  // Create object to insert into database
  const user = new User({
    firstname,
    lastname,
    username,
    email,
    password: hash,
    balance: 0,
    isAdmin: false,
  });
  
  // Insert into database
  db_client.collection("users").insertOne(user, function (err) {
    if (err) {
      // If insert fails, return 500 error status
      res.status(500).send("Server Error: Failed to insert into database.");
      throw err;
    }
    // Return user input in api call, automatically returns 200 success status
    return res.json(user);
  });
});

//also taken from Abdel's sample code, logging in a user
userRoutes.post("/user/signin", async (req, res) => {
  let db_client = dbo.getDb();
  const { email, password } = req.body;
  const user = await db_client.collection("users").findOne({ email: email }, {});
  if (!user)
  {
    console.log("username doesn't exist");
    res.end(email + " doesn't exist in our records.");
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
      res.end("failed login for: " + email);
    }
  }
});

module.exports = userRoutes;