import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes.js";
import pokemonRoutes from "./routes/pokemonRoutes.js";
import connectDB from "./db.js";

dotenv.config();
connectDB(); 

const app = express();

app.use(cors());
app.use(express.json());

app.get("/api", (req, res) => {
  res.send("Welcome to the Pokémon API!");
});
app.use("/api/auth", authRoutes);
app.use("/api/pokemon", pokemonRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
