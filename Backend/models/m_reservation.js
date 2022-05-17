//if this doesn't work and the mongoose module can't be found, type npm install mongoose into terminal
const mongoose = require('mongoose');

// Define Reservation schema
const reservationSchema = new Schema({
    reserver_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    island_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Island',
    },
    amountPaid: {
      type: Number,
    },
    reservationDate: {
      type: Date,
    }
});

const Reservation = mongoose.model('Reservation', reservationSchema);

module.exports = Reservation;