const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const eq = new Schema({
    user: String,
    text: String,
});

module.exports = mongoose.model("maths", eq);