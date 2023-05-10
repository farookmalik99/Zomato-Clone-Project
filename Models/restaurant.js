const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const RestaurantSchema = new Schema({
    city: {
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    locality: {
        type: String
    }
})

module.exports = mongoose.model('restaurantid', RestaurantSchema, 'Restaurant');