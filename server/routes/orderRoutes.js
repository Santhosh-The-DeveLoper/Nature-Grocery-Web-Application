const express = require('express');
const Razorpay = require('razorpay');
const crypto = require('crypto');
const Order = require('../models/Order');
const verifyToken = require('../middleware/authMiddleware');
const router = express.Router();
require('dotenv').config();


// Initialize Razorpay
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_SECRET,
});

/**
 * @route   POST /api/orders/create-order
 * @desc    Create Razorpay Order (Online) or Save COD Order
 */
router.post('/create-order', async (req, res) => {
  try {
    const { userId, items, total, method } = req.body;

    if (!userId) return res.status(400).json({ message: 'Missing userId' });
    if (!Array.isArray(items) || items.length === 0)
      return res.status(400).json({ message: 'Missing or empty items array' });
    if (typeof total !== 'number' || total <= 0)
      return res.status(400).json({ message: 'Invalid or missing total amount' });
    if (!method) return res.status(400).json({ message: 'Missing payment method' });

    if (method === 'Online') {
      const options = {
        amount: total * 100, 
        currency: 'INR',
        receipt: `order_rcptid_${Date.now()}`
      };
      const order = await razorpay.orders.create(options);
      return res.status(200).json({ orderId: order.id, amount: options.amount });
    }

    const newOrder = new Order({
      userId,
      items,
      total,
      paymentMethod: 'COD',
      status: 'Placed',
      createdAt: new Date()
    });

    await newOrder.save();
    res.status(201).json({ message: 'Order placed with Cash on Delivery', order: newOrder });

  } catch (error) {
    console.error('Create Order Error:', error);
    res.status(500).json({ message: 'Server Error' });
  }
});

/**
 * @route   POST /api/orders/verify-payment
 * @desc    Verify Razorpay payment and save order
 */
router.post('/verify-payment', async (req, res) => {
  try {
    const { userId, items, total, razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_SECRET)
      .update(body)
      .digest("hex");

    if (expectedSignature !== razorpay_signature) {
      return res.status(400).json({ message: 'Invalid payment signature' });
    }

    const newOrder = new Order({
      userId,
      items,
      total,
      paymentMethod: 'Online',
      status: 'Paid',
      razorpayOrderId: razorpay_order_id,
      razorpayPaymentId: razorpay_payment_id,
      createdAt: new Date()
    });

    await newOrder.save();
    res.status(201).json({ message: 'Online payment verified and order placed', order: newOrder });

  } catch (error) {
    console.error('Verify Payment Error:', error);
    res.status(500).json({ message: 'Payment verification failed' });
  }
});

/**
 * @route   GET /api/orders/user
 * @desc    Get all orders of the logged-in user
 */
router.get('/user', verifyToken, async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.user._id }).sort({ createdAt: -1 });
    res.status(200).json(orders);
  } catch (error) {
    console.error('Get Orders Error:', error);
    res.status(500).json({ message: 'Failed to fetch user orders' });
  }
});


router.delete('/:orderId', verifyToken, async (req, res) => {
  try {
    const order = await Order.findOneAndDelete({
      _id: req.params.orderId,
      userId: req.user._id
    });

    if (!order) {
      return res.status(404).json({ message: 'Order not found or not authorized.' });
    }

    res.status(200).json({ message: 'Order cancelled successfully.' });
  } catch (err) {
    console.error('Cancel Order Error:', err);
    res.status(500).json({ message: 'Failed to cancel order.' });
  }
});


module.exports = router;
