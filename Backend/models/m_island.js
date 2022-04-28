//if this doesn't work and the mongoose module can't be found, type npm install mongoose into terminal
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// put after I've separated the island schema into it's own folder and file
// const Student = require('../models/island.js');

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