import mongoose from "mongoose";

const collectionSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    pokemonId: { type: String, required: true },
});

const Collection = mongoose.model(
    "Collection",
    collectionSchema
);

export default Collection;
