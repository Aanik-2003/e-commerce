"use client";

import React from "react";
import Counter from "../components/Counter";
import BlogPage from "../components/BlogPage";

const page = () => {
  return (
    <div>
      <BlogPage />
    </div>
  );
};

export default page;

// "use client";

// import { useRouter } from "next/navigation";
// import { Button } from "@/components/ui/button";
// import { ShoppingBag, Star, Truck, Shield, Headphones } from "lucide-react";
// import Image from "next/image";

// export default function LandingPage() {
//   const router = useRouter();

//   const handleLogin = () => {
//     router.push("/login");
//   };

//   const handleSignUp = () => {
//     router.push("/sign-up");
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
//       {/* Header */}
//       <header className="container mx-auto px-4 py-6">
//         <nav className="flex items-center justify-between">
//           <div className="flex items-center space-x-2">
//             <ShoppingBag className="h-8 w-8 text-blue-600" />
//             <span className="text-2xl font-bold text-gray-900">ShopHub</span>
//           </div>
//           <div className="hidden md:flex items-center space-x-6">
//             <a
//               href="#"
//               className="text-gray-600 hover:text-gray-900 transition-colors"
//             >
//               Products
//             </a>
//             <a
//               href="#"
//               className="text-gray-600 hover:text-gray-900 transition-colors"
//             >
//               Categories
//             </a>
//             <a
//               href="#"
//               className="text-gray-600 hover:text-gray-900 transition-colors"
//             >
//               About
//             </a>
//             <a
//               href="#"
//               className="text-gray-600 hover:text-gray-900 transition-colors"
//             >
//               Contact
//             </a>
//           </div>
//         </nav>
//       </header>

//       {/* Hero Section */}
//       <main className="container mx-auto px-4 py-12 lg:py-20">
//         <div className="grid lg:grid-cols-2 gap-12 items-center">
//           {/* Left Content */}
//           <div className="text-center lg:text-left space-y-8">
//             <div className="space-y-4">
//               <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
//                 Discover Amazing
//                 <span className="text-blue-600 block">Products</span>
//                 <span className="text-gray-700">Every Day</span>
//               </h1>
//               <p className="text-xl text-gray-600 max-w-2xl mx-auto lg:mx-0">
//                 Shop the latest trends and discover incredible deals on
//                 thousands of products. Your perfect purchase is just a click
//                 away.
//               </p>
//             </div>

//             {/* CTA Buttons */}
//             <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
//               <Button
//                 onClick={handleSignUp}
//                 size="lg"
//                 className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
//               >
//                 Sign Up Free
//               </Button>
//               <Button
//                 onClick={handleLogin}
//                 variant="outline"
//                 size="lg"
//                 className="border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white px-8 py-4 text-lg font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 bg-transparent"
//               >
//                 Login
//               </Button>
//             </div>

//             {/* Trust Indicators */}
//             <div className="flex items-center justify-center lg:justify-start space-x-6 pt-8">
//               <div className="flex items-center space-x-1">
//                 <div className="flex">
//                   {[...Array(5)].map((_, i) => (
//                     <Star
//                       key={i}
//                       className="h-5 w-5 text-yellow-400 fill-current"
//                     />
//                   ))}
//                 </div>
//                 <span className="text-gray-600 ml-2">4.9/5 Rating</span>
//               </div>
//               <div className="text-gray-600">
//                 <span className="font-semibold">50K+</span> Happy Customers
//               </div>
//             </div>
//           </div>

//           {/* Right Content - Product Showcase */}
//           <div className="relative">
//             <div className="relative bg-gradient-to-br from-blue-100 to-purple-100 rounded-3xl p-8 shadow-2xl">
//               <Image
//                 src="/placeholder.svg?height=500&width=500"
//                 alt="Featured Products"
//                 width={500}
//                 height={500}
//                 className="w-full h-auto rounded-2xl shadow-lg"
//               />

//               {/* Floating Product Cards */}
//               <div className="absolute -top-4 -left-4 bg-white rounded-2xl p-4 shadow-xl">
//                 <div className="flex items-center space-x-3">
//                   <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
//                     <ShoppingBag className="h-6 w-6 text-blue-600" />
//                   </div>
//                   <div>
//                     <p className="font-semibold text-gray-900">
//                       Premium Quality
//                     </p>
//                     <p className="text-sm text-gray-600">Verified Products</p>
//                   </div>
//                 </div>
//               </div>

