const mongoose = require('mongoose')
const plantsSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    size: {
        type: Number,
        required: true
    },
    light: {
        type: String,
        required: true
    },
    watering: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    }
})

module.exports = mongoose.model("Plant", plantsSchema) //Modelo de datos de una