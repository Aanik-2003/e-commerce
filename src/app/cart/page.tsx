"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import { X, ShoppingBag, CheckCircle } from "lucide-react";
import { reset, resetAll } from "@/redux/cartSlice";
import { getProducts } from "@/lib/api";
import Counter from "@/components/Counter";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

interface Product {
  _id: string;
  title: string;
  price: number;
  images: { url: string; alt: string; _id: string }[];
}

export default function CartPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();
  const cartItems = useSelector((state: any) => state.cart.items);
  const router = useRouter();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await getProducts<{ products: Product[] }>("/products");
        setProducts(res.products);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const cartProducts = products.filter((product) => cartItems[product._id] > 0);
  const totalItems = Object.values(cartItems).reduce(
    (sum, quantity) => (sum as any) + (quantity || 0),
    0
  );
  const totalPrice = cartProducts.reduce((sum, product) => {
    const quantity = cartItems[product._id] || 0;
    return sum + quantity * (product.price || 0);
  }, 0);
  const formattedTotalPrice = totalPrice.toFixed(2);

  const handleCheckout = () => {
    const token = Cookies.get("token");

    if (!token) {
      router.push("/login");
      return;
    }

    setShowModal(true); // show payment modal
  };

  // 🔁 Redirect to Khalti payment page directly
  const handleKhaltiPayment = () => {
    window.location.href =
      "https://test-pay.khalti.com/wallet?pidx=aVnRbqnNatE4Gn8EJLiqQS";
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        Loading cart...
      </div>
    );
  }

  if (totalItems === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-black to-gray-800 pt-24">
        <div className="max-w-4xl mx-auto px-4 py-16 text-center">
          <ShoppingBag className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-white mb-2">
            Your cart is empty
          </h2>
          <p className="text-gray-400">
            Start adding some awesome products to your cart!
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-gray-800 pt-24">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-white mb-8">Shopping Cart</h1>

        <div className="space-y-4">
          {cartProducts.map((product) => (
            <motion.div
              key={product._id}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-gray-900 rounded-lg p-4 flex items-center gap-4"
            >
              <div className="relative w-24 h-24 flex-shrink-0">
                <Image
                  src={product.images?.[0]?.url || "/placeholder.jpg"}
                  alt={product.images?.[0]?.alt || product.title}
                  fill
                  className="object-cover rounded-lg"
                />
              </div>
              <div className="flex-grow">
                <h3 className="text-xl font-semibold text-white">
                  {product.title}
                </h3>
                <div className="flex items-center space-x-4 mt-3">
                  <p className="text-gray-400">
                    Price:{" "}
                    {(cartItems[product._id] * (product.price || 0)).toFixed(2)}
                  </p>
                  <Counter postId={product._id} />
                </div>
              </div>
              <button
                onClick={() => dispatch(reset(product._id))}
                className="p-2 hover:bg-gray-800 rounded-full transition-colors"
              >
                <X className="w-5 h-5 text-gray-400" />
              </button>
            </motion.div>
          ))}
        </div>

        <div className="mt-8 flex justify-between items-center">
          <div className="text-white">
            <p className="text-lg">Total Items: {totalItems as any}</p>
            <p className="text-lg">Total Price: Rs. {formattedTotalPrice}</p>
          </div>
          <button
            onClick={handleCheckout}
            className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            Checkout
          </button>
        </div>

        {/* Payment Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg w-80">
              <h2 className="text-xl font-semibold mb-4">
                Select Payment Method
              </h2>
              <p className="mb-2">Total: Rs. {formattedTotalPrice}</p>

              <button
                onClick={handleKhaltiPayment}
                className="w-full py-2 mt-2 bg-purple-600 text-white rounded hover:bg-purple-700"
              >
                Pay with Khalti
              </button>

              <button
                onClick={() => setShowModal(false)}
                className="w-full py-2 mt-4 bg-gray-200 rounded hover:bg-gray-300"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* Success Toast */}
        <AnimatePresence>
          {showSuccess && (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              className="fixed bottom-8 right-8 bg-green-600 text-white px-6 py-4 rounded-lg shadow-lg flex items-center gap-2"
            >
              <CheckCircle className="w-5 h-5" />
              Order placed successfully!
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
