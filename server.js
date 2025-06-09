import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes.js';
import pokemonRoutes from './routes/pokemonRoutes.js';


dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

app.use('/', (req, res) => {
  res.send('Welcome to the Pokémon API!');
}
);
app.use('/api/auth', authRoutes);
app.use('/api/pokemon', pokemonRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
