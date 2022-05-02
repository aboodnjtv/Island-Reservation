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

//sample call in postman: localhost:5000/api/islands
islandRoutes.get('/islands', async (req, res) => {
  try
  {
      // console.log("got inside");
      let db_client = dbo.getClient();
      let data = await db_client.db("IR").collection("islands").find({}).toArray();

      res.send(data);
  }
  catch(error)
  {
      res.status(500).json({message: error.message});
  }
})

//sort by ascending land_size
islandRoutes.get('/islands/land_size/asc', async (req, res) => {
  try
  {
      let db_client = dbo.getClient();
      let all_islands = await db_client.db("IR").collection("islands").find({}).toArray();
        
      let ls_map = new Map();
      let ls_map_sorted = new Map();
      let sorted_data = new Array();

      for (let island = 0; island < all_islands.length; island++)
      {
        ls_map.set(all_islands[island], all_islands[island].land_size);

      }

      //sort the islands by ascending land size
      //from code found on StackOverflow
      ls_map_sorted = new Map([...ls_map.entries()].sort((size1, size2) => size1[1] - size2[1]));

      for (let island of ls_map_sorted.keys())
      {
        sorted_data.push(island);
      }

      res.send(sorted_data);
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
      let db_client = dbo.getClient();
      let all_islands = await db_client.db("IR").collection("islands").find({}).toArray();
        
      let ls_map = new Map();
      let ls_map_sorted = new Map();
      let sorted_data = new Array();

      for (let island = 0; island < all_islands.length; island++)
      {
        ls_map.set(all_islands[island], all_islands[island].land_size);

      }

      //sort the islands by descending land size
      //from code found on StackOverflow
      ls_map_sorted = new Map([...ls_map.entries()].sort((size1, size2) => size2[1] - size1[1]));

      for (let island of ls_map_sorted.keys())
      {
        sorted_data.push(island);
      }

      res.send(sorted_data);
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
      let db_client = dbo.getClient();
      let all_islands = await db_client.db("IR").collection("islands").find({}).toArray();
        
      let p_map = new Map();
      let p_map_sorted = new Map();
      let sorted_data = new Array();

      for (let island = 0; island < all_islands.length; island++)
      {
        p_map.set(all_islands[island], all_islands[island].price);

      }

      //sort the islands by ascending price
      //from code found on StackOverflow
      p_map_sorted = new Map([...p_map.entries()].sort((price1, price2) => price1[1] - price2[1]));

      for (let island of p_map_sorted.keys())
      {
        sorted_data.push(island);
      }

      res.send(sorted_data);
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
      let db_client = dbo.getClient();
      let all_islands = await db_client.db("IR").collection("islands").find({}).toArray();
        
      let p_map = new Map();
      let p_map_sorted = new Map();
      let sorted_data = new Array();

      for (let island = 0; island < all_islands.length; island++)
      {
        p_map.set(all_islands[island], all_islands[island].price);

      }

      //sort the islands by descending price
      //from code found on StackOverflow
      p_map_sorted = new Map([...p_map.entries()].sort((price1, price2) => price2[1] - price1[1]));

      for (let island of p_map_sorted.keys())
      {
        sorted_data.push(island);
      }

      res.send(sorted_data);
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
      let db_client = dbo.getClient();
      let all_islands = await db_client.db("IR").collection("islands").find({}).toArray();
        
      let r_map = new Map();
      let r_map_sorted = new Map();
      let sorted_data = new Array();

      for (let island = 0; island < all_islands.length; island++)
      {
        r_map.set(all_islands[island], all_islands[island].rating);

      }

      //sort the islands by ascending rating
      //from code found on StackOverflow
      r_map_sorted = new Map([...r_map.entries()].sort((rating1, rating2) => rating1[1] - rating2[1]));

      for (let island of r_map_sorted.keys())
      {
        sorted_data.push(island);
      }

      res.send(sorted_data);
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
      let db_client = dbo.getClient();
      let all_islands = await db_client.db("IR").collection("islands").find({}).toArray();
        
      let r_map = new Map();
      let r_map_sorted = new Map();
      let sorted_data = new Array();

      for (let island = 0; island < all_islands.length; island++)
      {
        r_map.set(all_islands[island], all_islands[island].rating);

      }

      //sort the islands by descending rating
      //from code found on StackOverflow
      r_map_sorted = new Map([...r_map.entries()].sort((rating1, rating2) => rating2[1] - rating1[1]));

      for (let island of r_map_sorted.keys())
      {
        sorted_data.push(island);
      }

      res.send(sorted_data);
  }
  catch(error)
  {
      res.status(500).json({message: error.message});
  }
})


module.exports = islandRoutes;