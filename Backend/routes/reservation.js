const express = require("express");
const Reservation = require("../models/m_reservation.js");
const bcrypt = require("bcrypt");
const ObjectId = require("mongodb").ObjectId;

const reservationRoutes = express.Router();

// This will help us connect to the database
const dbo = require("../db/conn");

reservationRoutes.get('/reservations', async (req, res) => {
  try
  {
      let db_client = dbo.getClient();
      let data = await db_client.db("IR").collection("reservations").find({}).toArray();

      res.send(data);
  }
  catch(error)
  {
      res.status(500).json({message: error.message});
  }
})

// Add reservation route
reservationRoutes.route("/reservations/add").post(async (req, res) => {
    // let db_client = dbo.getDb();
    let db_client = dbo.getClient();

    // Get request body
    const { reserver_id, island_id, startDate, endDate } = req.body;
    // Check if username or island exists in database
    console.log(reserver_id);
    let existingUser = await db_client.db("IR").collection("users").find({_id: ObjectId(reserver_id)}).toArray();
    console.log(existingUser);
    let existingIsland = await db_client.db("IR").collection("islands").find({_id: ObjectId(island_id)}).toArray();
    console.log(existingIsland)
    if (existingUser.length <= 0)
    {
        return res.status(409).json({message: "User not found."});
    } else if (existingIsland.length <= 0) 
    {
        return res.status(409).json({message: "Island not found"});
    }
    const island = existingIsland[0];
    const amountPaid = island.price;
    const reservationDate = new Date();

    // Create object to insert into database
    const reservation = new Reservation({
        reserver_id,
        island_id,
        amountPaid,
        reservationDate,
        startDate,
        endDate
    });
  
    // Insert into database
    db_client.db("IR").collection("reservations").insertOne(reservation, function (err) {
        if (err) {
        // If insert fails, return 500 error status
        return res.status(500).json({message: "Server Error. Failed to insert into database."});
        // res.status(500).send("Server Error: Failed to insert into database.");
        }
        // Return reservation deatils in api call, automatically returns 200 success status
        return res.json(reservation);
    });
});

module.exports = reservationRoutes;