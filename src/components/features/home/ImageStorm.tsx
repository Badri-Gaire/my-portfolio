import React from "react";
import { motion } from "framer-motion";
import Lightning from "./Lightning";

type Props = {
  src: string;
  alt?: string;
  sizeClass?: string;
};

export default function ImageStorm({
  src,
  alt = "",
  sizeClass = "w-72 h-72 md:w-96 md:h-96",
}: Props) {
  return (
    <div className="flex-1 flex justify-center perspective-[1000px] select-none ">
      <motion.div
        className={`relative ${sizeClass} group overflow-visible`}
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.5 }}
      >

        <motion.div
          className="w-full h-full rounded-full overflow-hidden border-4 border-white dark:border-gray-900 shadow-2xl relative z-10 bg-white dark:bg-gray-900 transition-all duration-500 group-hover:scale-105"
          whileHover={{ scale: 1.03 }}
          transition={{ duration: 0.6 }}
        >
          <img
            src={src}
            alt={alt}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
        </motion.div>

        <div className="absolute -inset-8 -z-10 blur-3xl rounded-full opacity-60 transition-colors duration-500 bg-linear-to-tr from-blue-200/50 via-purple-200/50 to-pink-200/50 dark:from-blue-500/30 dark:via-purple-500/30 dark:to-pink-500/30 animate-[pulse_4s_ease-in-out_infinite]"></div>

        {/* Lightning overlay placed here so bolts sit over the portrait */}
        <div className="hidden md:block">

        <Lightning />
        </div>
      </motion.div>
    </div>
  );
}
