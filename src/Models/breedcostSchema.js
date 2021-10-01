const mongoose = require('mongoose');

const breedcostSchema = new mongoose.Schema({
    _id: { type: Number, require: true, default: 1},
    slpCost: {
        0: Number,
        1: Number,
        2: Number,
        3: Number,
        4: Number,
        5: Number,
        6: Number
    },
    axsCost: { type: Number}
})

const model = mongoose.model("breedCost", breedcostSchema);

module.exports = model