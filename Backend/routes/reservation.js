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

//check if two date ranges for two reservations overlap, return true if there is overlap, return false if not
// function dateOverlap(startDate1, endDate1, startDate2, endDate2)
// {
//     console.log(typeof(startDate1) + " " + startDate1);
//     console.log(typeof(endDate1) + " " + endDate1);
//     console.log(typeof(startDate2) + " " + startDate2);
//     console.log(typeof(endDate2) + " " + endDate2);
//     if ((endDate1 >= startDate2 && endDate1 <= endDate2) ||
//          (endDate2 >= startDate1 && endDate2 <= endDate1))
//         return true;
//     else return false;
// }

// Add reservation route
reservationRoutes.route("/reservations/add/:uid/:lid").post(async (req, res) => {
    // let db_client = dbo.getDb();
    let db_client = dbo.getClient();
    let reserver_id = req.params.uid;
    let island_id = req.params.lid;
    // Get request body
    let { 
        // email,
        // islandName,
        // reservationDate,
        startDate,
        endDate,
        amountPaid,
    } = req.body;

    // Check if user is trying to reserve in the past
    // Edge case when user makes a reservation at 11:59:59 
    // on same day and reservation request goes through the next day
    const reservationDate = new Date();
    startDate = new Date(startDate);
    // Start date check in time will be 3pm
    startDate.setUTCHours(14,59,59,999);
    endDate = new Date(endDate);
    // End date check out time will be 12pm
    endDate.setUTCHours(11,59,59,999);
    if(reservationDate > startDate){
        return res
            .status(500)
            .json({message: "Sorry, your selected reservation window has expired."});
    }

    // Check if username or island exists in database
    let existingUser = await db_client.db("IR").collection("users").find({_id: ObjectId(reserver_id)}).toArray();
    let existingIsland = await db_client.db("IR").collection("islands").find({_id: ObjectId(island_id)}).toArray();
    //get list of reservations for the island the user is trying to reserve
    let islandsReservations = await db_client.db("IR").collection("reservations").find({island_id: ObjectId(island_id)}).toArray();
    let userReservations = await db_client.db("IR").collection("reservations").find({reserver_id: ObjectId(reserver_id)}).toArray();
    if (existingUser.length <= 0)
    {
        return res.status(409).json({message: "User not found."});
    } else if (existingIsland.length <= 0) 
    {
        return res.status(409).json({message: "Island not found"});
    }
    const user = existingUser[0];
    // const island = existingIsland[0];

    //check if the user has enough balance to pay for the reservation
    if (user.balance < amountPaid) {
        console.log("Sorry, your balance is not enough to reserve the island, please add money to your account!");
        return res
            .status(500)
            .json({message: "Sorry, your balance is not enough to reserve the island, please add money to your account!"});
    }

    for (let index = 0; index < islandsReservations.length; index++)
    {

        // if (dateOverlap(islandsReservations[index].startDate), islandsReservations[index].endDate, 
        //         new Date(startDate), new Date(endDate))
        if ((islandsReservations[index].endDate >= startDate && islandsReservations[index].endDate <= endDate) ||
         (endDate >= islandsReservations[index].startDate && endDate <= islandsReservations[index].endDate))
            {
                return res
                    .status(500)
                    .json({message: "Sorry, your selected reservations dates conflict with an existing reservation for this island."});
            }
    }

    for (let index = 0; index < userReservations.length; index++)
    {
        // if (dateOverlap(userReservations[index].startDate, userReservations[index].endDate, 
        //     new Date(startDate), new Date(endDate)))
        if ((userReservations[index].endDate >= startDate && userReservations[index].endDate <= endDate) ||
         (endDate >= userReservations[index].startDate && endDate <= userReservations[index].endDate))
            {
                return res
                    .status(500)
                    .json({message: "Sorry, your selected reservations dates conflict with one of your existing reservations."});
            }
    }

    //update user balance start ---------------------------
    const userQuery = { _id: ObjectId(reserver_id) };
    // Calculate updated balance
    const updatedBalance = user.balance - amountPaid;
    // MongoDB query to update user's balance
    const updateParameter = { $set: { balance: updatedBalance } };
    // Update user
    await db_client
        .db("IR")
        .collection("users")
        .updateOne(
            userQuery,
            updateParameter,
            { returnDocument: "after" },
            function (err, response) {
            if (err) throw err;
            // Return updated user info
            // return res
            //     .status(200)
            //     .json(response.value);
            }
        );
    // update user balance end ---------------------------

    // Create object to insert into database
    const reservation = new Reservation({
        reserver_id,
        island_id,
        amountPaid,
        reservationDate,
        startDate,
        endDate,
    });
  
    // Insert into database
    db_client
        .db("IR")
        .collection("reservations")
        .insertOne(reservation, function (err) {
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