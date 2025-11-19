"use client";
import { motion } from "framer-motion";
import { Code2, Play, Star, Users } from 'lucide-react';
import {useRouter} from "next/navigation";

import Image from 'next/image';


export function HeroSection() {
  const router =useRouter();
  return (
     <section className="relative pt-24 md:pt-32 pb-20 overflow-hidden bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-950 dark:to-indigo-950/30">
      
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute -top-1/2 -right-1/4 w-[30rem] h-[30rem] bg-indigo-200/20 dark:bg-indigo-500/10 rounded-full blur-3xl"
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">

          {/* Left */}
          <div className="text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-100 dark:bg-indigo-500/20 text-indigo-600 dark:text-indigo-400 rounded-full mb-6 text-sm sm:text-base"
            >
              <Code2 className="w-4 h-4" />
              <span>Learn to Code, Advance Your Career</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="text-gray-900 dark:text-white font-bold text-3xl sm:text-4xl lg:text-5xl mb-6"
            >
              Master Coding Skills with Expert-Led Courses
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="text-gray-600 dark:text-gray-400 mb-10 max-w-md mx-auto lg:mx-0 text-base sm:text-lg"
            >
              Join thousands of developers learning the latest technologies — Web Development, AI, Data Science and more.
            </motion.p>

            {/* Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-10"
            >
              <button onClick={()=>router.push("/course")} className="bg-indigo-500 hover:bg-indigo-600 text-white rounded-full px-10 py-3 font-medium text-sm sm:text-base">
                Explore Courses
              </button>
              <button className="px-10 py-3 border rounded-full border-gray-300 dark:border-gray-600 hover:bg-gray-200 dark:hover:bg-gray-800 font-medium text-sm sm:text-base flex items-center justify-center gap-2">
                <Play className="w-4 h-4" />
                Watch Intro
              </button>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="flex items-center justify-center lg:justify-start gap-10"
            >
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-indigo-500" />
                <span className="text-gray-900 dark:text-white font-medium text-sm sm:text-base">50K+ Students</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                <span className="text-gray-900 dark:text-white font-medium text-sm sm:text-base">4.9 Rating</span>
              </div>
            </motion.div>
          </div>

          {/* Right - Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="relative flex justify-center"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl w-full max-w-md mx-auto">
              <Image
                src="/images/herosection.png"
                alt="Coding learning"
                width={600}
                height={500}
                className="w-full h-auto object-cover"
                priority
              />
            </div>

            {/* Floating cards — hidden on small screens */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1, duration: 0.6 }}
              className="hidden md:block absolute -left-6 top-1/4 bg-white dark:bg-gray-800 rounded-xl shadow-xl p-4"
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-emerald-500 rounded-lg flex items-center justify-center">
                  <Code2 className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="text-gray-900 dark:text-white font-semibold">JavaScript</div>
                  <div className="text-gray-600 dark:text-gray-400 text-sm">300+ Courses</div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.2, duration: 0.6 }}
              className="hidden sm:block absolute -right-6 bottom-1/4 bg-white dark:bg-gray-800 rounded-xl shadow-xl p-4"
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-lg flex items-center justify-center">
                  <Star className="w-6 h-6 text-white fill-white" />
                </div>
                <div>
                  <div className="text-gray-900 dark:text-white font-semibold">Top Rated</div>
                  <div className="text-gray-600 dark:text-gray-400 text-sm">4.9/5.0</div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
