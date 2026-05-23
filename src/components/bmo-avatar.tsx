"use client";

import { motion } from "framer-motion";
import { BmoMood } from "@/lib/types";

interface BmoAvatarProps {
  mood: BmoMood;
  size?: number;
}

const FACE = "#d9ffea";
const BODY = "#63bda4";
const LIMB = "#62afb7";
const STROKE = "#2a2a2a";
const MOUTH_GREEN = "#4a9a6e";
const MOUTH_GREEN_LIGHT = "#6bbd8a";
const BLUSH_GREEN = "rgba(74,154,110,0.35)";
const BLUSH_PINK = "rgba(255,182,193,0.5)";

function SleepFace() {
  return (
    <>
      {/* Closed eyes - U shapes */}
      <path d="M 28 32 Q 28 42 38 42 Q 48 42 48 32" fill="none" stroke={STROKE} strokeWidth="3" strokeLinecap="round" />
      <path d="M 52 32 Q 52 42 62 42 Q 72 42 72 32" fill="none" stroke={STROKE} strokeWidth="3" strokeLinecap="round" />
      {/* Gentle smile */}
      <path d="M 38 58 Q 50 66 62 58" fill="none" stroke={STROKE} strokeWidth="2.5" strokeLinecap="round" />
    </>
  );
}

function TalkingHappyFace() {
  return (
    <>
      {/* Dot eyes */}
      <ellipse cx="38" cy="36" rx="5" ry="5.5" fill={STROKE} />
      <ellipse cx="62" cy="36" rx="5" ry="5.5" fill={STROKE} />
      {/* Open mouth - half circle with teeth and green */}
      <path d="M 38 54 Q 38 70 50 70 Q 62 70 62 54 Z" fill={STROKE} strokeWidth="0" />
      <rect x="39" y="54" width="22" height="4" rx="1" fill="white" />
      <path d="M 40 58 Q 40 70 50 70 Q 60 70 60 58 Z" fill={MOUTH_GREEN} />
    </>
  );
}

function TalkingSadFace() {
  return (
    <>
      {/* Wavy tear streams */}
      <motion.path
        d="M 20 40 Q 16 48 20 56 Q 24 64 20 72 Q 16 80 20 88"
        fill="none" stroke={BODY} strokeWidth="6" strokeLinecap="round" opacity="0.5"
        animate={{ y: [0, 3, 0] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      />
      <motion.path
        d="M 80 40 Q 84 48 80 56 Q 76 64 80 72 Q 84 80 80 88"
        fill="none" stroke={BODY} strokeWidth="6" strokeLinecap="round" opacity="0.5"
        animate={{ y: [0, 3, 0] }}
        transition={{ duration: 1.5, repeat: Infinity, delay: 0.3 }}
      />
      {/* Angry/sad eyebrows */}
      <line x1="28" y1="24" x2="42" y2="28" stroke={STROKE} strokeWidth="3" strokeLinecap="round" />
      <line x1="72" y1="24" x2="58" y2="28" stroke={STROKE} strokeWidth="3" strokeLinecap="round" />
      {/* Curved sad eyes */}
      <path d="M 30 34 Q 36 40 44 34" fill="none" stroke={STROKE} strokeWidth="3" strokeLinecap="round" />
      <path d="M 56 34 Q 62 40 70 34" fill="none" stroke={STROKE} strokeWidth="3" strokeLinecap="round" />
      {/* Open sad mouth */}
      <path d="M 38 56 Q 38 70 50 70 Q 62 70 62 56 Z" fill={STROKE} strokeWidth="0" />
      <rect x="39" y="56" width="22" height="3" rx="1" fill="white" />
      <path d="M 40 59 Q 40 70 50 70 Q 60 70 60 59 Z" fill={MOUTH_GREEN} />
    </>
  );
}

function TalkingStressedFace() {
  return (
    <>
      {/* Sad curved eyebrows */}
      <path d="M 26 26 Q 36 22 46 28" fill="none" stroke={STROKE} strokeWidth="3" strokeLinecap="round" />
      <path d="M 74 26 Q 64 22 54 28" fill="none" stroke={STROKE} strokeWidth="3" strokeLinecap="round" />
      {/* Sad curved eyes */}
      <path d="M 28 36 Q 36 44 46 36" fill="none" stroke={STROKE} strokeWidth="3" strokeLinecap="round" />
      <path d="M 54 36 Q 62 44 72 36" fill="none" stroke={STROKE} strokeWidth="3" strokeLinecap="round" />
      {/* Triangle tears falling */}
      {[0, 1, 2].map((i) => (
        <motion.polygon
          key={`tear-l-${i}`}
          points="22,50 20,56 24,56"
          fill={BODY} opacity="0.5"
          animate={{ y: [i * 14, i * 14 + 30], opacity: [0.5, 0] }}
          transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.4 }}
        />
      ))}
      {[0, 1, 2].map((i) => (
        <motion.polygon
          key={`tear-r-${i}`}
          points="78,50 76,56 80,56"
          fill={BODY} opacity="0.5"
          animate={{ y: [i * 14, i * 14 + 30], opacity: [0.5, 0] }}
          transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.4 + 0.2 }}
        />
      ))}
      {/* Open mouth */}
      <path d="M 38 58 Q 38 72 50 72 Q 62 72 62 58 Z" fill={STROKE} strokeWidth="0" />
      <rect x="39" y="58" width="22" height="3" rx="1" fill="white" />
      <path d="M 40 61 Q 40 72 50 72 Q 60 72 60 61 Z" fill={MOUTH_GREEN} />
    </>
  );
}

