const express = require("express");

// userRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /record.
const islandRoutes = express.Router();

// This will help us connect to the database
const dbo = require("../db/conn");

// This help convert the id from string to ObjectId for the _id.
const ObjectId = require("mongodb").ObjectId;

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//put after I've separated the island schema into it's own folder and file
//const Student = require('../models/island.js');

// create student schema & model
const islandSchema = new Schema({
    name: {
        type: String,
        required: [true, 'name field is required']
    },
    location: {
      type: String,
      required: [true, 'location field is required']
    },
    land_size: {
      type: Number,
      required: [true, 'land_size field is required']
    }, 
    amenities: {
      type: [String],
      // required: [true, 'name field is required']
    },
    isAvailable: {
      type: Boolean,
      // required: [true, 'name field is required']
    },
    pic_url: {
      type: String,
      // required: [true, 'name field is required']
    }
});

const Island = mongoose.model('island', islandSchema);

module.exports = Island;

islandRoutes.get('/islands',function(req,res){
  let db_connect = dbo.getDb();
  await db_connect.collection("islands").find({}).toArray(
  // Island.find({}).toArray(
    function(err, results) 
    {
      if (err) 
      {
        res.status(500).json({message: '500 Failure'});
        console.error(err); 
      }
      else 
      {
        console.log("successfully retrieved all of the islands");
        res.json({ message: '200 Success' , island_list: results}); 
      }
    }
  )
  // Island.find({}).then(function(islands){
  //     // res.send(islands); //sends the list of islands retrieved when the GET endpoint is called
  //     console.log("successfully retrieved all of the islands");
  //     res.json({ message: '200 Success' , island_list: islands});
  // })
  // .catch(
  //   function(err) 
  //   {
  //     res.status(500).json({message: '500 Failure'});
  //     console.error(err);
  //     // res.status(500);
  //     next(); //indicates that the handler is complete
  //   }
  // );
});

// function(err, results) {
//   if (err) {
//       // do something error-y
//   } else {
//       res.send( results );
//   }

// router.get("/posts", async (req, res) => {
// 	const posts = await Post.find()
// 	res.send(posts)
// })

// This section will help you signup
// userRoutes.route("/user/signup").post(function (req, response) {
//   let db_connect = dbo.getDb();
//   let myobj = {
//     fname: req.body.fname,
//     lname: req.body.lname,
//     email: req.body.email
//   };
//   db_connect.collection("users").insertOne(myobj, function (err, res) {
//     if (err) throw err;
//     response.json(res);
//   });
// });

module.exports = userRoutes;