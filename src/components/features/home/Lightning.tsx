import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Flash = {
  id: number;
  paths: string[];
  color: string;
};

function makeBoltPath(width = 360, height = 460, segments = 8) {
  const stepY = height / segments;
  let x = width / 2 + (Math.random() - 0.5) * 40;
  let d = `M ${x.toFixed(1)} 0`;
  for (let i = 1; i <= segments; i++) {
    const nx = Math.max(
      10,
      Math.min(width - 10, x + (Math.random() - 0.5) * 80)
    );
    const ny = i * stepY;
    d += ` L ${nx.toFixed(1)} ${ny.toFixed(1)}`;
    x = nx;
    if (Math.random() > 0.75 && i < segments - 1) {
      const bx = Math.max(
        5,
        Math.min(width - 5, x + (Math.random() - 0.5) * 50)
      );
      const by = ny + stepY * 0.4;
      d += ` M ${x.toFixed(1)} ${ny.toFixed(1)} Q ${((x + bx) / 2).toFixed(
        1
      )} ${((ny + by) / 2).toFixed(1)} ${bx.toFixed(1)} ${by.toFixed(1)}`;
    }
  }
  return d;
}

export default function Lightning() {
  const [flashes, setFlashes] = useState<Flash[]>([]);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const idRef = useRef(0);
  const coolDownRef = useRef(false);

  useEffect(() => {
    const handler = () => trigger(true);
    window.addEventListener("storm-toggle", handler);
    return () => window.removeEventListener("storm-toggle", handler);
  }, []);

  const trigger = (withSound = true) => {
    if (coolDownRef.current) return;
    coolDownRef.current = true;

    const bolts = 2 + Math.floor(Math.random() * 4);
    const idBase = ++idRef.current;
    for (let i = 0; i < bolts; i++) {
      const id = idBase + i;
      const color = Math.random() > 0.6 ? "#f8e16c" : "#9be9ff";
      const paths = [makeBoltPath(360, 460, 8)];
      setTimeout(() => setFlashes((s) => [...s, { id, paths, color }]), i * 80);
      setTimeout(
        () => setFlashes((s) => s.filter((f) => f.id !== id)),
        1200 + i * 100
      );
    }

    if (withSound && audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.volume = 0.7;
      const p = audioRef.current.play();
      if (p && (p as any).catch) (p as any).catch(() => {});
    }

    setTimeout(() => {
      coolDownRef.current = false;
    }, 2000);
  };

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 z-40">
      <AnimatePresence>
        {flashes.map((f) => (
          <svg
            key={f.id}
            viewBox="0 0 360 460"
            className="absolute"
            style={{
              width: "360px",
              height: "460px",
              left: "50%",
              top: "-10%",
              transform: "translateX(-50%)",
              mixBlendMode: "screen",
              pointerEvents: "none",
            }}
          >
            {f.paths.map((p, idx) => (
              <motion.path
                key={idx}
                d={p}
                fill="none"
                stroke={f.color}
                strokeWidth={idx === 0 ? 4 : 2}
                strokeLinecap="round"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: [0, 1, 0.9], opacity: [0, 1, 0.4] }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.18, ease: "easeIn" }}
                className="drop-shadow-[0_0_18px_rgba(255,255,255,0.9)]"
              />
            ))}
          </svg>
        ))}
      </AnimatePresence>
      <audio ref={audioRef} src="/sounds/lightning.mp3" preload="auto" />
    </div>
  );
}
