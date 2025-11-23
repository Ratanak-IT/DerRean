import { motion } from "framer-motion";

interface OurContentProps {
  title?: string;
  text?: string;
}
export default function OurContent(props: OurContentProps) {
  return (
    <>
    <div >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <h2 className="text-gray-900 dark:text-white mb-4 text-2xl">
          {props.title}
        </h2>
        <p className="text-gray-600 text-md dark:text-gray-400 max-w-2xl mx-auto">
          {props.text}
        </p>
      </motion.div>
      </div>
    </>
  );
}
