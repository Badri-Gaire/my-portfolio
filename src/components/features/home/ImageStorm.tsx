import React, { useState } from "react";
import { motion } from "framer-motion";
import Lightning from "./Lightning";

type Props = {
  src: string;             
  placeholder?: string;    // base64 blur placeholder
  alt?: string;
  sizeClass?: string;     
};

export default function ImageStorm({
  src,
  placeholder,
  alt = "",
  sizeClass = "w-72 h-72 md:w-96 md:h-96",
}: Props) {
  const [isLoaded, setIsLoaded] = useState(true);

  return (
    <div className="flex-1 flex justify-center perspective-[1000px] select-none">
      <motion.div
        className={`relative ${sizeClass} group overflow-visible`}
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.5 }}
      >
        {/* Placeholder / blur effect */}
        {placeholder && isLoaded && (
          <img
            src={placeholder}
            alt="placeholder"
            className="absolute inset-0 w-full h-full object-cover blur-xl scale-105"
          />
        )}

        {/* Actual Image */}
        <img
          src={src}
          alt={alt}
          onLoad={() => setIsLoaded(true)}
          className={`w-full h-full object-cover rounded-full border-4 border-white dark:border-gray-900 shadow-2xl transition-opacity duration-700 group-hover:scale-110 ${
            isLoaded ? "opacity-100" : "opacity-0"
          }`}
          loading="eager"
          decoding="sync"
          fetchPriority="high"
        />

        {/* Animated glow background */}
        <div className="absolute -inset-8 -z-10 blur-3xl rounded-full opacity-60 transition-colors duration-500 
          bg-linear-to-tr from-blue-200/50 via-purple-200/50 to-pink-200/50 
          dark:from-blue-500/30 dark:via-purple-500/30 dark:to-pink-500/30 
          animate-[pulse_4s_ease-in-out_infinite]" />

        {/* Lightning overlay */}
        <div className="hidden md:block">
          <Lightning />
        </div>
      </motion.div>
    </div>
  );
}
