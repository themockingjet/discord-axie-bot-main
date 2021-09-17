const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
    userID: { type: String, require: true, unique: true },
    roninAddress: { type: String, require: true },
    marketUrl: { type: String, require: true}
})

const model = mongoose.model("ProfileModels", profileSchema);

module.exports = model