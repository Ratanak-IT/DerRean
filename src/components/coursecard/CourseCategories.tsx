"use client";
import { motion } from "framer-motion";
import { Code2, Database, Smartphone, Brain, Cloud, Terminal } from 'lucide-react';
import OurContent from "../ourcontent/Ourcontent";

const categories = [
  { icon: Code2, name: 'Web Development', count: 450, color: 'from-blue-400 to-cyan-500' },
  { icon: Database, name: 'Data Science', count: 280, color: 'from-green-400 to-emerald-500' },
  { icon: Smartphone, name: 'Mobile Dev', count: 320, color: 'from-purple-400 to-pink-500' },
  { icon: Brain, name: 'AI & ML', count: 190, color: 'from-orange-400 to-red-500' },
  { icon: Cloud, name: 'Cloud Computing', count: 240, color: 'from-indigo-400 to-blue-500' },
  { icon: Terminal, name: 'DevOps', count: 160, color: 'from-yellow-400 to-orange-500' },
];

export function CourseCategories() {
  return (
    <section className="md:py-16 bg-gray-100 dark:bg-[#0e0e28]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <OurContent title="Explore Categories" text="Choose from our most popular programming categories and start learning today" />
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
          {categories.map((category, index) => (
            <motion.div
              key={category.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
            >
              <button className="w-full p-6 bg-gray-50 dark:bg-gray-900 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-3xl transition-all duration-300 group border border-gray-200 dark:border-gray-800 hover:shadow-lg">
                <div className={`w-14 h-14 mx-auto mb-4 rounded-xl bg-gradient-to-br ${category.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                  <category.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-gray-900 dark:text-white mb-1 line-clamp-1">
                  {category.name}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {category.count} courses
                </p>
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
