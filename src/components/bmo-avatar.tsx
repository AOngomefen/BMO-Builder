"use client";

import { motion, AnimatePresence } from "framer-motion";
import { BmoMood } from "@/lib/types";

interface BmoAvatarProps {
  mood: BmoMood;
  size?: number;
}

function BmoFace({ mood }: { mood: BmoMood }) {
  const eyeVariants = {
    idle: { scaleY: 1 },
    thinking: { scaleY: 0.3 },
    success: { scaleY: 1.1 },
    error: { scaleY: 0.6 },
    greeting: { scaleY: 1 },
  };

  const mouthPaths: Record<BmoMood, string> = {
    idle: "M 35 55 Q 50 62 65 55",
    thinking: "M 38 57 L 62 57",
    success: "M 32 52 Q 50 68 68 52",
    error: "M 35 60 Q 50 52 65 60",
    greeting: "M 30 52 Q 50 70 70 52",
  };

  return (
    <svg viewBox="0 0 100 100" className="w-full h-full">
      {/* Body */}
      <rect
        x="5" y="5" width="90" height="90" rx="16" ry="16"
        fill="#78BCA8"
        stroke="#5A9A88"
        strokeWidth="2"
      />

      {/* Screen */}
      <rect
        x="15" y="12" width="70" height="50" rx="6" ry="6"
        fill="#1a3a32"
      />

      {/* Screen glow */}
      <rect
        x="17" y="14" width="66" height="46" rx="4" ry="4"
        fill="#0d2920"
        opacity="0.5"
      />

      {/* Eyes */}
      <AnimatePresence mode="wait">
        <motion.ellipse
          key={`left-eye-${mood}`}
          cx="38" cy="35" rx="5" ry="6"
          fill="#78BCA8"
          initial={{ scaleY: 0 }}
          animate={eyeVariants[mood]}
          transition={{ duration: 0.3 }}
        />
      </AnimatePresence>
      <AnimatePresence mode="wait">
        <motion.ellipse
          key={`right-eye-${mood}`}
          cx="62" cy="35" rx="5" ry="6"
          fill="#78BCA8"
          initial={{ scaleY: 0 }}
          animate={eyeVariants[mood]}
          transition={{ duration: 0.3 }}
        />
      </AnimatePresence>

      {/* Mouth */}
      <motion.path
        d={mouthPaths[mood]}
        fill="none"
        stroke="#78BCA8"
        strokeWidth="2.5"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.4 }}
      />

      {/* D-pad */}
      <rect x="25" y="68" width="8" height="16" rx="2" fill="#5A9A88" />
      <rect x="21" y="72" width="16" height="8" rx="2" fill="#5A9A88" />

      {/* Buttons */}
      <circle cx="65" cy="72" r="4" fill="#E85D75" />
      <circle cx="75" cy="76" r="4" fill="#4A90D9" />

      {/* Thinking dots animation */}
      {mood === "thinking" && (
        <>
          <motion.circle
            cx="38" cy="48" r="1.5" fill="#78BCA8"
            animate={{ opacity: [0, 1, 0] }}
            transition={{ duration: 1, repeat: Infinity, delay: 0 }}
          />
          <motion.circle
            cx="50" cy="48" r="1.5" fill="#78BCA8"
            animate={{ opacity: [0, 1, 0] }}
            transition={{ duration: 1, repeat: Infinity, delay: 0.3 }}
          />
          <motion.circle
            cx="62" cy="48" r="1.5" fill="#78BCA8"
            animate={{ opacity: [0, 1, 0] }}
            transition={{ duration: 1, repeat: Infinity, delay: 0.6 }}
          />
        </>
      )}
    </svg>
  );
}

export default function BmoAvatar({ mood, size = 120 }: BmoAvatarProps) {
  return (
    <motion.div
      className="relative"
      style={{ width: size, height: size }}
      animate={mood === "greeting" ? { rotate: [0, -5, 5, -5, 0] } : { rotate: 0 }}
      transition={{ duration: 0.6, ease: "easeInOut" }}
    >
      <BmoFace mood={mood} />
      <motion.div
        className="absolute -bottom-1 left-1/2 -translate-x-1/2 text-xs font-medium text-bmo-dark/60"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        {mood === "thinking" && "thinking..."}
        {mood === "success" && "done!"}
        {mood === "error" && "oh no!"}
      </motion.div>
    </motion.div>
  );
}
