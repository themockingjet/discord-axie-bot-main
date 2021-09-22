const mongoose = require('mongoose');

const tokenSchema = new mongoose.Schema({
    tokenID: { type: String, require: true, unique: true },
    php: { type: Number, require: true, default: 0}
})

const model = mongoose.model("TokenModels", tokenSchema);

module.exports = model