// routes/pokemon.js
import express from "express";
import verifyToken from "../middleware/verifyToken.js"; 
import db from "../db.js";

const router = express.Router();

// Get user's collection
router.get("/collection", verifyToken, async (req, res) => {
  const userId = req.userId;
  const result = await db.query(
    "SELECT pokemon_id FROM collections WHERE user_id = $1",
    [userId]
  );
  res.json(result.rows.map((r) => r.pokemon_id));
});

// Add to collection
router.post("/collection", verifyToken, async (req, res) => {
  const userId = req.userId;
  const { pokemon_id } = req.body;
  await db.query(
    "INSERT INTO collections (user_id, pokemon_id) VALUES ($1, $2)",
    [userId, pokemon_id]
  );
  res.status(201).json({ success: true });
});

// Remove from collection
router.delete("/collection/:pokemon_id", verifyToken, async (req, res) => {
  const userId = req.userId;
  const { pokemon_id } = req.params;
  await db.query(
    "DELETE FROM collections WHERE user_id = $1 AND pokemon_id = $2",
    [userId, pokemon_id]
  );
  res.json({ success: true });
});

// Get user's wishlist
router.get("/wishlist", verifyToken, async (req, res) => {
  const userId = req.userId;
  const result = await db.query(
    "SELECT pokemon_id FROM wishlists WHERE user_id = $1",
    [userId]
  );
  res.json(result.rows.map((r) => r.pokemon_id));
});

// Add to wishlist
router.post("/wishlist", verifyToken, async (req, res) => {
  const userId = req.userId;
  const { pokemon_id } = req.body;
  await db.query(
    "INSERT INTO wishlists (user_id, pokemon_id) VALUES ($1, $2)",
    [userId, pokemon_id]
  );
  res.status(201).json({ success: true });
});

// Remove from wishlist
router.delete("/wishlist/:pokemon_id", verifyToken, async (req, res) => {
  const userId = req.userId;
  const { pokemon_id } = req.params;
  await db.query(
    "DELETE FROM wishlists WHERE user_id = $1 AND pokemon_id = $2",
    [userId, pokemon_id]
  );
  res.json({ success: true });
});

export default router;
