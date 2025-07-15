import React from 'react';
import { FaFacebookF, FaInstagram, FaTwitter, FaLinkedinIn } from 'react-icons/fa';
import Logoimage from '../assets/logoimage.png'

const Footer = () => {
  return (
    <footer className="bg-green-900 text-white pt-10 pb-6 mt-16 shadow-lg animate-on-scroll">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 text-center md:text-left">
        
        {/* Logo & About */}
        <div className="flex flex-col items-center md:items-start">
          <div className="flex flex-col-reverse items-center justify-center sm:flex-col md:flex-row md:justify-start space-x-2 mb-4">
            <img
              src={Logoimage}
              alt="NatureGrocery Logo"
              className="h-10 w-auto"
            />
            <h1 className="text-2xl font-bold text-white">
              Nature<span className="text-orange-400">Grocery</span>
            </h1>
          </div>
          <p className="text-sm text-gray-300 max-w-xs">
            Your one-stop online store for fresh groceries, handpicked for quality and delivered with care.
          </p>
        </div>

        {/* Useful Links */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2 text-gray-300">
            <li><a href="#about" className="hover:text-orange-400 transition">About Us</a></li>
            <li><a href="#contact" className="hover:text-orange-400 transition">Contact</a></li>
            <li><a href="#" className="hover:text-orange-400 transition">Privacy Policy</a></li>
            <li><a href="#" className="hover:text-orange-400 transition">Terms & Conditions</a></li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Follow Us</h3>
          <div className="flex justify-center md:justify-start space-x-4 text-lg">
            <a href="#" className="hover:text-orange-400 transition"><FaFacebookF /></a>
            <a href="#" className="hover:text-orange-400 transition"><FaInstagram /></a>
            <a href="#" className="hover:text-orange-400 transition"><FaTwitter /></a>
            <a href="#" className="hover:text-orange-400 transition"><FaLinkedinIn /></a>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-green-700 mt-10 pt-4 text-center text-sm text-gray-400 px-4">
        &copy; {new Date().getFullYear()} <span className="text-orange-400 font-semibold">NatureGrocery</span>. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
