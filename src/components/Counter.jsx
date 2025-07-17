
// "use client";
// import React from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { increment, decrement } from "../redux/cartSlice";

// const Counter = ({ postId }) => {
//   const dispatch = useDispatch();
//   const count = useSelector((state) => state.cart.items[postId] || 0);

//   return (
//     <div className="flex gap-7 text-white">
//       <button 
//         onClick={() => dispatch(decrement(postId))}
//         className="hover:text-red-500 transition-colors"
//       >
//         -
//       </button>
//       <span>{count}</span>
//       <button 
//         onClick={() => dispatch(increment(postId))}
//         className="hover:text-red-500 transition-colors"
//       >
//         +
//       </button>
//     </div>
//   );
// };

// export default Counter;

"use client";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { increment, decrement } from "../redux/cartSlice";

const Counter = ({ postId }) => {
  const dispatch = useDispatch();
  const count = useSelector((state) => state.cart.items[postId] || 0);

  return (
    <div className="flex items-center gap-4 text-white">
      {/* Decrement Button */}
      <button
        onClick={() => dispatch(decrement(postId))}
        className="w-8 h-8 bg-green-500 text-white text-lg font-semibold rounded-full hover:bg-green-600 transition-all duration-200 flex items-center justify-center"
      >
        -
      </button>

      {/* Count */}
      <span className="text-xl font-medium">{count}</span>

      {/* Increment Button */}
      <button
        onClick={() => dispatch(increment(postId))}
        className="w-8 h-8 bg-green-500 text-white text-lg font-semibold rounded-full hover:bg-green-600 transition-all duration-200 flex items-center justify-center"
      >
        +
      </button>
    </div>
  );
};

export default Counter;
