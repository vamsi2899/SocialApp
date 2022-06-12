const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
    title: { type: String, required: true },
    image: { type: String, default: "" },
    video: { type: String, default: "" },
    //relationship
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
})


const Post = mongoose.model("Post", postSchema);
module.exports = Post