function ContentFace() {
  return (
    <>
      {/* Dot eyes */}
      <ellipse cx="38" cy="36" rx="5" ry="5.5" fill={STROKE} />
      <ellipse cx="62" cy="36" rx="5" ry="5.5" fill={STROKE} />
      {/* Green blush cheeks */}
      <ellipse cx="24" cy="46" rx="8" ry="5" fill={BLUSH_GREEN} />
      <ellipse cx="76" cy="46" rx="8" ry="5" fill={BLUSH_GREEN} />
      {/* Cat-like content smile */}
      <path d="M 40 56 Q 44 60 50 58 Q 56 60 60 56" fill="none" stroke={STROKE} strokeWidth="2" strokeLinecap="round" />
    </>
  );
}

function SkepticalStressedFace() {
  return (
    <>
      {/* Angled eyebrows */}
      <line x1="28" y1="28" x2="42" y2="24" stroke={STROKE} strokeWidth="2.5" strokeLinecap="round" />
      <line x1="72" y1="28" x2="58" y2="24" stroke={STROKE} strokeWidth="2.5" strokeLinecap="round" />
      {/* Dot eyes */}
      <ellipse cx="38" cy="38" rx="5" ry="5.5" fill={STROKE} />
      <ellipse cx="62" cy="38" rx="5" ry="5.5" fill={STROKE} />
      {/* Stress lines under eyes */}
      <path d="M 32 44 Q 36 46 40 44" fill="none" stroke={STROKE} strokeWidth="1.5" strokeLinecap="round" />
      <path d="M 60 44 Q 64 46 68 44" fill="none" stroke={STROKE} strokeWidth="1.5" strokeLinecap="round" />
      {/* Small frown/oval mouth */}
      <ellipse cx="50" cy="58" rx="6" ry="4" fill={MOUTH_GREEN} stroke={STROKE} strokeWidth="1.5" />
    </>
  );
}

function TiredHappyFace() {
  return (
    <>
      {/* Small eyebrows */}
      <path d="M 30 28 Q 36 26 42 28" fill="none" stroke={STROKE} strokeWidth="2" strokeLinecap="round" />
      <path d="M 58 28 Q 64 26 70 28" fill="none" stroke={STROKE} strokeWidth="2" strokeLinecap="round" />
      {/* Oval/tired eyes */}
      <ellipse cx="38" cy="38" rx="5" ry="7" fill={STROKE} />
      <ellipse cx="62" cy="38" rx="5" ry="7" fill={STROKE} />
      {/* Gentle smile */}
      <path d="M 38 56 Q 50 64 62 56" fill="none" stroke={STROKE} strokeWidth="2.5" strokeLinecap="round" />
    </>
  );
}

