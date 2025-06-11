import express from "express";
import verifyToken from "../middleware/verifyToken.js";
import Collection from "../models/Collection.js"; 
import Wishlist from "../models/Wishlist.js"; 

const router = express.Router();

const fetchPokemonData = async (pokemonId) => {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`);
  if (!response.ok) {
    throw new Error("Pokémon not found");
  }
  const data = await response.json();
  return {
    id: data.id,
    name: data.name,
    sprite: data.sprites.front_default,
    types: data.types.map((type) => type.type.name),
  };
};

// Get user's collection
router.get(
  "/collection",
  verifyToken,
  async (req, res) => {
    try {
      const collection = await Collection.find({
        userId: req.userId,
      });
      if (collection.length === 0) {
        return res.status(404).json({
          error:
            "No Pokémon found in your collection.",
        });
      }
      res.json(collection);
    } catch (error) {
      res.status(500).json({
        error: "Failed to fetch collection",
        details: error.message,
      });
    }
  }
);

// Add to collection
router.post("/collection", verifyToken, async (req, res) => {
  const { pokemonId } = req.body;
  try {
    const pokemon = await fetchPokemonData(pokemonId);
    const newEntry = await Collection.create({
      userId: req.userId,
      pokemonId: pokemon.id,
      pokemonName: pokemon.name,
      sprite: pokemon.sprite,
      types: pokemon.types,
    });
    res.status(201).json(newEntry);
  } catch (error) {
    res.status(500).json({ error: "Failed to add Pokémon to collection", details: error.message });
  }
});

// Remove from collection
router.delete("/collection/:pokemonId", verifyToken, async (req, res) => {
  const { pokemonId } = req.params;
  try {
    const result = await Collection.findOneAndDelete({ userId: req.userId, pokemonId });
    if (!result) {
      return res.status(404).json({ error: "Pokémon not found in your collection" });
    }
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: "Failed to remove Pokémon from collection", details: error.message });
  }
});

// Get user's wishlist
router.get(
  "/wishlist",
  verifyToken,
  async (req, res) => {
    try {
      const wishlist = await Wishlist.find({
        userId: req.userId,
      });
      if (wishlist.length === 0) {
        return res.status(404).json({
          error:
            "No Pokémon found in your wishlist.",
        });
      }
      res.json(wishlist);
    } catch (error) {
      res.status(500).json({
        error: "Failed to fetch wishlist",
        details: error.message,
      });
    }
  }
);

// Add to wishlist
router.post("/wishlist", verifyToken, async (req, res) => {
  const { pokemonId } = req.body;
  try {
    const pokemon = await fetchPokemonData(pokemonId);
    const newEntry = await Wishlist.create({
      userId: req.userId,
      pokemonId: pokemon.id,
      pokemonName: pokemon.name,
      sprite: pokemon.sprite,
      types: pokemon.types,
    });
    res.status(201).json(newEntry);
  } catch (error) {
    res.status(500).json({ error: "Failed to add Pokémon to wishlist", details: error.message });
  }
});

// Remove from wishlist
router.delete("/wishlist/:pokemonId", verifyToken, async (req, res) => {
  const { pokemonId } = req.params;
  try {
    const result = await Wishlist.findOneAndDelete({ userId: req.userId, pokemonId });
    if (!result) {
      return res.status(404).json({ error: "Pokémon not found in your wishlist" });
    }
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: "Failed to remove Pokémon from wishlist", details: error.message });
  }
});

export default router;
