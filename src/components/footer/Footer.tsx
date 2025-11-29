import Link from "next/link";
import Image from "next/image";
import {
  Facebook,
  Twitter,
  Youtube,
  Instagram,
  Linkedin,
  MessageCircle,
  Mail,
} from "lucide-react";

export default function Footer() {
  return (
    <footer
      className="
        bg-white text-[#001f3f] 
        dark:bg-[#001f3f] dark:text-white 
        transition-colors duration-300
      "
    >
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-10">
        
        {/* Left Section */}
        <div>
          <h2 className="text-xl font-semibold flex items-center gap-2 mt-1">
            <span className="bg-blue-600 text-white px-2 py-1 rounded-md ">
              {"</>"}
            </span>
            CodeLearn
          </h2>

          <p className="mt-3 text-gray-600 dark:text-gray-300">
            Your free platform to learn coding. Master programming skills with our
            comprehensive courses — all available at no cost.
          </p>
          <div className="flex justify-center md:justify-start gap-5 mt-4">
                <Link href="#"><Facebook size={20} /></Link>
                <Link href="#"><Twitter size={20} /></Link>
                <Link href="#"><Youtube size={20} /></Link>
                <Link href="#"><Instagram size={20} /></Link>
                <Link href="#"><Linkedin size={20} /></Link>
              </div>
        </div>
        

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-4 mt-3">Quick Links</h3>
          <ul className="space-y-2 text-gray-600 dark:text-gray-300">
            <li><Link href="/home" className="hover:text-black dark:hover:text-white">Home</Link></li>
            <li><Link href="#" className="hover:text-black dark:hover:text-white">About Us</Link></li>
            <li><Link href="#" className="hover:text-black dark:hover:text-white">Courses</Link></li>
            <li><Link href="#" className="hover:text-black dark:hover:text-white">Blog</Link></li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-lg font-semibold mb-4 mt-3">Contact</h3>
          <ul className="space-y-2 text-gray-600 dark:text-gray-300">
            <li className="flex items-center gap-2">
              <Mail size={18} />
              info@codelearn.com
            </li>
            <li><Link href="#" className="hover:text-black dark:hover:text-white">FAQ</Link></li>
            <li><Link href="#" className="hover:text-black dark:hover:text-white">Support</Link></li>
            <li><Link href="#" className="hover:text-black dark:hover:text-white">Privacy Policy</Link></li>
          </ul>
        </div>
      </div>

      <div
        className="
          border-t border-gray-300 text-gray-600 
          dark:border-gray-700 dark:text-gray-400 
          mt-10 pt-6 text-center transition-colors
        "
      >
        © 2025 CodeLearn. All rights reserved. Free learning for everyone.
      </div>
    </footer>
  );
}
