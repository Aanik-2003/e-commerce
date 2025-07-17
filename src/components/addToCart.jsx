
// "use client";
// import React from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { increment } from "../redux/cartSlice";
// import { ShoppingCart } from 'lucide-react';

// const addToCart = ({ postId }) => {
//     const dispatch = useDispatch();
//     const count = useSelector((state) => state.cart.items[postId] || 0);

//     return (
//         <div className="flex gap-7 text-white">
//             <button
//                 onClick={() => dispatch(increment(postId))}
//                 className="flex items-center bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition-colors"
//             >
//                 <ShoppingCart className="w-5 h-5 mr-2" />
//                 Add to cart
//             </button>
//         </div>
//     );
// };

// export default addToCart;

"use client";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { increment } from "../redux/cartSlice";
import { ShoppingCart } from 'lucide-react';

const AddToCart = ({ postId }) => {
  const dispatch = useDispatch();
  const count = useSelector((state) => state.cart.items[postId] || 0);
  const [showPopup, setShowPopup] = useState(false); // State to control the popup visibility

  const handleAddToCart = () => {
    dispatch(increment(postId));  // Dispatch the action to add the item to the cart

    // Show the pop-up
    setShowPopup(true);

    // Automatically hide the pop-up after 3 seconds
    setTimeout(() => {
      setShowPopup(false);
    }, 3000);
  };

  return (
    <div className="flex gap-7 text-white">
      {/* Add to Cart button */}
      <button
        onClick={handleAddToCart}
        className="flex items-center bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition-colors"
      >
        <ShoppingCart className="w-5 h-5 mr-2" />
        Add to cart
      </button>

      {/* Pop-up message with animation */}
      {showPopup && (
        <div
          className="fixed top-5 left-1/2 transform -translate-x-1/2 bg-green-500 text-white py-2 px-4 rounded-lg shadow-md animate-popUp"
          style={{ zIndex: 1000 }}
        >
          Item successfully added to cart!
        </div>
      )}
    </div>
  );
};

export default AddToCart;
