import React, { useState, useContext, useEffect, useRef } from 'react';
import {
  MdShoppingCart,
  MdMenu,
  MdClose,
  MdDelete,
  MdAccountCircle,
} from 'react-icons/md';
import { IoMail } from 'react-icons/io5';
import { CgProfile } from 'react-icons/cg';
import { CartContext } from './CartContext';
import Toast from './Toast';
import Icon from '../assets/icon.png';

function Navbar({ openAuthForm, user, onLogout, onShowOrders }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const { cartItems, removeFromCart, changeQuantity, getTotalPrice } = useContext(CartContext);
  const [showToast, setShowToast] = useState(false);
  const [toastMsg, setToastMsg] = useState('');
  const cartRef = useRef();
  const profileRef = useRef();

  useEffect(() => {
    function handleClickOutside(e) {
      if (cartRef.current && !cartRef.current.contains(e.target)) {
        setShowCart(false);
      }
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setShowProfile(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleBuyNow = async (item) => {
    if (!user || !user._id) {
      setToastMsg('❌ Please login to buy');
      setShowToast(true);
      return;
    }

    const payload = {
      items: [{ name: item.name, price: item.price, img: item.img, quantity: 1 }],
      userId: user._id,
      total: item.price,
      method: 'COD',
    };

    try {
      const res = await fetch('http://localhost:5000/api/orders/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      setToastMsg(res.ok ? '✅ Order placed successfully!' : data.message || '❌ Failed to place order');
    } catch (err) {
      setToastMsg('❌ Server error while placing order');
    }

    setShowToast(true);
    setTimeout(() => setShowToast(false), 2000);
  };

  return (
    <nav className="bg-gray-200 w-full h-20 shadow-lg sticky top-0 z-50">
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-10 h-20 flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <img src={Icon} alt="Logo" className="h-8 sm:h-10" />
          <h2 className="text-green-400 font-bold text-xl sm:text-2xl">
            Nature<span className="text-orange-400">Grocery</span>
          </h2>
        </div>

        {/* Desktop Navigation */}
        <ul className="hidden md:flex items-center gap-6 text-black font-semibold">
          <li><a href="#home" className="hover:text-orange-400">Home</a></li>
          <li><a href="#menu" className="hover:text-orange-400">Menu</a></li>
          <li><a href="#about" className="hover:text-orange-400">About</a></li>
          <li><a href="#contact" className="hover:text-orange-400">Contact</a></li>

          {user ? (
            <li className="relative" ref={profileRef}>
              <button onClick={() => setShowProfile(!showProfile)} className="hover:text-orange-400">
                <MdAccountCircle className="text-3xl" />
              </button>
              <div className={`absolute right-0 mt-2 w-80 bg-white p-4 shadow-xl border rounded z-50 text-sm transform transition-all duration-300 origin-top
              ${showProfile ? 'scale-y-100 opacity-100' : 'scale-y-0 opacity-0 pointer-events-none'}`}>
                <p className="flex items-center mb-2 text-gray-800 font-semibold">
                  <CgProfile className="text-orange-400 mr-2" /> {user.name}
                </p>
                <p className="flex items-center mb-4 text-gray-600">
                  <IoMail className="text-orange-400 mr-2" /> {user.email}
                </p>
                <button onClick={onShowOrders} className="w-full mb-2 bg-green-500 text-white py-1 rounded hover:bg-green-600">View Orders</button>
                <button onClick={onLogout} className="w-full bg-red-500 text-white py-1 rounded hover:bg-red-600">Logout</button>
              </div>
            </li>
          ) : (
            <li><button onClick={openAuthForm} className="hover:text-orange-400">Login/Signup</button></li>
          )}
        </ul>

        {/* Cart Icon + Dropdown */}
        <div className="relative" ref={cartRef}>
          <button onClick={() => setShowCart(!showCart)} className="text-black flex items-center gap-1">
            <MdShoppingCart className="text-3xl hover:text-orange-400" />
            <span className="font-bold">({cartItems.length})</span>
          </button>

          <div className={`absolute mt-3 bg-white rounded shadow-xl z-50 p-2 transform transition-all duration-300 ease-in-out origin-top
            ${showCart ? 'scale-y-100 opacity-100' : 'scale-y-0 opacity-0 pointer-events-none'}
            w-[60vw] sm:w-[70vw] md:w-[400px] -translate-x-1/2 md:left-auto md:translate-x-0 md:right-0 left-1/2`}
          >
            {cartItems.length === 0 ? (
              <p className="text-center text-gray-500">No items in cart</p>
            ) : (
              <>
                <div className="max-h-80 overflow-y-auto space-y-4">
                  {cartItems.map((item) => (
                    <div key={item.name} className="flex gap-3 items-center border-b pb-3">
                      <img src={item.img} alt={item.name} className="w-14 h-14 rounded border object-cover" />
                      <div className="flex-1">
                        <p className="font-semibold">{item.name}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <input
                            type="number"
                            min={1}
                            value={item.quantity}
                            className="w-14 border px-2 py-1 rounded text-sm"
                            onChange={(e) => changeQuantity(item.name, parseInt(e.target.value))}
                          />
                          <span className="text-sm">₹{item.price * item.quantity}</span>
                        </div>
                      </div>
                      <div className="flex flex-col items-end gap-1">
                        <button onClick={() => removeFromCart(item.name)} className="text-red-500 hover:scale-110">
                          <MdDelete size={20} />
                        </button>
                        <button onClick={() => handleBuyNow(item)} className="bg-blue-500 hover:bg-blue-600 text-white text-xs px-3 py-1 rounded">
                          Buy
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-4 text-right font-semibold text-lg">
                  Total: ₹{getTotalPrice()}
                </div>
              </>
            )}
          </div>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden">
          <button onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <MdClose className="text-3xl text-black" /> : <MdMenu className="text-3xl text-black" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu List */}
      {menuOpen && (
        <ul className="md:hidden flex flex-col items-center gap-4 w-full py-4 bg-black text-white font-semibold text-lg absolute top-20 left-0 z-40">
          <li><a href="#home" className="hover:text-orange-400">Home</a></li>
          <li><a href="#menu" className="hover:text-orange-400">Menu</a></li>
          <li><a href="#about" className="hover:text-orange-400">About</a></li>
          <li><a href="#contact" className="hover:text-orange-400">Contact</a></li>
          {user ? (
            <>
              <li className="text-green-300">Hi, {user.name}</li>
              <li className="text-sm text-gray-400">{user.email}</li>
              <li><button onClick={onShowOrders} className="hover:text-blue-400">View Orders</button></li>
              <li><button onClick={onLogout} className="hover:text-red-400">Logout</button></li>
            </>
          ) : (
            <li><button onClick={openAuthForm} className="hover:text-orange-400">Login/Signup</button></li>
          )}
        </ul>
      )}

      <Toast message={toastMsg} show={showToast} />
    </nav>
  );
}

export default Navbar;
