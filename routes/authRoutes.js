import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js"; // Import the User model

const router = express.Router();

// REGISTER
router.post("/register", async (req, res) => {
    const { email, password } = req.body;
    try {
        const hashed = await bcrypt.hash(
            password,
            10
        );
        const user = await User.create({
            email,
            password: hashed,
        });
        res
            .status(201)
            .json({ id: user._id, email: user.email });
    } catch (err) {
        res
            .status(400)
            .json({
                error: "Registration failed",
                details: err.message,
            });
    }
});

// LOGIN
router.post("/login", async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user)
            return res
                .status(400)
                .json({ error: "User not found" });

        const isValid = await bcrypt.compare(
            password,
            user.password
        );
        if (!isValid)
            return res
                .status(401)
                .json({ error: "Invalid credentials" });

        const token = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        );
        res.json({ token });
    } catch (err) {
        res
            .status(500)
            .json({
                error: "Login failed",
                details: err.message,
            });
    }
});

export default router;
