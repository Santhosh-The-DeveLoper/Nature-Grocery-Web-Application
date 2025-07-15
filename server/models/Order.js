const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  items: [
    {
      name: { type: String, required: true },
      quantity: { type: Number, required: true },
      price: { type: Number, required: true },
      img: { type: String },
    }
  ],
  total: {
    type: Number,
    required: true,
  },
  paymentMethod: {
    type: String,
    enum: ['COD', 'Online'],
    required: true,
  },
  status: {
    type: String,
    enum: ['Pending', 'Placed', 'Paid', 'Shipped', 'Delivered', 'Cancelled'],
    default: 'Pending',
  },
  razorpayOrderId: {
    type: String,
    default: null,
  },
  razorpayPaymentId: {
    type: String,
    default: null,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  }
});

module.exports = mongoose.model('Order', orderSchema);
