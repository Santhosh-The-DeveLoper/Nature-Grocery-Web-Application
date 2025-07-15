import React from 'react';
import { FaLeaf, FaShippingFast, FaLock, FaMoneyBillWave, FaRecycle } from 'react-icons/fa';
import useFloatRotateAnimation from '../hooks/useFloatRotateAnimation';

const About = () => {
  useFloatRotateAnimation();

  return (
    <section id='about' className="bg-white py-16 px-4 sm:px-8 md:px-16">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-4xl font-bold text-orange-500 mb-6">About Our Grocery Store</h2>
        <p className="text-gray-600 text-lg mb-10 max-w-3xl mx-auto">
          Welcome to <span className='text-green-400 font-semibold'>Nature</span><span className="font-semibold text-orange-600">Grocery</span>, your trusted online store for fresh produce and daily essentials.
          We combine convenience, speed, and quality to bring the market to your doorstep.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 text-left">
          <div className="float-rotate p-6 border rounded-lg shadow hover:shadow-lg transition">
            <FaLeaf className="text-green-500 text-3xl mb-3" />
            <h4 className="text-xl font-semibold text-gray-800 mb-2">Fresh & Quality Products</h4>
            <p className="text-gray-600">We deliver handpicked fruits, vegetables, and groceries sourced from top local vendors and farms.</p>
          </div>

          <div className="float-rotate p-6 border rounded-lg shadow hover:shadow-lg transition">
            <FaShippingFast className="text-blue-500 text-3xl mb-3" />
            <h4 className="text-xl font-semibold text-gray-800 mb-2">Fast & Reliable Delivery</h4>
            <p className="text-gray-600">Get your order delivered within hours — right to your doorstep, fresh and on time.</p>
          </div>

          <div className="float-rotate p-6 border rounded-lg shadow hover:shadow-lg transition">
            <FaMoneyBillWave className="text-yellow-500 text-3xl mb-3" />
            <h4 className="text-xl font-semibold text-gray-800 mb-2">Affordable Prices</h4>
            <p className="text-gray-600">Enjoy competitive pricing and frequent deals to help you save while shopping smart.</p>
          </div>

          <div className="float-rotate p-6 border rounded-lg shadow hover:shadow-lg transition">
            <FaLock className="text-purple-500 text-3xl mb-3" />
            <h4 className="text-xl font-semibold text-gray-800 mb-2">Secure Payments</h4>
            <p className="text-gray-600">Pay using trusted and encrypted methods — UPI, cards, net banking, or Cash on Delivery.</p>
          </div>

          <div className="float-rotate p-6 border rounded-lg shadow hover:shadow-lg transition">
            <FaRecycle className="text-teal-500 text-3xl mb-3" />
            <h4 className="text-xl font-semibold text-gray-800 mb-2">Eco-Friendly Packaging</h4>
            <p className="text-gray-600">We use recyclable, sustainable packaging to ensure we protect your groceries and the planet.</p>
          </div>

          <div className="float-rotate p-6 border rounded-lg shadow hover:shadow-lg transition">
            <h4 className="text-2xl font-semibold text-orange-500 mb-3">Our Mission 🎯</h4>
            <p className="text-gray-600">To simplify grocery shopping for modern families by combining technology, freshness, and service excellence.</p>
          </div>
        </div>

        <p className="mt-12 text-lg text-gray-700">
          🧡 Thank you for choosing <span className='text-green-400 font-semibold'>Nature</span><span className="font-semibold text-orange-600">Grocery</span> — we’re committed to serving you better every day!
        </p>
      </div>
    </section>
  );
};

export default About;