function AnnoyedSkepticalFace() {
  return (
    <>
      {/* Half-lidded eyes - lines through dots */}
      <ellipse cx="38" cy="38" rx="5" ry="5.5" fill={STROKE} />
      <ellipse cx="62" cy="38" rx="5" ry="5.5" fill={STROKE} />
      {/* Eyelids */}
      <rect x="28" y="32" width="20" height="6" fill={FACE} />
      <line x1="28" y1="38" x2="48" y2="38" stroke={STROKE} strokeWidth="2.5" strokeLinecap="round" />
      <rect x="52" y="32" width="20" height="6" fill={FACE} />
      <line x1="52" y1="38" x2="72" y2="38" stroke={STROKE} strokeWidth="2.5" strokeLinecap="round" />
      {/* Frown */}
      <path d="M 38 60 Q 50 54 62 60" fill="none" stroke={STROKE} strokeWidth="2.5" strokeLinecap="round" />
    </>
  );
}

function SillyFace() {
  return (
    <>
      {/* Dot eyes with little bottom curves (lashes) */}
      <ellipse cx="38" cy="36" rx="5" ry="5.5" fill={STROKE} />
      <ellipse cx="62" cy="36" rx="5" ry="5.5" fill={STROKE} />
      <path d="M 33 42 Q 38 45 43 42" fill="none" stroke={STROKE} strokeWidth="1.5" strokeLinecap="round" />
      <path d="M 57 42 Q 62 45 67 42" fill="none" stroke={STROKE} strokeWidth="1.5" strokeLinecap="round" />
      {/* Open smile with tongue */}
      <path d="M 40 56 Q 50 64 60 56" fill="none" stroke={STROKE} strokeWidth="2.5" strokeLinecap="round" />
      {/* Tongue sticking out */}
      <ellipse cx="58" cy="63" rx="5" ry="7" fill={MOUTH_GREEN_LIGHT} stroke={STROKE} strokeWidth="1.5" />
      <line x1="57" y1="64" x2="59" y2="69" stroke="#c4956b" strokeWidth="1" opacity="0.5" />
    </>
  );
}

function AmazedFace() {
  return (
    <>
      {/* Big shiny eyes */}
      <circle cx="36" cy="34" r="12" fill={STROKE} />
      <circle cx="36" cy="32" r="9" fill="white" />
      <circle cx="33" cy="38" r="3" fill="white" />
      <circle cx="64" cy="34" r="12" fill={STROKE} />
      <circle cx="64" cy="32" r="9" fill="white" />
      <circle cx="61" cy="38" r="3" fill="white" />
      {/* Pink blush */}
      <ellipse cx="18" cy="48" rx="8" ry="4" fill={BLUSH_PINK} />
      <ellipse cx="82" cy="48" rx="8" ry="4" fill={BLUSH_PINK} />
      {/* Small open mouth */}
      <ellipse cx="50" cy="60" rx="6" ry="7" fill={STROKE} />
      <rect x="44.5" y="57" width="11" height="4" rx="1" fill="white" />
      <ellipse cx="50" cy="63" rx="5" ry="4" fill={MOUTH_GREEN} />
    </>
  );
}

function TalkingAngryFace() {
  return (
    <>
      {/* Angry V-eyebrows */}
      <line x1="28" y1="30" x2="42" y2="24" stroke={STROKE} strokeWidth="3" strokeLinecap="round" />
      <line x1="72" y1="30" x2="58" y2="24" stroke={STROKE} strokeWidth="3" strokeLinecap="round" />
      {/* Dot eyes */}
      <ellipse cx="38" cy="38" rx="5" ry="5" fill={STROKE} />
      <ellipse cx="62" cy="38" rx="5" ry="5" fill={STROKE} />
      {/* Open angry mouth */}
      <path d="M 36 56 Q 36 70 50 70 Q 64 70 64 56 Z" fill={STROKE} strokeWidth="0" />
      <rect x="37" y="56" width="26" height="4" rx="1" fill="white" />
      <path d="M 38 60 Q 38 70 50 70 Q 62 70 62 60 Z" fill={MOUTH_GREEN} />
      <ellipse cx="54" cy="63" rx="4" ry="3" fill={MOUTH_GREEN_LIGHT} />
    </>
  );
}

