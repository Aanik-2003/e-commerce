"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { motion } from "framer-motion";
import { getAllBlogPosts } from "@/lib/blog";
import { ArrowLeft, Tag } from "lucide-react";
import Counter from "@/components/Counter";

const CategoryPage = ({ params }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 6;

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  const category = params.category;

  if (!category) {
    notFound();
  }

  const formattedCategory = category.replace(/-/g, " ").toLowerCase();
  const filteredPosts = getAllBlogPosts.filter(({ post }) =>
    post.tags.some((tag) => tag.toLowerCase() === formattedCategory)
  );

  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-gray-800 text-justify pt-14">
      <div className="max-w-7xl mx-auto px-4 py-24">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-gray-300 hover:text-red-500 transition-colors mb-8 group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Back to Blog
        </Link>
        <h1 className="text-4xl md:text-5xl font-bold mb-8 text-white">
          {formattedCategory.charAt(0).toUpperCase() + formattedCategory.slice(1)} Bikes
        </h1>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {currentPosts.map(({ slug, post }, index) => (
            <motion.div
              key={slug}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="group block bg-gray-900 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300">
                
                <Link href={`/${slug}`}>
                  <div className="relative h-56 overflow-hidden cursor-pointer">
                    <Image
                      src={post.image[0]}
                      alt={post.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                  </div>
                </Link>

                <div className="p-6">
                  
                  <div className="flex flex-wrap gap-2 mb-3">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-red-600 text-white text-xs font-bold"
                      >
                        <Tag className="w-3 h-3" />
                        {tag}
                      </span>
                    ))}
                  </div>

                  
                  <Link href={`/${slug}`}>
                    <h2 className="text-xl font-bold mb-3 group-hover:text-red-400 transition-colors text-white">
                      {post.title}
                    </h2>
                  </Link>

                  <p className="text-gray-300 text-sm mb-4 line-clamp-2">{post.excerpt}</p>

                  
                  <Counter postId={slug} />
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
      </div>
    </div>
  );
};

export default CategoryPage;
