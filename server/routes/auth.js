const express = require("express");
const bcryptjs = require("bcryptjs")
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

        const hashedPassword = await bcryptjs.hash(password, 8)

        let user = new User({
            email,
            password: hashedPassword,
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