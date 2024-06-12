import { Router } from "express";
import User from "../models/auth.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const router = Router();

// signup
router.post("/signup", async (req, res) => {
  const { email, password, name } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      email,
      password: hashedPassword,
      name,
    });
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

//signin
router.post("/signin", async (req, res) => {
  const { email, password } = req.body;

  try {
    const loginUser = await User.findOne({ email });
    if (!loginUser) {
      return res.status(400).json({ message: "User doesn't exists" });
    }
    const matchPassword = await bcrypt.compare(password, loginUser.password);
    if (!matchPassword) {
      return res.status(400).json({ message: "invalid credentials" });
    }

    const { password: userPassword, ...otherInfo } = loginUser._doc;

    const token = jwt.sign(otherInfo, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    res.status(200).json({ ...otherInfo, accessToken: token });
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

export { router };
