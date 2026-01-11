import React, { useState, useEffect } from "react";
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
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    // Check if image is already cached/loaded
    const img = new Image();
    img.src = src;
    
    if (img.complete) {
      setIsLoaded(true);
    }
  }, [src]);

  const handleImageLoad = () => {
    setIsLoaded(true);
  };

  const handleImageError = () => {
    setHasError(true);
    setIsLoaded(true); // Hide skeleton even on error
  };

  return (
    <div className="flex-1 flex justify-center perspective-[1000px] select-none">
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
          {/* Skeleton Loader - only show when not loaded */}
          {!isLoaded && (
            <div className="absolute inset-0 animate-pulse bg-linear-to-br from-gray-200 via-gray-300 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 z-20">
              <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/20 dark:via-white/10 to-transparent animate-shimmer" />
            </div>
          )}

          {/* Error State */}
          {hasError && (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-100 dark:bg-gray-800 z-20">
              <div className="text-center">
                <svg
                  className="w-16 h-16 mx-auto text-gray-400 dark:text-gray-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                  Failed to load image
                </p>
              </div>
            </div>
          )}

          {/* Actual Image */}
          <img
            src={src}
            alt={alt}
            fetchPriority="high"
            decoding="async"
            loading="eager"
            onLoad={handleImageLoad}
            onError={handleImageError}
            className={`w-full h-full object-cover transition-all duration-700 group-hover:scale-110 ${
              isLoaded ? "opacity-100" : "opacity-0"
            }`}
            style={{
              aspectRatio: "1 / 1",
            }}
          />
        </motion.div>

        {/* Animated glow background */}
        <div className="absolute -inset-8 -z-10 blur-3xl rounded-full opacity-60 transition-colors duration-500 bg-linear-to-tr from-blue-200/50 via-purple-200/50 to-pink-200/50 dark:from-blue-500/30 dark:via-purple-500/30 dark:to-pink-500/30 animate-[pulse_4s_ease-in-out_infinite]" />

        {/* Lightning overlay */}
        <div className="hidden md:block">
          <Lightning />
        </div>
      </motion.div>
    </div>
  );
}