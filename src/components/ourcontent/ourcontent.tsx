// src/components/ourcontent/OurContent.tsx   ← NEW FILE NAME!
"use client";

import { motion } from "framer-motion";

interface OurContentProps {
  title: string;
  text: string;
}

export default function OurContent({ title, text }: OurContentProps) {
  return (
    <div className="text-center py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="space-y-4"
      >
        <h2 className="text-4xl font-bold text-gray-900 dark:text-white">
          {title}
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          {text}
        </p>
      </motion.div>
    </div>
  );
}