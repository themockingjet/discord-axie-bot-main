const mongoose = require('mongoose');

const tokenSchema = new mongoose.Schema({
    tokenID: { type: String, require: true, unique: true },
    nickName: { type: String, default: null},
    usd: { type: Number, require: true, default: 0},
    php: { type: Number, require: true, default: 0}
})

const model = mongoose.model("TokenModels", tokenSchema);

module.exports = model