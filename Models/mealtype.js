const mongoose = require("mongoose")

const Schema = mongoose.Schema

const MealtypeSchema = new Schema({
    name: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Mealtype', MealtypeSchema, 'Mealtype')