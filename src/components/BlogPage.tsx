"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { motion } from "framer-motion";
import { Search, Tag } from "lucide-react";
import AddToCart from "./addToCart";
import { getProducts } from "@/lib/api";

export default function BlogPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 6;
  const router = useRouter();

  useEffect(() => {
    async function fetchProducts() {
      try {
        const data = await getProducts<{ products: any[] }>("/products");
        setProducts(data.products);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchProducts();
  }, []);

  const filteredProducts = products.filter((product) => {
    const titleMatch = product.title
      ?.toLowerCase()
      .includes(searchQuery.toLowerCase());
    const descMatch = product.description
      ?.toLowerCase()
      .includes(searchQuery.toLowerCase());
    const tagsMatch = product.tags?.some((tag: any) => {
      const value = typeof tag === "string" ? tag : tag?.value;
      return value?.toLowerCase().includes(searchQuery.toLowerCase());
    });

    return titleMatch || descMatch || tagsMatch;
  });

  const totalPages = Math.ceil(filteredProducts.length / postsPerPage);
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredProducts.slice(
    indexOfFirstPost,
    indexOfLastPost
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-gray-800">
      <div className="max-w-7xl mx-auto px-4 py-20 mt-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-white">
            Ride Fast, Ride Bold
          </h1>
          <p className="text-gray-300 max-w-2xl mx-auto">
            The latest trends, news, and insights from the world of motorcycles
            and bikes.
          </p>
        </motion.div>

        <div className="relative max-w-2xl mx-auto mb-12">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 w-5 h-5" />
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 rounded-full border border-gray-700 bg-gray-900 text-gray-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
          />
        </div>

        {isLoading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="bg-gray-700 h-56 rounded-2xl mb-4"></div>
                <div className="space-y-2">
                  <div className="h-4 bg-gray-700 rounded w-3/4"></div>
                  <div className="h-4 bg-gray-700 rounded w-full"></div>
                  <div className="h-4 bg-gray-700 rounded w-5/6"></div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {currentPosts.map((product, index) => (
                <motion.div
                  key={product._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div
                    onClick={() => router.push(`/user-dash/${product._id}`)}
                    className="group block bg-gray-900 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer"
                  >
                    <div className="relative h-56 perspective-1000">
                      <div className="flip-container relative h-full">
                        <Image
                          src={product.images?.[0]?.url || "/placeholder.jpg"}
                          alt={product.images?.[0]?.alt || product.title}
                          fill
                          className="flip-front object-cover"
                        />
                        {product.images?.[1]?.url && (
                          <Image
                            src={product.images[1].url}
                            alt={product.images[1].alt || product.title}
                            fill
                            className="flip-back object-cover"
                          />
                        )}
                      </div>
                    </div>

                    <div className="p-6">
                      <div className="flex flex-wrap gap-2 mb-3">
                        {product.tags?.map((tag: any) => {
                          const key = tag._id || tag.value || tag;
                          const label =
                            typeof tag === "string" ? tag : tag.value;
                          return (
                            <span
                              key={key}
                              className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-red-600 text-white text-xs font-bold"
                            >
                              <Tag className="w-3 h-3" />
                              {label}
                            </span>
                          );
                        })}
                      </div>

                      <h2 className="text-xl font-bold mb-3 group-hover:text-red-400 transition-colors text-white">
                        {product.title}
                      </h2>

                      <p className="text-gray-300 text-sm mb-4 line-clamp-2">
                        {product.description}
                      </p>

                      <div className="flex items-center justify-between space-x-4">
                        <span className="text-lg font-semibold text-white">
                          $
                          {typeof product.price === "object"
                            ? product.price?.value
                            : product.price}
                        </span>
                        <div onClick={(e) => e.stopPropagation()}>
                          <AddToCart postId={product._id} />
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="flex justify-center mt-10 space-x-4 items-center">
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(currentPage - 1)}
                className="px-4 py-2 bg-gray-700 text-white rounded-lg disabled:opacity-50"
              >
                Previous
              </button>
              <span className="text-white">
                Page {currentPage} of {totalPages}
              </span>
              <button
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage(currentPage + 1)}
                className="px-4 py-2 bg-gray-700 text-white rounded-lg disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
