"use client";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ShoppingCart } from "lucide-react";
import { useSelector } from "react-redux";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Cookies from "js-cookie";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const pathname = usePathname();

  const cartCount = useSelector((state) =>
    Object.values(state.cart.items).reduce(
      (total, quantity) => total + quantity,
      0
    )
  );

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const activeClass = "text-red-500";
  const inactiveClass = "hover:text-red-500";
  const router = useRouter();
  const token = Cookies.get("token");

  const handleLogin = () => {
    router.push("/login");
  };
  const handleLogout = () => {
    Cookies.remove("token");
    localStorage.removeItem("user");

    router.push("/login");
  };

  return (
    <header className="fixed top-0 left-0 right-0 bg-gray-900 text-white shadow z-50">
      <div className="container mx-auto px-4 py-6 flex items-center justify-between">
        <div className="text-2xl font-bold">
          <Link href="/">
            <Image src="/logo.png" alt="Logo" width={100} height={40} />
          </Link>
        </div>
        <nav>
          <ul className="flex space-x-6 items-center">
            <li>
              <Link
                href="/"
                className={`transition-colors ${
                  pathname === "/" ? activeClass : inactiveClass
                }`}
              >
                Home
              </Link>
            </li>

            {/* <li className="relative">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className={`transition-colors ${
                  pathname.startsWith("/categories")
                    ? activeClass
                    : inactiveClass
                }`}
              >
                Categories
              </button>
              <ul
                ref={dropdownRef}
                className={`absolute left-0 mt-2 w-48 bg-gray-800 rounded shadow-lg transition-opacity duration-200 ${
                  isOpen ? "opacity-100 visible" : "opacity-0 invisible"
                }`}
              >
                <li>
                  <Link
                    href="/categories/mountain-bikes"
                    className="block px-4 py-2 hover:bg-red-600"
                  >
                    Mountain Bikes
                  </Link>
                </li>
                <li>
                  <Link
                    href="/categories/electric-bikes"
                    className="block px-4 py-2 hover:bg-red-600"
                  >
                    Electric Bikes
                  </Link>
                </li>
                <li>
                  <Link
                    href="/categories/cruiser-bikes"
                    className="block px-4 py-2 hover:bg-red-600"
                  >
                    Cruiser Bikes
                  </Link>
                </li>
                <li>
                  <Link
                    href="/categories/hybrid-bikes"
                    className="block px-4 py-2 hover:bg-red-600"
                  >
                    Hybrid Bikes
                  </Link>
                </li>
              </ul>
            </li> */}
            <li className="relative">
              <Link href="/cart" className="relative">
                <ShoppingCart className="w-7 h-7 text-white hover:text-red-500 transition-colors" />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
                    {cartCount}
                  </span>
                )}
              </Link>
            </li>
            {token ? (
              <div className="flex items-center space-x-3">
                <Button
                  className="border border-b-gray-500"
                  size="sm"
                  onClick={handleLogout}
                >
                  SignOut
                </Button>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Button
                  className="border border-b-gray-500"
                  size="sm"
                  onClick={handleLogin}
                >
                  SignIn
                </Button>
              </div>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
}
