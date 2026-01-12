import React from "react";
import { motion, type HTMLMotionProps } from "framer-motion";

type Props = Omit<HTMLMotionProps<"div">, "initial" | "animate" | "transition" | "viewport"> & {
  children: React.ReactNode;
  delay?: number;
};

export default function FadeIn({
  children,
  delay = 0,
  className = "",
  ...rest
}: Props) {
  return (
    <motion.div
      initial={{ opacity: 1, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay, ease: "easeOut" }}
      style={{ opacity: 1 }}
      viewport={{ once: true }}
      className={className}
      {...rest}
    >
      {children}
    </motion.div>
  );
}