// src/components/coursecard/CourseCategories.tsx
"use client";

import { motion } from "framer-motion";
import { Code2, Database, Smartphone, Brain, Cloud, Terminal } from "lucide-react";
import OurContent from "@/components/ourcontent/OurContent";


// FIXED: Correct path + capital letters
   // ← This line was wrong before!

const categories = [
  { icon: Code2, name: "Web Development", count: 450, color: "from-blue-400 to-cyan-500" },
  { icon: Database, name: "Backend & API", count: 320, color: "from-emerald-400 to-teal-600" },
  { icon: Smartphone, name: "Mobile Apps", count: 280, color: "from-purple-400 to-pink-500" },
  { icon: Brain, name: "AI & Machine Learning", count: 190, color: "from-orange-400 to-red-500" },
  { icon: Cloud, name: "DevOps & Cloud", count: 210, color: "from-indigo-400 to-blue-600" },
  { icon: Terminal, name: "Terminal & Tools", count: 380, color: "from-gray-600 to-gray-800" },
];

export function CourseCategories() {
  return (
    <section className="py-16 bg-white dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <OurContent
          title="Explore by Category"
          text="Choose your path and start learning today"
        />

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6 mt-10">
          {categories.map((cat, i) => (
            <motion.div
              key={cat.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group cursor-pointer"
            >
              <div className="text-center space-y-3">
                <div className={`w-20 h-20 mx-auto rounded-2xl bg-gradient-to-br ${cat.color} p-4 shadow-lg group-hover:scale-110 transition-transform`}>
                  <cat.icon className="w-full h-full text-white" />
                </div>
                <h3 className="font-semibold text-gray-800 dark:text-gray-200">{cat.name}</h3>
                <p className="text-sm text-gray-500">{cat.count}+ courses</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
