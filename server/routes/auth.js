const express = require("express");
const bcryptjs = require("bcryptjs");
const User = require("../models/user");
const authRouter = express.Router();
const jwt = require("jsonwebtoken");
const auth = require("../middelwares/auth");

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

    const hashedPassword = await bcryptjs.hash(password, 8);

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

// Sign In Route
authRouter.post("/api/signin", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ msg: "User with this email does not exist!" });
    }

    const isMatch = await bcryptjs.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: "Incorrect password." });
    }

    const token = jwt.sign({ id: user._id }, "passwordKey");
    res.json({ token, ...user._doc });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

authRouter.post("/tokenInValid", async (req, res) => {
  try {
    const token = req.header("x-auth-token");
    if (!token) {
      return res.json(false);
    }
    const verified = jwt.verify(token, "passwordKey");
    if (!verified) return res.json(false);
    const user = await User.findByid(verified.id);
    if (!user) return res.json(false);

    res.json(true);
    
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

authRouter.get("/", auth, async (req, res) => {
  const user = await User.findByid(req.user);
  res.json({ ...user._doc, token: req.token });
});

module.exports = authRouter;