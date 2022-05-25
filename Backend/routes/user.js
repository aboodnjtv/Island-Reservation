const express = require("express");
const User = require("../models/m_user.js");
const bcrypt = require("bcrypt");

// userRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /user.
const userRoutes = express.Router();

// This will help us connect to the database
const dbo = require("../db/conn");
const e = require("express");

// This help convert the id from string to ObjectId for the _id.
const ObjectId = require("mongodb").ObjectId;

userRoutes.get("/users", async (req, res) => {
  try {
    let db_client = dbo.getClient();
    let data = await db_client.db("IR").collection("users").find({}).toArray();
    res.send(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//get a specific user by _id
//send in a _id as a url parameter
//ex: localhost:5000/user?id=628310e922fae0e05a9b10ef --> parameter id = 628310e922fae0e05a9b10ef
userRoutes.get("/user", async (req, res) => {
  try {
    const id_obj = new ObjectId(req.query.id);
    let currentDate = new Date();
    let db_client = dbo.getClient();
    let user_data = await db_client
      .db("IR")
      .collection("users")
      .find({ _id: id_obj })
      .toArray();

    let all_reservations = await db_client
      .db("IR")
      .collection("reservations")
      .find({ reserver_id: id_obj })
      .toArray();

    let past_reservations = [];
    let active_reservations = [];
    for (let resIndex = 0; resIndex < all_reservations.length; resIndex++) {
      if (
        all_reservations[resIndex].startDate > currentDate ||
        all_reservations[resIndex].endDate > currentDate
      ) {
        active_reservations.push(all_reservations[resIndex]);
      } else {
        past_reservations.push(all_reservations[resIndex]);
      }
    }

    // res.send(user_data[0]);
    res.status(200).json({
      user_info: user_data[0],
      active_res_count: active_reservations.length,
      past_res_count: past_reservations.length,
      active_reservations: active_reservations,
      past_reservations: past_reservations,
    });
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

//logging in a user
userRoutes.post("/user/signin", async (req, res) => {
  let db_client = dbo.getDb(); //IR DB
  const { email, password } = req.body;
  const user = await db_client
    .collection("users")
    .findOne({ email: email }, {});
  if (!user) {
    console.log("username doesn't exist");
    return res
      .status(500)
      .json({ message: email + " doesn't exist in our records." });
    // .end(email + " doesn't exist in our records.");
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
        let db_client = dbo.getClient();
        const id_obj = new ObjectId(user._id.toString());
        let currentDate = new Date();
        let all_reservations = await db_client
          .db("IR")
          .collection("reservations")
          .find({ reserver_id: id_obj })
          .toArray();
        let past_reservations = [];
        let active_reservations = [];
        for (let resIndex = 0; resIndex < all_reservations.length; resIndex++) {
          if (
            all_reservations[resIndex].startDate > currentDate ||
            all_reservations[resIndex].endDate > currentDate
          ) {
            active_reservations.push(all_reservations[resIndex]);
          } else {
            past_reservations.push(all_reservations[resIndex]);
          }
        }
        res.status(200).json({
          user_info: user,
          active_res_count: active_reservations.length,
          past_res_count: past_reservations.length,
          active_reservations: active_reservations,
          past_reservations: past_reservations,
        });
        // res.end("successful login for: " + user._id.toString());
      }

      // res.redirect("/secret");
    } else {
      console.log("failed login");
      // res.redirect("/login");
      return res.status(500).json({ message: "failed login for: " + email });
      // .end("failed login for: " + email);
    }
  }
});

// A route to add balance to user
userRoutes.post("/user/addcredit/:id", async (req, res) => {
  let db_client = dbo.getDb();
  // Get userID who we are adding credit to
  const userID = req.params.id;

  // This is the form data from Add Credit page, we don't do anything with it currently
  const { firstname, lastname, ccnumber, expr, cvc, addamount } = req.body;

  // Make sure user exists in database
  const user = await db_client
    .collection("users")
    .findOne({ _id: ObjectId(userID) });

  if (!user) {
    // If user not found return error message
    return res
      .status(500)
      .json({ message: "User doesn't exist in our records." });
  } else {
    // MongoDB query to find user
    const myquery = { _id: ObjectId(userID) };
    // Calculate updated balance
    const updatedBalance = parseInt(addamount) + parseInt(user.balance);
    // MongoDB query to update user's balance
    const newvalues = { $set: { balance: updatedBalance } };
    // Update user
    await db_client
      .collection("users")
      .findOneAndUpdate(
        myquery,
        newvalues,
        { returnDocument: "after" },
        function (err, response) {
          if (err) throw err;
          // Return updated user info
          res.status(200).json(response.value);
        }
      );
  }
});

//update user information
userRoutes.post("/user/update", async (req, res) => {
  let db_client = dbo.getDb();
  // Get userID who we are adding credit to
  const userID = new ObjectId(req.query.id);

  const { firstname, lastname, password } = req.body;

  if (password.length < 8) {
    return res
      .status(410)
      .json({ message: "Password must be at least 8 characters long." });
  }

  // Make sure user exists in database
  const user = await db_client
    .collection("users")
    .findOne({ _id: ObjectId(userID) });

  if (!user) {
    // If user not found return error message
    return res
      .status(500)
      .json({message: "User doesn't exist in our records." });
  } else {
    // MongoDB query to find user
    const myquery = { _id: userID };
    const hashed_password = await bcrypt.hash(password, 12);

    // MongoDB query to update user's balance
    const newvalues = { $set: { "firstname": firstname, "lastname": lastname, "password": hashed_password } };
    // Update user
    await db_client
      .collection("users")
      .findOneAndUpdate(myquery, newvalues, {returnDocument: "after"}, function (err, response) {
        if (err) throw err;
        // Return updated user info
        res.status(200).json(response.value);
      });
  }
});

//update user information
userRoutes.post("/user/update/firstname", async (req, res) => {
  let db_client = dbo.getDb();
  // Get userID who we are adding credit to
  const userID = new ObjectId(req.query.id);

  const { firstname} = req.body;

  // Make sure user exists in database
  const user = await db_client
    .collection("users")
    .findOne({ _id: ObjectId(userID) });

  if (!user) {
    // If user not found return error message
    return res
      .status(500)
      .json({ message: "User doesn't exist in our records." });
  } else {
    // MongoDB query to find user
    const myquery = { _id: userID };

    // MongoDB query to update user's balance
    const newvalues = {
      $set: {
        firstname: firstname
      },
    };
    // Update user
    await db_client
      .collection("users")
      .findOneAndUpdate(
        myquery,
        newvalues,
        { returnDocument: "after" },
        function (err, response) {
          if (err) throw err;
          // Return updated user info
          res.status(200).json(response.value);
        }
      );
  }
});

//update user information
userRoutes.post("/user/update/lastname", async (req, res) => {
  let db_client = dbo.getDb();
  // Get userID who we are adding credit to
  const userID = new ObjectId(req.query.id);

  const {lastname} = req.body;

  // Make sure user exists in database
  const user = await db_client
    .collection("users")
    .findOne({ _id: ObjectId(userID) });

  if (!user) {
    // If user not found return error message
    return res
      .status(500)
      .json({ message: "User doesn't exist in our records." });
  } else {
    // MongoDB query to find user
    const myquery = { _id: userID };

    // MongoDB query to update user's balance
    const newvalues = {
      $set: {
        lastname: lastname
      },
    };
    // Update user
    await db_client
      .collection("users")
      .findOneAndUpdate(
        myquery,
        newvalues,
        { returnDocument: "after" },
        function (err, response) {
          if (err) throw err;
          // Return updated user info
          res.status(200).json(response.value);
        }
      );
  }
});

//update user password only
userRoutes.post("/user/update/password", async (req, res) => {
  let db_client = dbo.getDb();
  // Get userID who we are adding credit to
  const userID = new ObjectId(req.query.id);

  const { password } = req.body;

  if (password.length < 8) {
    return res
      .status(410)
      .json({ message: "Password must be at least 8 characters long." });
  }

  // Make sure user exists in database
  const user = await db_client
    .collection("users")
    .findOne({ _id: ObjectId(userID) });

  if (!user) {
    // If user not found return error message
    return res
      .status(500)
      .json({ message: "User doesn't exist in our records." });
  } else {
    // MongoDB query to find user
    const myquery = { _id: userID };
    const hashed_password = await bcrypt.hash(password, 12);

    // MongoDB query to update user's balance
    const newvalues = {
      $set: {
        password: hashed_password
      },
    };
    // Update user
    await db_client
      .collection("users")
      .findOneAndUpdate(
        myquery,
        newvalues,
        { returnDocument: "after" },
        function (err, response) {
          if (err) throw err;
          // Return updated user info
          res.status(200).json(response.value);
        }
      );
  }
});

// A route to add balance to user
userRoutes.post("/user/reserve/:id", async (req, res) => {
  let db_client = dbo.getDb();
  // Get userID who we are adding credit to
  const userID = req.params.id;
  // This is the form data from Add Credit page, we don't do anything with it currently
  const { firstname, lastname, islandName } = req.body;
  // Make sure user exists in database
  const user = await db_client
    .collection("users")
    .findOne({ _id: ObjectId(userID) });
  if (!user) {
    // If user not found return error message
    return res
      .status(500)
      .json({ message: "User doesn't exist in our records." });
  } else {
    // found the user, now find the island based on its id
    const island = await db_client
      .collection("islands")
      .findOne({ name: islandName });

    if (!island) {
      console.log("Island was not found!");
      return res
        .status(500)
        .json({ message: "Island was not found in the database" });
    } else {
      console.log("Island named: " + islandName + " was found!");

      if (!island.is_available) {
        console.log(
          "Sorry!" +
            island.name +
            " Island is already reserved by another client!"
        );
        //instead render an actual page
        return res
          .status(500)
          .json({ message: "Island is already reserved by another client" });
      } else {
        //updat Availability of island (if it is already available)
        // MongoDB query to find island
        const myquery = { name: islandName };
        // Calculate updated balance
        const updatAvailability = false;
        // MongoDB query to update user's balance
        const newvalues = { $set: { is_available: updatAvailability } };
        // Update user
        await db_client
          .collection("islands")
          .findOneAndUpdate(
            myquery,
            newvalues,
            { returnDocument: "after" },
            function (err, response) {
              if (err) throw err;
              // Return updated user info
              res.status(200).json(response.value);
            }
          );
      }
    }
  }
});


//get the islands that a user has uploaded
//send in a _id as a url parameter
//ex: localhost:5000/user/islands?id=628310e922fae0e05a9b10ef --> parameter id = 628310e922fae0e05a9b10ef
userRoutes.get("/user/islands", async (req, res) => {
  try {
    const id_obj = new ObjectId(req.query.id);
    let db_client = dbo.getClient();
    let user_data = await db_client
      .db("IR")
      .collection("users")
      .find({ _id: id_obj })
      .toArray();

    let user_islands = await db_client
      .db("IR")
      .collection("islands")
      .find({ owner_id: id_obj })
      .toArray();

    // res.send(user_data[0]);
    res.status(200).json({
      user_info: user_data[0],
      user_islands: user_islands
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = userRoutes;
