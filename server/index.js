const express = require('express');
const app = express();
const menu = [
    { id: 1, name: "Veg Burger", price: 120 },
    { id: 2, name: "Paneer Pizza", price: 250 },
    { id: 3, name: "Cold Coffee", price: 80 }
];

// This sends the menu when you go to /menu
app.get('/menu', (req, res) => {
    res.json(menu);
});

app.listen(5000, () => {
    console.log("Server updated! Check http://localhost:5000/menu");
});