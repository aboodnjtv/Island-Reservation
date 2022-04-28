const express = require("express");

// userRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /record.
const islandRoutes = express.Router();

// This will help us connect to the database
const dbo = require("../db/conn");

// This help convert the id from string to ObjectId for the _id.
const ObjectId = require("mongodb").ObjectId;

const Island = require('../models/m_island.js');

//if this doesn't work and the mongoose module can't be found, type npm install mongoose into terminal
// const mongoose = require('mongoose');
// const Schema = mongoose.Schema;

// // put after I've separated the island schema into it's own folder and file
// // const Student = require('../models/island.js');

// // create student schema & model
// const islandSchema = new Schema({
//     name: {
//         type: String,
//         required: [true, 'name field is required']
//     },
//     location: {
//       type: String,
//       required: [true, 'location field is required']
//     },
//     land_size: {
//       type: Number,
//       required: [true, 'land_size field is required']
//     }, 
//     amenities: {
//       type: [String],
//       // required: [true, 'name field is required']
//     },
//     isAvailable: {
//       type: Boolean,
//       // required: [true, 'name field is required']
//     },
//     pic_url: {
//       type: String,
//       // required: [true, 'name field is required']
//     }
// });

// const Island = mongoose.model('island', islandSchema);

// module.exports = Island;


//sample call in postman: localhost:5000/api/islands
islandRoutes.get('/islands', async (req, res) => {
  try{
      // console.log("got inside");
      let db_client = dbo.getClient();
      const data = await db_client.db("IR").collection("islands").find({}).toArray();
      res.send(data);
  }
  catch(error){
      res.status(500).json({message: error.message});
  }
})



// islandRoutes.get("/islands", async function(req,res,next){
//   // console.log("trying to get");
//   let db_connect = dbo.getDb();
//   db_connect.collection("IR").find({}).toArray(
//   // await Island.find({}).then(
//   // Island.find({}).toArray(
//     function(err, results) 
//     {
//       if (err) 
//       {
//         res.send({message: '500 Failure'});
//         console.error(err); 
//       }
//       else 
//       {
//         console.log("successfully retrieved all of the islands");
//         console.log(results);
//         res.send({ message: '200 Success' , island_list: results}); 
//       }
//     }
//   )
// });

// islandRoutes.get('/getAll', async (req, res) => {
//   try{
//       console.log("got inside");
//       let db_client = dbo.getClient();
//       const data = await db_client.db("IR").collection("islands").find({}).toArray();
//       res.send(data);
//   }
//   catch(error){
//       res.status(500).json({message: error.message});
//   }
// })


module.exports = islandRoutes;