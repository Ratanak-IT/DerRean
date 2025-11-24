'use client';

import { useState, useEffect } from "react";
import { Menu, X, Moon, Sun, BookOpen, Heart, User, LogOut } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useUser } from "@/context/UserContext";

interface NavbarProps {
  wishlistCount?: number;
}

export default function Navbar({ wishlistCount = 0 }: NavbarProps) {
  const { isLoggedIn, setIsLoggedIn } = useUser();
  const pathname = usePathname();
  const router = useRouter();

  const [mounted, setMounted] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Safe mount
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

  if (!mounted) return null; // prevent SSR mismatch

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? "bg-white/30 dark:bg-gray-950/95 backdrop-blur-lg shadow-md" : "bg-white dark:bg-gray-950"
    }`}>
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-23">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center">
              <BookOpen className="w-6 h-6 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="text-gray-900 dark:text-white">KneaLearn</span>
              <span className="text-indigo-500 dark:text-red-500 leading-none">Academy</span>
            </div>
          </Link>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link key={item.href} href={item.href} className={`transition-colors duration-200 ${
                  isActive ? "text-blue-500 dark:text-blue-400" : "text-gray-700 dark:text-gray-300 hover:text-indigo-500 dark:hover:text-indigo-400"
                }`}>
                  {item.name}
                </Link>
              );
            })}
          </div>

          {/* Right icons */}
          <div className="flex items-center gap-2 md:gap-4">
            {isLoggedIn && (
              <Link href="/wishlist" className="relative p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                <Heart className="w-5 h-5 text-gray-700 dark:text-gray-300" />
                {wishlistCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">{wishlistCount}</span>
                )}
              </Link>
            )}

            <button onClick={() => setIsDark(!isDark)} className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800">
              {isDark ? <Sun className="w-5 h-5 text-gray-200" /> : <Moon className="w-5 h-5 text-gray-700" />}
            </button>

            {!isLoggedIn && (
              <>
                <Link href="/login" className="hidden md:flex bg-indigo-500 hover:bg-indigo-600 text-white rounded-lg px-6 py-2">Login</Link>
                <Link href="/register" className="hidden md:flex bg-indigo-500 hover:bg-indigo-600 text-white rounded-lg px-6 py-2">Register</Link>
              </>
            )}

            {isLoggedIn && (
              <>
                <Link href="/account" className="hidden md:flex items-center gap-2 text-gray-700 dark:text-gray-300"><User className="w-5 h-5" /> Account</Link>
                <button onClick={handleLogout} className="hidden md:flex items-center gap-2 text-red-500 hover:text-red-600"><LogOut className="w-5 h-5" /> Logout</button>
              </>
            )}

            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="lg:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800">
              {isMenuOpen ? <X className="w-6 h-6 dark:text-gray-300" /> : <Menu className="w-6 h-6 dark:text-gray-300" />}
            </button>
          </div>
        </div>

        {/* Mobile nav */}
        {isMenuOpen && (
          <div className="lg:hidden py-4 border-t border-gray-200 dark:border-gray-100">
            <div className="flex flex-col gap-4">
              {navLinks.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link key={item.href} href={item.href} onClick={() => setIsMenuOpen(false)} className={`px-2 py-1 transition ${
                    isActive ? "text-blue-500 dark:text-blue-400" : "text-gray-700 dark:text-gray-300 hover:text-indigo-500 dark:hover:text-indigo-400"
                  }`}>
                    {item.name}
                  </Link>
                );
              })}

              {!isLoggedIn && (
                <div className="flex gap-2 pt-2">
                  <Link href="/login" onClick={() => setIsMenuOpen(false)} className="bg-indigo-500 hover:bg-indigo-600 text-white rounded-lg flex-1 py-2 text-center">Login</Link>
                  <Link href="/register" onClick={() => setIsMenuOpen(false)} className="bg-indigo-500 hover:bg-indigo-600 text-white rounded-lg flex-1 py-2 text-center">Register</Link>
                </div>
              )}

              {isLoggedIn && (
                <div className="flex flex-col gap-2 pt-2">
                  <Link href="/account" onClick={() => setIsMenuOpen(false)} className="flex items-center gap-2 px-2 text-gray-700 dark:text-gray-300"><User className="w-5 h-5" /> Account</Link>
                  <button onClick={handleLogout} className="flex items-center gap-2 px-2 text-red-500"><LogOut className="w-5 h-5" /> Logout</button>
                </div>
              )}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
