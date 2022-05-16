const express = require("express");
const User = require("../models/m_user.js");
const bcrypt = require("bcrypt");

// userRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /user.
const userRoutes = express.Router();

// This will help us connect to the database
const dbo = require("../db/conn");

userRoutes.get("/users", async (req, res) => {
  try {
    let db_client = dbo.getClient();
    let data = await db_client.db("IR").collection("users").find({}).toArray();

    res.send(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Sign up route
userRoutes.route("/user/signup").post(async (req, res) => {
  let db_client = dbo.getDb();

  // Get request body
  const { firstname, lastname, username, email, password } = req.body;
  if (password.length < 8) {
    return res
      .status(410)
      .json({ message: "Password must be at least 8 characters long." });
    // return res.status(410).send("Error: Password must be at least 8 characters long.");
  }

  if (email.indexOf("@") == -1 || email.indexOf(".") == -1) {
    return res.status(410).json({ message: "Not a valid email." });
    // return res.status(410).send("Error: Not a valid email.");
  }

  const hash = await bcrypt.hash(password, 12);

  // Check if username or email already exists
  let existingUser = await db_client
    .collection("users")
    .find({ username: username })
    .toArray();
  let existingEmail = await db_client
    .collection("users")
    .find({ email: email })
    .toArray();
  if (existingUser.length != 0) {
    // If username exists, send 409 error code with an error message
    // See this for standard error code and meanings: https://restfulapi.net/http-status-codes/
    return res.status(409).json({ message: "Username is already in use." });
    // return res.status(409).send("Error: Username is already in use.");
  } else if (existingEmail.length != 0) {
    // If email exists, send 409 error code with an error message
    return res.status(409).json({ message: "Email is already in use." });
    // return res.status(409).send("Error: Email is already in use.");
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
      return res
        .status(500)
        .json({ message: "Server Error. Failed to insert into database." });
      // res.status(500).send("Server Error: Failed to insert into database.");
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
  const user = await db_client
    .collection("users")
    .findOne({ email: email }, {});
  if (!user) {
    console.log("username doesn't exist");
    res.status(500).end(email + " doesn't exist in our records.");
  } else {
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
        res.status(200).json(user);
        // res.end("successful admin login for: " + user._id.toString());
      } else {
        res.status(200).json(user);
        // res.end("successful login for: " + user._id.toString());
      }

      // res.redirect("/secret");
    } else {
      console.log("failed login");
      // res.redirect("/login");
      res.status(500).end("failed login for: " + email);
    }
  }
});

// A route to add balance to user
userRoutes.post("/user/addcredit", async (req, res) => {
  const { addamount, email } = req.body;
  let db_client = dbo.getDb();
  const user = await db_client
    .collection("users")
    .findOne({ email: email }, {});
  // const user = await User.findOne({ _id: id });
  console.log("ADD Balance: " + parseInt(addamount));
  console.log("user.balance: " + user.balance);
  user.balance += parseInt(addamount);
  await user.save();
  // res.render("profile", { user });
});

module.exports = userRoutes;
