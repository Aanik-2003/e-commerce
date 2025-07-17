"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound, useParams } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowLeft, Calendar, Tag } from "lucide-react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { getProductById } from "@/lib/api";

const BlogPost = () => {
  const params = useParams();
  const [post, setPost] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const slug = params.slug;

  useEffect(() => {
    if (!slug) {
      notFound();
      return;
    }

    async function fetchPost() {
      try {
        const res = await getProductById<any>(slug as any);
        setPost(res.product); // Note: `res.product`, not `res` directly
        console.log("Product:", res.product);
      } catch (error) {
        console.error("Error fetching product:", error);
        notFound();
      } finally {
        setIsLoading(false);
      }
    }

    fetchPost();
  }, [slug]);

  if (!slug || (!post && !isLoading)) {
    notFound();
  }

  if (isLoading || !post) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-black to-gray-800 text-justify pt-14 transition-all duration-500">
        <article className="max-w-4xl mx-auto px-4 py-24 animate-pulse bg-gray-900/70 rounded-lg shadow-xl">
          <div className="mb-8">
            <div className="h-8 w-48 bg-gray-700 rounded"></div>
          </div>
          <div className="mb-6">
            <div className="h-10 w-full bg-gray-700 rounded"></div>
          </div>
          <div className="mb-8">
            <div className="h-56 bg-gray-700 rounded-2xl"></div>
          </div>
          <div className="space-y-4">
            <div className="h-4 bg-gray-700 rounded w-5/6"></div>
            <div className="h-4 bg-gray-700 rounded w-4/6"></div>
            <div className="h-4 bg-gray-700 rounded w-3/6"></div>
          </div>
        </article>
      </div>
    );
  }

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-gray-800 text-justify transition-all duration-500">
      <article className="max-w-4xl mx-auto px-4 py-24 bg-gray-900/70 rounded-lg shadow-xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-gray-300 hover:text-red-500 transition-colors mb-8 group font-semibold"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to Blog
          </Link>

          <div className="flex flex-wrap gap-2 mb-6">
            {post.tags?.map((tag: any) => (
              <span
                key={tag._id}
                className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-red-600 text-white text-sm font-medium uppercase tracking-wide"
              >
                <Tag className="w-4 h-4" />
                {tag.value}
              </span>
            ))}
          </div>

          <h1 className="text-4xl md:text-4xl font-bold mb-2 text-white drop-shadow-lg">
            {post.title}
          </h1>
          <p className="text-2xl text-red-500 font-bold mb-4">
            Price: {post.price}
          </p>

          <div className="flex items-center justify-between mb-8 pb-8 border-b border-gray-700">
            <div className="flex items-center gap-4">
              <div className="relative w-12 h-12 rounded-full overflow-hidden ring-2 ring-red-600">
                <Image
                  src={post.author?.avatar}
                  alt={post.author?.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <p className="font-semibold text-white">{post.author?.name}</p>
                <p className="text-sm text-gray-400">{post.author?.role}</p>
              </div>
            </div>
            <div className="flex items-center gap-6">
              <span className="flex items-center gap-1 text-sm text-gray-400">
                <Calendar className="w-4 h-4" />
                {new Date(post.publishDate).toLocaleDateString()}
              </span>
            </div>
          </div>

          {post.images?.length > 1 ? (
            <Slider {...sliderSettings} className="mb-12">
              {post.images.map((img: any) => (
                <div
                  key={img._id}
                  className="relative aspect-[16/9] rounded-2xl overflow-hidden shadow-2xl"
                >
                  <Image
                    src={img.url}
                    alt={img.alt}
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
              ))}
            </Slider>
          ) : (
            <div className="relative aspect-[16/9] rounded-2xl overflow-hidden shadow-2xl mb-12">
              <Image
                src={post.images?.[0]?.url}
                alt={post.images?.[0]?.alt}
                fill
                className="object-cover"
                priority
              />
            </div>
          )}

          <div className="prose prose-lg max-w-none text-gray-300 prose-headings:text-white">
            {post.description
              ?.split("\n")
              .map((paragraph: string, index: number) => (
                <p key={index} className="mb-4 leading-relaxed">
                  {paragraph}
                </p>
              ))}
          </div>

          {post.specifications?.length > 0 && (
            <div className="mt-8 bg-gray-800 p-4 rounded-lg shadow-lg">
              <h2 className="text-2xl font-bold text-white mb-4 border-b border-red-500 pb-2">
                Specifications
              </h2>
              <table className="w-full text-gray-300 border-collapse border border-gray-700">
                <tbody>
                  {post.specifications.map((spec: any) => (
                    <tr key={spec._id} className="border border-gray-700">
                      <td className="p-2 font-semibold capitalize border-r border-gray-700">
                        {spec.key}
                      </td>
                      <td className="p-2">{spec.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {post.features?.length > 0 && (
            <div className="mt-8 bg-gray-800 p-4 rounded-lg shadow-lg">
              <h2 className="text-2xl font-bold text-white mb-4 border-b border-red-500 pb-2">
                Features
              </h2>
              <ul className="list-disc list-inside text-gray-300">
                {post.features.map((feature: any) => (
                  <li key={feature._id}>{feature.value}</li>
                ))}
              </ul>
            </div>
          )}
        </motion.div>
      </article>
    </div>
  );
};

export default BlogPost;
