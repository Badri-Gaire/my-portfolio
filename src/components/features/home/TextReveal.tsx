import React from "react";
import { motion } from "framer-motion";

type Props = {
  text: string;
  tag?: string;
  className?: string;
  wordDelay?: number;
};

export default function TextReveal({
  text,
  tag = "div",
  className = "",
  wordDelay = 0.08,
}: Props) {
  const Tag: any = tag;
  const lines = String(text).split("\n");
  let wordIndex = 0;

  return (
    <Tag className={className} aria-label={String(text)}>
      {lines.map((line, lineIdx) => (
        <div key={`line-${lineIdx}`}>
          {line.split(" ").map((word, wordIdx) => (
            <motion.span
              key={`${word}-${wordIndex}`}
              initial={{ y: "100%", opacity: 0 }}
              animate={{ y: "0%", opacity: 1 }}
              transition={{
                duration: 0.7,
                delay: wordIndex * wordDelay,
                ease: "easeOut",
              }}
              className="inline-block"
              onAnimationComplete={() => {
                wordIndex++;
              }}
            >
              {word}
              {wordIdx < line.split(" ").length - 1 ? "\u00A0" : ""}
            </motion.span>
          ))}
        </div>
      ))}
    </Tag>
  );
}
