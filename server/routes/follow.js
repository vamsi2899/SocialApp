const express = require("express");
const Follow = require("../models/follow");
const router = express.Router();

router.route("/").post(async (req, res) => {
  try {
    let follow = await Follow.findOne({
      user_follow: req.body.user_follow,
      user_follower: req.body.user_follower,
    });

    if (!follow) follow = await Follow.create(req.body);
    return res.status(201).json({ success: true, follow: follow });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ sucess: false, message: "Please try again" });
  }
});

module.exports = router;
