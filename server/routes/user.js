//import libs
const express = require('express');
const User = require('../models/user');
//hash password
const bcrypt = require('bcrypt');
const router = express.Router()


//call routes
//login
router.post('/login', async(req, res) => {
    try {
        // const user = await User.login(req.body.email, req.body.password);
        const user = await User.findOne({ email: req.body.email });
        if (!user) return res.status(400).json({ sucess: false, message: "Check credentials" });
        //check if user is active
        if (user.is_active) {
            //compare password hash with password entered
            if (!bcrypt.compareSync(req.body.password, user.password)) return res.status(400).json({ sucess: false, message: "Check credentials" });
            return res.status(200).json({ success: true, user: user });
        } else {
            //if user is not active
            return res.status(400).json({ success: false, message: 'User is not active, please contact admin' });
        }
    } catch (err) {
        console.log(err);
        return res.status(500).json({ sucess: false, message: "Please try again" });
    }
});
//register
router.post('/register', async(req, res) => {
    try {
        const existingUser = await User.findOne({ email: req.body.email });
        if (existingUser) return res.status(400).json({ sucess: false, message: "User already exists" });

        let body = req.body;
        body['password'] = bcrypt.hashSync(body.password, 10);
        const user = await User.create(body);
        return res.status(201).json({ success: true, user: user });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ sucess: false, message: "Please try again" });
    }
});
//update password
router.put('/update_password', async(req, res) => {
    try {
        const user = await User.updateOne({ "_id": req.body.id }, { $set: { password: bcrypt.hashSync(req.body.password, 10) } });
        return res.status(200).json({ success: true, message: "password updated" });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ sucess: false, message: "Please try again" });
    }
});
//delete user
router.post('/delete_user', async(req, res) => {
    try {
        const user = await User.updateOne({ "_id": req.body.id }, { $set: { is_active: false } });
        return res.status(200).json({ success: true, message: "user deleted" });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ sucess: false, message: "Please try again" });
    }
});

//CRUD METHOD ADDED

module.exports = router;