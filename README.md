# PokeKari Backend – Pokémon Collection API

*Node.js + Express + MongoDB Atlas*

## 🧩 What This Is

This is the backend API for **PokeKari**, a fullstack Pokémon collection tracker built as part of a creative assignment using the [PokéAPI](https://pokeapi.co/). It handles user authentication and supports two main features:

* 🔐 **Auth**: Register & login using JWT
* 📦 **Collection & Wishlist**: Users can add, remove, and list Pokémon

The goal was to make a lightweight, personal API to support collectors like myself who want to track their cards or favorite Pokémon.

---

## 🛠️ Tech Stack

* Node.js + Express
* MongoDB Atlas
* bcrypt for password hashing
* JWT for authentication

---

## 🚀 How to Run It Locally

```bash
git clone https://github.com/giecherry/pokemon-app-BE
cd pokemon-app-BE
npm install
```

Then create a `.env` file in the root:

```env
MONGODB_URI=your_mongodb_atlas_uri
JWT_SECRET=your_secret_key
```

Run the server:

```bash
node server.js
```

Runs on: `http://localhost:3000`

---

## 📌 Routes

### Auth

* `POST /api/auth/register`
* `POST /api/auth/login`

### Protected (Requires JWT)

* `GET /api/pokemon/collection`
* `POST /api/pokemon/collection`
* `DELETE /api/pokemon/collection/:id`
* `GET /api/pokemon/wishlist`
* `POST /api/pokemon/wishlist`
* `DELETE /api/pokemon/wishlist/:id`

All protected routes use a middleware that verifies JWT and attaches `userId` to the request.

---

## ⚠️ Known Gaps / Future Work

* Add validation and error handling for cleaner responses
* Refactor routes into service/controller structure
* Add pagination & filtering for large collections
* Create endpoints for evolution tracking and metadata

---

## 🧠 Reflection

Originally, I tried multiple databases and platforms (PostgreSQL, SQLite, Render), but eventually stuck with MongoDB Atlas for its flexibility and simplicity. Despite limited time, I focused on functionality over polish — and built something I genuinely wanted for myself as a card collector.