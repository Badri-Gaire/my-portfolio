import { motion } from "framer-motion";
import type React from "react";

interface AboutContentProps {
  description: string;
  traits: string[];
}

export default function AboutContent({
  description,
  traits,
}: AboutContentProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
      },
    },
  };

  const titleVariants = {
    hidden: { opacity: 0, y: 60 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
      },
    },
  };

  const descriptionVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        delay: 0.1,
      },
    },
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3, margin: "0px 0px -100px 0px" }}
      variants={containerVariants}
      className="mb-16"
    >
      {/* Title */}
      <motion.div
        variants={titleVariants}
        className="text-center mb-12 max-w-3xl mx-auto"
      >
        <h1 className="text-5xl md:text-7xl font-black bg-clip-text text-transparent bg-linear-to-r from-indigo-600 via-purple-600 to-pink-600 dark:from-indigo-400 dark:via-purple-400 dark:to-pink-400 mb-6">
          About Me
        </h1>

        {/* Description */}
        <motion.p
          variants={descriptionVariants}
          className="text-lg md:text-xl text-gray-700 dark:text-gray-300 leading-relaxed font-medium"
        >
          {description}
        </motion.p>
      </motion.div>

      {/* Traits as Badges */}
      <motion.div
        variants={containerVariants}
        className="flex flex-wrap justify-center gap-4 mb-12"
      >
        {traits.map((trait) => (
          <motion.div
            key={trait}
            variants={itemVariants}
            whileHover={{ scale: 1.08, y: -5 }}
            className="group relative"
          >
            <motion.div
              className="absolute inset-0 bg-linear-to-r from-indigo-600 to-purple-600 rounded-full opacity-0 group-hover:opacity-100 blur transition-opacity duration-300"
              whileHover={{ opacity: 1 }}
            />
            <motion.span className="relative px-6 py-3 min-w-52 text-nowrap text-center bg-white dark:bg-gray-800 text-gray-900 dark:text-white border-2 border-gray-200 dark:border-gray-700 rounded-full text-sm font-semibold transition-all hover:border-indigo-600 dark:hover:border-indigo-400 hover:shadow-xl hover:shadow-indigo-500/20 block">
              {trait}
            </motion.span>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
}
