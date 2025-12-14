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
  const words = String(text).split(" ");

  return (
    <Tag className={className} aria-label={String(text)}>
      {words.map((word, i) => (
        <motion.span
          key={`${word}-${i}`}
          initial={{ y: "100%", opacity: 0 }}
          animate={{ y: "0%", opacity: 1 }}
          transition={{ duration: 0.7, delay: i * wordDelay, ease: "easeOut" }}
          className="inline-block"
        >
          {word}
          {i < words.length - 1 ? "\u00A0" : ""}
        </motion.span>
      ))}
    </Tag>
  );
}
