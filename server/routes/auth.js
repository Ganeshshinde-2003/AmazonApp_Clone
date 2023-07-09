const express = require("express");
const User = require("../models/user");
const authRouter = express.Router();

authRouter.post("/api/signup", async (req, res) => {
    try {
        // get the data form the client 
        const { name, email, password } = req.body;

        // post that data in database
        const exitsingUser = await User.findOne({ email });
        if (exitsingUser) {
            return res.status(400).json({
                msg: "User with same email already exists!!!",
            });
        }

        let user = new User({
            email,
            password,
            name,
        });

        user = await user.save();

        // return that data to the user
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = authRouter;