//               <div className="absolute -bottom-4 -right-4 bg-white rounded-2xl p-4 shadow-xl">
//                 <div className="flex items-center space-x-3">
//                   <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
//                     <Truck className="h-6 w-6 text-green-600" />
//                   </div>
//                   <div>
//                     <p className="font-semibold text-gray-900">Free Shipping</p>
//                     <p className="text-sm text-gray-600">On orders $50+</p>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Features Section */}
//         <div className="mt-20 lg:mt-32">
//           <div className="text-center mb-16">
//             <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
//               Why Choose ShopHub?
//             </h2>
//             <p className="text-xl text-gray-600 max-w-3xl mx-auto">
//               We're committed to providing you with the best shopping experience
//               possible
//             </p>
//           </div>

//           <div className="grid md:grid-cols-3 gap-8">
//             <div className="text-center p-6 rounded-2xl bg-white shadow-lg hover:shadow-xl transition-shadow duration-300">
//               <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
//                 <Shield className="h-8 w-8 text-blue-600" />
//               </div>
//               <h3 className="text-xl font-semibold text-gray-900 mb-2">
//                 Secure Shopping
//               </h3>
//               <p className="text-gray-600">
//                 Your data and payments are protected with bank-level security
//               </p>
//             </div>

//             <div className="text-center p-6 rounded-2xl bg-white shadow-lg hover:shadow-xl transition-shadow duration-300">
//               <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
//                 <Truck className="h-8 w-8 text-green-600" />
//               </div>
//               <h3 className="text-xl font-semibold text-gray-900 mb-2">
//                 Fast Delivery
//               </h3>
//               <p className="text-gray-600">
//                 Get your orders delivered quickly with our express shipping
//               </p>
//             </div>

//             <div className="text-center p-6 rounded-2xl bg-white shadow-lg hover:shadow-xl transition-shadow duration-300">
//               <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
//                 <Headphones className="h-8 w-8 text-purple-600" />
//               </div>
//               <h3 className="text-xl font-semibold text-gray-900 mb-2">
//                 24/7 Support
//               </h3>
//               <p className="text-gray-600">
//                 Our customer service team is always here to help you
//               </p>
//             </div>
//           </div>
//         </div>

//         {/* Final CTA Section */}
//         <div className="mt-20 lg:mt-32 text-center bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-12 text-white">
//           <h2 className="text-3xl lg:text-4xl font-bold mb-4">
//             Ready to Start Shopping?
//           </h2>
//           <p className="text-xl mb-8 opacity-90">
//             Join thousands of satisfied customers and discover amazing deals
//             today
//           </p>
//           <div className="flex flex-col sm:flex-row gap-4 justify-center">
//             <Button
//               onClick={handleSignUp}
//               size="lg"
//               className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 text-lg font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
//             >
//               Get Started Now
//             </Button>
//             <Button
//               onClick={handleLogin}
//               variant="outline"
//               size="lg"
//               className="border-2 border-white text-white hover:bg-white hover:text-blue-600 px-8 py-4 text-lg font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 bg-transparent"
//             >
//               Already a Member?
//             </Button>
//           </div>
//         </div>
//       </main>

//       {/* Footer */}
//       <footer className="bg-gray-900 text-white py-12 mt-20">
//         <div className="container mx-auto px-4">
//           <div className="flex flex-col md:flex-row items-center justify-between">
//             <div className="flex items-center space-x-2 mb-4 md:mb-0">
//               <ShoppingBag className="h-8 w-8 text-blue-400" />
//               <span className="text-2xl font-bold">ShopHub</span>
//             </div>
//             <div className="flex space-x-6">
//               <a
//                 href="#"
//                 className="text-gray-400 hover:text-white transition-colors"
//               >
//                 Privacy
//               </a>
//               <a
//                 href="#"
//                 className="text-gray-400 hover:text-white transition-colors"
//               >
//                 Terms
//               </a>
//               <a
//                 href="#"
//                 className="text-gray-400 hover:text-white transition-colors"
//               >
//                 Support
//               </a>
//             </div>
//           </div>
//           <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
//             <p>&copy; 2024 ShopHub. All rights reserved.</p>
//           </div>
//         </div>
//       </footer>
//     </div>
//   );
// }
