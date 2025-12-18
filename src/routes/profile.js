const express = require('express');
const profileAuth = express.Router();
const User = require('../models/users');
const { validEditdata } = require('../utils/ValidationSignup');
const { userauth } = require('../middlewears/auth');
const bcrypt = require('bcrypt');

profileAuth.get('/profile/view', userauth, async (req, res) => {
    try {
        const user = req.user;
        res.send(user);
    } catch (err) {
        res.status(401).send("Err " + err.message);
    }
});

profileAuth.patch('/profile/edit', userauth, async (req, res) => {
    try {
        if (!validEditdata(req)) {
            throw new Error("Invalid edit request");
        }

        const loginuser = req.user;

        Object.keys(req.body).forEach((field) => {
            loginuser[field] = req.body[field];
        });

        await loginuser.save();

        res.send({ message: "Profile updated", user: loginuser });
    } catch (err) {
        res.status(401).send("Err " + err.message);
    }
});

profileAuth.patch('/profile/editpassword', userauth, async (req, res) => {
    try {
        const { oldPassword, newPassword } = req.body;

        if (!oldPassword || !newPassword) {
            return res.status(400).send("Both oldPassword and newPassword are required.");
        }

        const user = req.user;

        // Compare old password
        const isMatch = await bcrypt.compare(oldPassword, user.password);
        if (!isMatch) {
            return res.status(400).send("Old password is incorrect.");
        }

        // Check password length 
        if (newPassword.length < 6) {
            return res.status(400).send("New password must be at least 6 characters.");
        }

        // Hash & update
        user.password = await bcrypt.hash(newPassword, 10);

        await user.save();

        res.send({ message: "Password updated successfully" });
    } catch (err) {
        res.status(500).send("Err " + err.message);
    }
});

module.exports = profileAuth;
