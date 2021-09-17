const mongoose = require('mongoose');

const managerSchema = new mongoose.Schema({
    ownerID: { type: String, require: true },
    scholarID: { type: String, require: true },
    teamno: { type: Int },
    roninAddress: { type: String, require: true },
    marketUrl: { type: String, require: true}
})

const model = mongoose.model("ProfileModels", profileSchema);

module.exports = model