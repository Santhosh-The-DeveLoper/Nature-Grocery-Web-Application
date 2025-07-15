import React, { useState, useContext } from 'react';
import IMAGES from '../assets/index.js';
import MeatFish from '../assets/MeatFish/meatfish-icon.jpg';
import { CartContext } from './CartContext';
import Toast from './Toast';
import useFlipZoomAnimation from '../hooks/useFlipZoomAnimation'; 
import useScrollAnimate from '../hooks/useScrollAnimation';


const Menu = () => {
  const [selectedCategory, setSelectedCategory] = useState('Vegetables');
  const [showToast, setShowToast] = useState(false);
  const [toastMsg, setToastMsg] = useState('');
  const { addToCart } = useContext(CartContext);
  const user = JSON.parse(localStorage.getItem('user'));
  useScrollAnimate('.flip-bounce', '0px', selectedCategory);



  useFlipZoomAnimation(); // 🧠 hook usage

  const handleAddToCart = (item) => {
    const success = addToCart(item);
    setToastMsg(success ? '✅ Item added to cart' : '❌ Limit: Max 5 items in cart');
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2000);
  };

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
      method: 'COD'
    };

    try {
      const res = await fetch('https://nature-grocery-web-application.onrender.com/api/orders/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const data = await res.json();
      setToastMsg(res.ok ? '✅ Order placed successfully!' : data.message || '❌ Failed to place order');
    } catch (err) {
      setToastMsg('❌ Server error while placing order');
    }

    setShowToast(true);
    setTimeout(() => setShowToast(false), 2000);
  };

  const categories = {
    Vegetables: [
       { name: 'Tomato', price: 15, img: IMAGES.veg1 },
       { name: 'Potato', price: 18, img: IMAGES.veg2 },
       { name: 'Onion', price: 13, img: IMAGES.veg3 },
       { name: 'Carrot', price: 17, img: IMAGES.veg4 },
       { name: 'Cabbage', price: 19, img: IMAGES.veg5 },
       { name: 'Cauliflower', price: 20, img: IMAGES.veg6 },
       { name: 'Bringal', price: 10, img: IMAGES.veg7 },
       { name: 'Bitter Gourd', price: 15, img: IMAGES.veg8 },
       { name: 'Bottle Gourd', price: 16, img: IMAGES.veg9 },
       { name: 'Ridge Gourd', price: 22, img: IMAGES.veg10 },
       { name: 'Snake Gourd', price: 24, img: IMAGES.veg11 },
       { name: 'Drum Stick', price: 17, img: IMAGES.veg12 },
       { name: 'Lady finger', price: 12, img: IMAGES.veg13 },
       { name: 'Beet root', price: 25, img: IMAGES.veg14 },
       { name: 'Pumpkin', price: 7, img: IMAGES.veg15 },
       { name: 'Sweet corn', price: 19, img: IMAGES.veg16 },
       { name: 'Green peas', price: 14, img: IMAGES.veg17 },
       { name: 'Raw banana', price: 6, img: IMAGES.veg18 },
       { name: 'Raw papaya', price: 23, img: IMAGES.veg19 },
       { name: 'Mint leaves', price: 3, img: IMAGES.veg20 },
     ],
     Fruits: [
       { name: 'Apple', price: 20, img: IMAGES.fruit1 },
       { name: 'Banana', price: 10, img: IMAGES.fruit2 },
       { name: 'Orange', price: 18, img: IMAGES.fruit3 },
       { name: 'Mango', price: 34, img: IMAGES.fruit4 },
       { name: 'Grapes', price: 23, img: IMAGES.fruit5 },
       { name: 'Pineapple', price: 45, img: IMAGES.fruit6 },
       { name: 'Papaya', price: 23, img: IMAGES.fruit7 },
       { name: 'Strawberry', price: 31, img: IMAGES.fruit8 },
       { name: 'Blueberry', price: 32, img: IMAGES.fruit9 },
       { name: 'Watermelon', price: 28, img: IMAGES.fruit10 },
       { name: 'Pomegranate', price: 19, img: IMAGES.fruit11 },
       { name: 'Kiwi', price: 20, img: IMAGES.fruit12 },
       { name: 'Cherry', price: 24, img: IMAGES.fruit13 },
       { name: 'Peach', price: 45, img: IMAGES.fruit14 },
       { name: 'Pear', price: 65, img: IMAGES.fruit15 },
       { name: 'Guava', price: 45, img: IMAGES.fruit16 },
       { name: 'Lychee', price: 54, img: IMAGES.fruit17 },
       { name: 'Plum', price: 23, img: IMAGES.fruit18 },
       { name: 'Fig', price: 45, img: IMAGES.fruit19 },
       { name: 'Coconut', price: 22, img: IMAGES.fruit20 },
     ],
     Snacks: [
       { name: 'Yippe', price: 10, img: IMAGES.snack1 },
       { name: 'Good Day', price: 5, img: IMAGES.snack2 },
       { name: 'Maggi Noodles', price: 15, img: IMAGES.snack3 },
       { name: 'Oot Cookies', price: 299, img: IMAGES.snack4 },
       { name: 'Pop Corn', price: 85, img: IMAGES.snack5 },
       { name: 'Pizza Minis', price: 165, img: IMAGES.snack6 },
       { name: 'Diary Mlik Silk Chocolate', price: 105, img: IMAGES.snack7 },
       { name: 'Potato Chips', price: 100, img: IMAGES.snack8 },
       { name: 'Pringles', price: 308, img: IMAGES.snack9 },
       { name: 'French Fries', price: 89, img: IMAGES.snack10 },
       { name: 'ACT ll Golden Sizzle Pop Corn', price: 10, img: IMAGES.snack11 },
       { name: 'GreenFinity Mixed Dry Fruits', price: 274, img: IMAGES.snack12 },
       { name: 'BeetRoot Chips', price: 238, img: IMAGES.snack13 },
       { name: 'Kurkure cheese puffcorn', price: 10, img: IMAGES.snack14 },
       { name: 'Pik n pop dark chocolate', price: 14, img: IMAGES.snack15 },
       { name: 'Bingo! tedhe medhe', price: 13, img: IMAGES.snack16 },
       { name: 'Ritebite max protein bar', price: 427, img: IMAGES.snack17 },
       { name: 'Britannia treat jim jam biscuits', price: 36, img: IMAGES.snack18 },
       { name: 'Dukes waffy chocolate flavoured wafer roll jar', price: 90, img: IMAGES.snack19 },
     ],
     DairyProducts: [
       { name: 'Milk', price: 60, img: IMAGES.dairy1 },
       { name: 'Curd', price: 30, img: IMAGES.dairy2 },
       { name: 'Paneer', price: 80, img: IMAGES.dairy3 },
       { name: 'Butter', price: 55, img: IMAGES.dairy4 },
       { name: 'Ghee', price: 150, img: IMAGES.dairy5 },
       { name: 'Cheese Slices', price: 120, img: IMAGES.dairy6 },
       { name: 'Cheese Blocks', price: 140, img: IMAGES.dairy7 },
       { name: 'Processed Cheese Cubes', price: 110, img: IMAGES.dairy8 },
       { name: 'Butter Milk', price: 20, img: IMAGES.dairy9 },
       { name: 'Lassi', price: 25, img: IMAGES.dairy10 },
       { name: 'Flavoured Milk', price: 35, img: IMAGES.dairy11 },
       { name: 'Cream', price: 70, img: IMAGES.dairy12 },
       { name: 'Milk Powder', price: 220, img: IMAGES.dairy13 },
       { name: 'Condensed Milk', price: 140, img: IMAGES.dairy14 },
       { name: 'Evaporated Milk', price: 100, img: IMAGES.dairy15 },
       { name: 'Malai', price: 80, img: IMAGES.dairy16 },
       { name: 'Khoa', price: 100, img: IMAGES.dairy17 },
       { name: 'Milk Shakes', price: 30, img: IMAGES.dairy18 },
       { name: 'Probiotic Drinks', price: 70, img: IMAGES.dairy19 },
       { name: 'Ice Cream', price: 30, img: IMAGES.dairy20 },
     ],
     MeatFish: [
       { name: 'Chicken (Curry Cut, Bone-In)', price: 160, img: IMAGES.meat1 },
       { name: 'Chicken Breast (Boneless)', price: 210, img: IMAGES.meat2 },
       { name: 'Chicken Thigh (Boneless)', price: 200, img: IMAGES.meat3 },
       { name: 'Chicken Drumsticks', price: 170, img: IMAGES.meat4 },
       { name: 'Chicken Mince (Keema)', price: 220, img: IMAGES.meat5 },
       { name: 'Mutton Curry Cut (Bone-In)', price: 400, img: IMAGES.meat6 },
       { name: 'Fresh fish & Sea Food', price: 500, img: IMAGES.meat7 },
     ],
  };

  const renderItems = (items) => (
    <div className="p-6">
      <h1 className="text-center text-3xl font-bold mb-6">{selectedCategory}</h1>
      <div className="flex flex-wrap justify-center gap-6">
        {items.map((item, index) => (
          <div
            key={item.name}
            className="flip-bounce flex flex-col items-center border p-4 font-bold rounded-md w-full max-w-xs shadow-md"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <img src={item.img} alt={item.name} className="rounded-md bg-orange-300 h-40 w-full object-contain" />
            <p className="text-green-600 mt-2">In Stock</p>
            <p className="text-lg">{item.name}</p>
            <p className="text-orange-600">₹{item.price}</p>
            <div className="flex gap-2 mt-2">
              <button
                className="border px-4 py-2 rounded-md bg-green-400 hover:bg-orange-400 text-white"
                onClick={() => handleAddToCart(item)}
              >
                Add To Cart
              </button>
              <button
                className="border px-4 py-2 rounded-md bg-blue-500 hover:bg-blue-600 text-white"
                onClick={() => handleBuyNow(item)}
              >
                Buy
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <section id="menu">
      <div className="flex justify-around items-start w-full relative m-2 flex-wrap gap-6">
        {['Vegetables', 'Fruits', 'Snacks', 'DairyProducts', 'MeatFish'].map((category) => (
          <div key={category} className="flex flex-col justify-center items-center w-60 cursor-pointer">
            <img
              src={{ Vegetables: IMAGES.vegicon, Fruits: IMAGES.fruiticon, Snacks: IMAGES.snacksicon, DairyProducts: IMAGES.dairyicon, MeatFish }[category]}
              alt={category}
              className="rounded-full h-24 w-24 sm:h-32 sm:w-32 md:h-40 md:w-40"
              onClick={() => setSelectedCategory(category)}
            />
            <h3
              onClick={() => setSelectedCategory(category)}
              className="text-black text-lg sm:text-xl md:text-2xl font-bold text-center mt-2"
            >
              {category.replace(/([A-Z])/g, ' $1').trim()}
            </h3>
          </div>
        ))}
      </div>

      {renderItems(categories[selectedCategory])}
      <Toast message={toastMsg} show={showToast} />
    </section>
  );
};

export default Menu;
