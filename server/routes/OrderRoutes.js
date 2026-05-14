const express = require('express');
const router = express.Router();
const Order = require('../models/Order');

//  Frontend se Order Place karne ke liye API
router.post('/place', async (req, res) => {
    try {
        const { restaurantId, customerName, customerMobile, tableNumber, items, totalAmount } = req.body;

        const newOrder = new Order({
            restaurantId, customerName, customerMobile, tableNumber, items, totalAmount
        });

        await newOrder.save();
        res.status(201).json({ message: "Order kitchen mein bhej diya gaya hai!", order: newOrder });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Order place nahi hua." });
    }
});

//  Chef ke Dashboard par Live Orders dikhane ke liye API 
router.get('/kitchen/:restaurantId', async (req, res) => {
    try {
        const { restaurantId } = req.params;
        const liveOrders = await Order.find({ 
            restaurantId, 
            status: { $in: ['Pending', 'Preparing'] } 
        }).sort({ createdAt: 1 }); // Purane orders pehle dikhenge

        res.status(200).json(liveOrders);
    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
});

//  Chef jab khana bana de, toh status 'Served' karne ke liye 
router.put('/update-status/:orderId', async (req, res) => {
    try {
        const { orderId } = req.params;
        const { status } = req.body; 

        const updatedOrder = await Order.findByIdAndUpdate(orderId, { status }, { new: true });
        res.status(200).json({ message: `Order status updated to ${status}`, order: updatedOrder });
    } catch (error) {
        res.status(500).json({ error: "Status update fail ho gaya." });
    }
});

module.exports = router;
