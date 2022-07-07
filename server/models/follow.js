const mongoose = require("mongoose");

const followSchema = new mongoose.Schema({
  //relationship
  user_follow: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  user_follower: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

const Follow = mongoose.model("Follow", followSchema);
module.exports = Follow;