function BaselineQuietHappyFace() {
  return (
    <>
      {/* Simple dot eyes */}
      <ellipse cx="38" cy="36" rx="5" ry="5.5" fill={STROKE} />
      <ellipse cx="62" cy="36" rx="5" ry="5.5" fill={STROKE} />
      {/* Gentle smile */}
      <path d="M 38 56 Q 50 64 62 56" fill="none" stroke={STROKE} strokeWidth="2.5" strokeLinecap="round" />
    </>
  );
}

const faceComponents: Record<BmoMood, () => React.JSX.Element> = {
  "sleep": SleepFace,
  "talking-happy": TalkingHappyFace,
  "talking-sad": TalkingSadFace,
  "talking-stressed": TalkingStressedFace,
  "content": ContentFace,
  "skeptical-stressed": SkepticalStressedFace,
  "tired-happy": TiredHappyFace,
  "annoyed-skeptical": AnnoyedSkepticalFace,
  "silly": SillyFace,
  "amazed": AmazedFace,
  "talking-angry": TalkingAngryFace,
  "baseline-quiet-happy": BaselineQuietHappyFace,
};

const moodLabels: Partial<Record<BmoMood, string>> = {
  "sleep": "zzz...",
  "talking-stressed": "so much work...",
  "talking-sad": "overwhelmed...",
  "talking-angry": "hmph!",
  "amazed": "wow!!",
  "silly": "hehe~",
  "content": "~",
};

function BmoFace({ mood }: { mood: BmoMood }) {
  const FaceComponent = faceComponents[mood];

  return (
    <svg viewBox="0 0 100 100" className="w-full h-full">
      {/* Body */}
      <rect
        x="5" y="5" width="90" height="90" rx="16" ry="16"
        fill={BODY}
        stroke="#4a9a82"
        strokeWidth="2"
      />

      {/* Screen / Face area */}
      <rect
        x="12" y="10" width="76" height="56" rx="8" ry="8"
        fill={FACE}
      />

      {/* Face expression */}
      <FaceComponent />

      {/* D-pad */}
      <rect x="25" y="72" width="8" height="16" rx="2" fill={LIMB} />
      <rect x="21" y="76" width="16" height="8" rx="2" fill={LIMB} />

      {/* Buttons */}
      <circle cx="65" cy="76" r="4" fill="#E85D75" />
      <circle cx="75" cy="80" r="4" fill="#4A90D9" />
    </svg>
  );
}

export default function BmoAvatar({ mood, size = 120 }: BmoAvatarProps) {
  const wiggle = mood === "talking-happy" || mood === "talking-sad" || mood === "talking-angry" || mood === "talking-stressed";
  const label = moodLabels[mood];

  return (
    <motion.div
      className="relative"
      style={{ width: size, height: size }}
      animate={
        wiggle
          ? { rotate: [0, -3, 3, -3, 0] }
          : mood === "amazed"
            ? { scale: [1, 1.05, 1] }
            : { rotate: 0 }
      }
      transition={{
        duration: wiggle ? 0.5 : 0.8,
        ease: "easeInOut",
        repeat: wiggle ? Infinity : 0,
        repeatDelay: wiggle ? 0.2 : 0,
      }}
    >
      <BmoFace mood={mood} />
      {label && (
        <motion.div
          className="absolute -bottom-1 left-1/2 -translate-x-1/2 text-xs font-medium text-bmo-dark/60 whitespace-nowrap"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          {label}
        </motion.div>
      )}
    </motion.div>
  );
}
