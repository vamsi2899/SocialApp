// 1. import mongoose
const mongoose = require("mongoose");
// 2. create schema for entity
const userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    is_active: { type: Boolean, default: true },
})

// 3. create model of schema
const User = mongoose.model("User", userSchema);
module.exports = User