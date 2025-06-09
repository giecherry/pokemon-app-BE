import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const register = async (req, res) => {
  const { email, password } = req.body;
  try {
    const hash = await bcrypt.hash(password, 10);
    const user = await User.create({
      email,
      password: hash,
    });
    res
      .status(201)
      .json({ id: user._id, email: user.email });
  } catch (err) {
    res
      .status(500)
      .json({
        error: "Registration failed",
        details: err.message,
      });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (
      !user ||
      !(await bcrypt.compare(
        password,
        user.password
      ))
    ) {
      return res
        .status(401)
        .json({ error: "Invalid credentials" });
    }

    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET,
      {
        expiresIn: "2h",
      }
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
};

export { register, login };
