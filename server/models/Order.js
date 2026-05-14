const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    restaurantId: { type: String, required: true },
    customerName: { type: String, required: true },
    customerMobile: { type: String, required: true },
    // Kaunse table se order aaya hai 
    tableNumber: { type: String, default: 'Takeaway' }, 
    
    // Khane ki list
    items: [
        {
            foodName: { type: String, required: true },
            price: { type: Number, required: true },
            quantity: { type: Number, required: true }
        }
    ],
    
    totalAmount: { type: Number, required: true },
    
    // Chef ke dashboard ke liye Live Status
    status: { 
        type: String, 
        enum: ['Pending', 'Preparing', 'Served'], 
        default: 'Pending' 
    }
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);
