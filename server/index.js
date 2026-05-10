require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

const app = express();

// 1. The Cloud Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("🔥 Scan-to-Dine Database Connected!"))
  .catch(err => console.error("❌ Connection Failed:", err));

// 2. Your Menu Data (Static for now, Database later)
const menu = [
  { id: 1, name: "Veg Burger", price: 120 },
  { id: 2, name: "Paneer Pizza", price: 250 },
  { id: 3, name: "Cold Coffee", price: 80 }
];

app.get('/menu', (req, res) => {
    res.json(menu);
});

app.listen(5000, () => {
    console.log("🔥 Server live on http://localhost:5000/menu");
});