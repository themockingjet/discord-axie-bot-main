const mongoose = require('mongoose');

const tokenSchema = new mongoose.Schema({
    tokenID: { type: String, require: true, unique: true },
    php: { type: Number, require: true}
})

const model = mongoose.model("tblToken", tokenSchema);

module.exports = model