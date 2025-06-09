import express from "express";
import db from "../db.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const router = express.Router();

// REGISTER
router.post("/register", async (req, res) => {
    const { email, password } = req.body;
    const hashed = await bcrypt.hash(password, 10);
    try {
        const user = await db.query(
            "INSERT INTO users (email, password) VALUES ($1, $2) RETURNING id, email",
            [email, hashed]
        );
        res.status(201).json(user.rows[0]);
    } catch (err) {
        res.status(400).json({ error: err.detail });
    }
});

// LOGIN
router.post("/login", async (req, res) => {
    const { email, password } = req.body;
    const userResult = await db.query("SELECT * FROM users WHERE email = $1", [email]);
    const user = userResult.rows[0];

    if (!user) return res.status(400).json({ error: "User not found" });

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) return res.status(401).json({ error: "Invalid credentials" });

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: "7d" });
    res.json({ token });
});

export default router;
