import mongoose from "mongoose";

const wishlistSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  pokemonId: { type: String, required: true },
});

const Wishlist = mongoose.model(
  "Wishlist",
  wishlistSchema
);

export default Wishlist;
