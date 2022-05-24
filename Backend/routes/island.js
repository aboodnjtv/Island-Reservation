const express = require("express");
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');
uuidv4();
// userRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /record.
const islandRoutes = express.Router();

// This will help us connect to the database
const dbo = require("../db/conn");

// This help convert the id from string to ObjectId for the _id.
const ObjectId = require("mongodb").ObjectId;

const Island = require('../models/m_island.js');
const DIR = './public/';
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
      cb(null, DIR);
  },
  filename: (req, file, cb) => {
      const fileName = file.originalname.toLowerCase().split(' ').join('-');
      console.log("filename:", fileName)
      cb(null, uuidv4() + '-' + fileName)
  }
});

var upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
      if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
          cb(null, true);
      } else {
          cb(null, false);
          return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
      }
  }
});

//sample call in postman: localhost:5000/api/islands
islandRoutes.get('/islands', async (req, res) => {
  try
  {
      // console.log("got inside");
      let db_client = dbo.getClient();
      let data = await db_client.db("IR").collection("islands").find({}, {projection: {name: 1, location: 1, land_size: 1, islandImg: 1, is_available: 1}}).toArray();

      res.send(data);
  }
  catch(error)
  {
      res.status(500).json({message: error.message});
  }
})

//get a specific island by _id
//send in a _id as a url parameter
//ex: localhost:5000/island?id=627c579e955e61bdfe61df69 --> parameter id = 627c579e955e61bdfe61df69
islandRoutes.get('/island', async (req, res) => {
  try
  {
      const id_obj = new ObjectId(req.query.id);
      let db_client = dbo.getClient();
      let island_data = await db_client.db("IR").collection("islands").find({_id: id_obj}).toArray();

      res.send(island_data[0]);
  }
  catch(error)
  {
      res.status(500).json({message: error.message});
  }
})

async function getSortedIslands(parameter, order) {
  let db_client = dbo.getClient();
  let all_islands = await db_client.db("IR").collection("islands").find({}).toArray();
    
  let map = new Map();
  let map_sorted = new Map();
  let sorted_data = new Array();

  for (let island = 0; island < all_islands.length; island++)
  {
    map.set(all_islands[island], all_islands[island][parameter]);
  }

  //sort the islands by ascending land size
  //from code found on StackOverflow
  if (order == "asc")
    map_sorted = new Map([...map.entries()].sort((val1, val2) => val1[1] - val2[1]));
  //descending
  else map_sorted = new Map([...map.entries()].sort((val1, val2) => val2[1] - val1[1]));

  for (let island of map_sorted.keys())
  {
    sorted_data.push(island);
  }

  return sorted_data;
}

//sort by ascending land_size
islandRoutes.get('/islands/land_size/asc', async (req, res) => {
  try
  {
      const result = await getSortedIslands("land_size", "asc");
      res.send(result);
  }
  catch(error)
  {
      res.status(500).json({message: error.message});
  }
})

//sort by descending land_size
islandRoutes.get('/islands/land_size/desc', async (req, res) => {
  try
  {
    const result = await getSortedIslands("land_size", "desc");
    res.send(result);
  }
  catch(error)
  {
      res.status(500).json({message: error.message});
  }
})

//sort by ascending price
islandRoutes.get('/islands/price/asc', async (req, res) => {
  try
  {
    const result = await getSortedIslands("price", "asc");
    res.send(result);
  }
  catch(error)
  {
      res.status(500).json({message: error.message});
  }
})

//sort by descending price
islandRoutes.get('/islands/price/desc', async (req, res) => {
  try
  {
    const result = await getSortedIslands("price", "desc");
    res.send(result);
  }
  catch(error)
  {
      res.status(500).json({message: error.message});
  }
})

//sort by ascending rating
islandRoutes.get('/islands/rating/asc', async (req, res) => {
  try
  {
    const result = await getSortedIslands("rating", "asc");
    res.send(result);
  }
  catch(error)
  {
      res.status(500).json({message: error.message});
  }
})

//sort by descending rating
islandRoutes.get('/islands/rating/desc', async (req, res) => {
  try
  {
    const result = await getSortedIslands("rating", "desc");
    res.send(result);
  }
  catch(error)
  {
      res.status(500).json({message: error.message});
  }
})



// adding an island
islandRoutes.route("/islands/add").post(upload.single('islandImg'), async (req, res) => {
  let db_client = dbo.getDb();
  // Get request body
  const name = req.body.name;
  const location = req.body.location;
  const land_size = req.body.land_size;
  const details = req.body.details;
  const rating = req.body.rating;
  const price = req.body.price;
  const is_available = req.body.is_available;
  const latitude = req.body.latitude;
  const longitude = req.body.longitude;
  const owner_id = req.body.owner_id;
  
  // const { name, location, land_size, details, price, rating, is_available } = req.body;
  const url = req.protocol + '://' + req.get('host');
  const islandImg = url + '/public/' + req.file.filename;
  // Create object to insert into database
  const island = new Island({
    name,
    location,
    land_size,
    details,
    price,
    rating,
    islandImg,
    is_available,
    latitude,
    longitude,
    owner_id,
  });
 
  // Insert into database
  db_client.collection("islands").insertOne(island, function (err) {
    if (err) {
      // If insert fails, return 500 error status
      res.status(500).send("Server Error: Failed to insert into database.");
      throw err;
    }
    // Return user input in api call, automatically returns 200 success status
    return res.status(200).json(island);
  });
});


module.exports = islandRoutes;