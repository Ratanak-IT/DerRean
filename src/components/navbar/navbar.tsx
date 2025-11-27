// components/navbar/navbar.tsx
"use client";

import { useState, useEffect } from "react";
import { Menu, X, Moon, Sun, BookOpen, Heart, User, LogOut } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useUser } from "@/context/UserContext";
import { useWishlist } from "@/context/WishlistContext"; // ← Import

export default function Navbar() {
  const { isLoggedIn, setIsLoggedIn } = useUser();
  const { wishlistCount } = useWishlist(); // ← Now reactive!
  const pathname = usePathname();
  const router = useRouter();

  const [mounted, setMounted] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    queueMicrotask(() => {
      setMounted(true);
      setIsDark(localStorage.getItem("theme") === "dark");
    });
  }, []);

  useEffect(() => {
    if (!mounted) return;
    if (isDark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDark, mounted]);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "/", name: "ទំព័រដើម" },
    { href: "/course", name: "ថ្នាក់សិក្សា" },
    { href: "/about", name: "អំពីយើង" },
    { href: "/contact", name: "ទាក់ទង" },
    ...(isLoggedIn ? [{ href: "/quiz", name: "លំហាត់" }] : []),
  ];

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    router.push("/login");
  };

  if (!mounted) return null;

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? "bg-white/30 dark:bg-gray-950/95 backdrop-blur-lg shadow-md" : "bg-white dark:bg-gray-950"
    }`}>
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center">
              <BookOpen className="w-6 h-6 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="text-gray-900 dark:text-white font-semibold">KneaLearn</span>
              <span className="text-indigo-500 dark:text-red-500 text-sm leading-none">Academy</span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`transition-colors font-medium ${
                    isActive
                      ? "text-blue-600 dark:text-blue-400"
                      : "text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400"
                  }`}
                >
                  {item.name}
                </Link>
              );
            })}
          </div>

          {/* Right Icons */}
          <div className="flex items-center gap-3">
            {isLoggedIn && (
  <Link href="/wishlist" className="relative inline-block p-2">
    <Heart
      className={`w-6 h-6 transition-all ${
        wishlistCount > 0 
          ? "fill-red-500 text-red-500" 
          : "text-gray-600 dark:text-gray-400"
      }`}
    />
    {wishlistCount > 0 && (
      <span className="absolute -top-1 -right-1 min-w-5 h-5 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center shadow-md animate-bounce">
        {wishlistCount}
      </span>
    )}
  </Link>
)}

            <button onClick={() => setIsDark(!isDark)} className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800">
              {isDark ? <Sun className="w-5 h-5 text-yellow-400" /> : <Moon className="w-5 h-5 text-gray-700" />}
            </button>

            {!isLoggedIn ? (
              <>
                <Link href="/login" className="hidden md:block bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded-lg text-sm font-medium">
                  Login
                </Link>
                <Link href="/register" className="hidden md:block bg-purple-600 hover:bg-purple-700 text-white px-5 py-2 rounded-lg text-sm font-medium">
                  Register
                </Link>
              </>
            ) : (
              <>
                <Link href="/account" className="hidden md:flex items-center gap-2 text-gray-700 dark:text-gray-300 hover:text-indigo-600">
                  <User className="w-5 h-5" /> Account
                </Link>
                <button onClick={handleLogout} className="hidden md:flex items-center gap-2 text-red-600 hover:text-red-700">
                  <LogOut className="w-5 h-5" /> Logout
                </button>
              </>
            )}

            {/* Mobile Menu Toggle */}
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="lg:hidden p-2">
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden border-t border-gray-200 dark:border-gray-800 py-4">
            <div className="flex flex-col gap-3">
              {navLinks.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={`px-3 py-2 rounded-md ${pathname === item.href ? "bg-indigo-100 dark:bg-indigo-900 text-indigo-600" : "text-gray-700 dark:text-gray-300"}`}
                >
                  {item.name}
                </Link>
              ))}

              {!isLoggedIn ? (
                <div className="flex gap-3 px-3 pt-3">
                  <Link href="/login" onClick={() => setIsMenuOpen(false)} className="flex-1 bg-indigo-600 text-white py-2 rounded-lg text-center">
                    Login
                  </Link>
                  <Link href="/register" onClick={() => setIsMenuOpen(false)} className="flex-1 bg-purple-600 text-white py-2 rounded-lg text-center">
                    Register
                  </Link>
                </div>
              ) : (
                <div className="px-3 pt-3 space-y-3">
                  <Link href="/account" onClick={() => setIsMenuOpen(false)} className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
                    <User className="w-5 h-5" /> Account
                  </Link>
                  <button onClick={handleLogout} className="flex items-center gap-3 text-red-600 w-full text-left">
                    <LogOut className="w-5 h-5" /> Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}