//
//
//
const mongoose = require('mongoose');

const alertTokenSchema = new mongoose.Schema({
    userID: { type: String, require: true},
    tokenID: { type: String, require: true },
    aPrice: { type: Number, require: true, default: 0},
    channelId: { type: String }
})

const model = mongoose.model("alertTokenModels", alertTokenSchema);

module.exports = model