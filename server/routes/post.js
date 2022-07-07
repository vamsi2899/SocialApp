//import libs
const express = require("express");
const { db } = require("../models/post");
const Post = require("../models/post");
const router = express.Router();

//call routes
//create post
router
  .route("/")
  .post(async (req, res) => {
    try {
      const post = await Post.create(req.body);
      return res.status(201).json({ success: true, post: post });
    } catch (err) {
      console.log(err);
      return res
        .status(500)
        .json({ sucess: false, message: "Please try again" });
    } //update post
  })
  .put(async (req, res) => {
    try {
      const post = await Post.findOneAndUpdate(
        { _id: req.body.id },
        { $set: req.body },
        { new: true }
      );
      return res.status(201).json({ success: true, post: post });
    } catch (err) {
      console.log(err);
      return res
        .status(500)
        .json({ sucess: false, message: "Please try again" });
    }
  })
  .get(async (req, res) => {
    try {
      let posts = await Post.find();
      let newCollection = db.collection("posts").aggregate([
        {
          $lookup: {
            from: "users",
            localField: "user_id",
            foreignField: "_id",
            as: "user",
          },
        },
      ]);

      posts = await newCollection.toArray();

      return res.status(200).json({ success: true, post: posts });
    } catch (err) {
      console.log(err);
      return res
        .status(500)
        .json({ sucess: false, message: "Please try again" });
    }
  });

//delete post
router
  .route("/:id")
  .delete(async (req, res) => {
    try {
      const post = await Post.deleteOne({ _id: req.params.id });
      return res.status(200).json({ success: true, message: "post deleted" });
    } catch (err) {
      console.log(err);
      return res
        .status(500)
        .json({ sucess: false, message: "Please try again" });
    }
  })
  .get(async (req, res) => {
    try {
      const post = await Post.findById(req.params.id);
      return res.status(200).json({ success: true, post: post });
    } catch (err) {
      console.log(err);
      return res
        .status(500)
        .json({ sucess: false, message: "Please try again" });
    }
  });

router.route("/profile/:id").get(async (req, res) => {
  try {
    console.log(req.params.id);
    const post = await Post.find({ user_id: req.params.id });
    return res.status(200).json({ success: true, post: post });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ sucess: false, message: "Please try again" });
  }
});

module.exports = router;
