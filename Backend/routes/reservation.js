const express = require("express");
const Reservation = require("../models/m_reservation.js");
const bcrypt = require("bcrypt");

const reservationRoutes = express.Router();

// This will help us connect to the database
const dbo = require("../db/conn");

reservationRoutes.get('/reservation', async (req, res) => {
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
reservationRoutes.route("/reservation").post(async (req, res) => {
    let db_client = dbo.getDb();

    // Get request body
    const { userID, islandID } = req.body;
    // Check if username or island exists in database
    let existingUser = await db_client.collection("users").find({_id: userID}).toArray();
    let existingIsland = await db_client.collection("islands").find({_id: islandID}).toArray();
    if (existingUser.length != 1)
    {
        return res.status(409).json({message: "User not found."});
    } else if (existingIsland.length != 1) 
    {
        return res.status(409).json({message: "Island not found"});
    }
    const island = existingIsland[0];
    const price = island.price;
    const reservationDate = new Date();

    // Create object to insert into database
    const reservation = new Reservation({
        userID,
        islandID,
        price,
        reservationDate,
    });
  
    // Insert into database
    db_client.collection("reservation").insertOne(reservation, function (err) {
        if (err) {
        // If insert fails, return 500 error status
        return res.status(500).json({message: "Server Error. Failed to insert into database."});
        // res.status(500).send("Server Error: Failed to insert into database.");
        }
        // Return reservation deatils in api call, automatically returns 200 success status
        return res.json(reservation);
    });
});