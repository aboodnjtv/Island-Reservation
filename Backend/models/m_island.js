//if this doesn't work and the mongoose module can't be found, type npm install mongoose into terminal
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// put after I've separated the island schema into it's own folder and file
// const Student = require('../models/island.js');

//name, location, land_size, details, price, rating, islandImg, is_available
// create student schema & model
const islandSchema = new Schema({
    name: {
        type: String
    },
    location: {
      type: String
    },
    land_size: {
      type: Number
    },
    details: {
      type: String
    },
    price: {
      type: Number
    },
    rating: {
      type: Number
    },
    islandImg: {
      type: String
    },
    is_available: {
      type: Boolean
    }
    // amenities: {
    //   type: [String],
    //   // required: [true, 'name field is required']
    // },
    // isAvailable: {
    //   type: Boolean,
    //   // required: [true, 'name field is required']
    // },
    // pic_url: {
    //   type: String,
    //   // required: [true, 'name field is required']
    // }
});

const Island = mongoose.model('island', islandSchema);

module.exports = Island;