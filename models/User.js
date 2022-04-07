const mongoose = require("mongoose");

const User = mongoose.model("User", {
    name: String,
    salary: Number,
    approved: Boolean,
});

module.exports = User;