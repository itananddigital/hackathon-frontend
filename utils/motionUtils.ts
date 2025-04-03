import { MotionValue, useTransform } from "framer-motion";

// Animation variants
export const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
};

export const fadeInUp = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

export const rotateIn = {
  hidden: { opacity: 0, rotate: -90 },
  visible: { opacity: 1, rotate: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export const scaleIn = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.6, type: "spring", bounce: 0.4 } },
};

export const buttonHover = {
  hover: { scale: 1.1, transition: { type: "spring", stiffness: 300 } },
  tap: { scale: 0.95 },
};

export const pulse = {
  animate: { scale: [1, 1.05, 1], transition: { duration: 2, repeat: Infinity, ease: "easeInOut" } },
};

// Utility function for parallax effect
export const createParallaxEffect = (scrollYProgress: MotionValue<number>, range: [number, number]) => {
  return {
    yForeground: useTransform(scrollYProgress, [0, 1], [-range[0], range[0]]), // Foreground movement
    yBackground: useTransform(scrollYProgress, [0, 1], [-range[1], range[1]]), // Background movement
  };
};

export const textFadeIn = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

export const headingVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.05 },
  },
};

export const letterVariants = {
  hidden: { opacity: 0, y: 20, rotate: -10 },
  visible: { opacity: 1, y: 0, rotate: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

export const backgroundVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 0.3, scale: 1, transition: { duration: 1.5, ease: "easeOut" } },
};

// Animation variants for the "Why Join" section
export const cardStagger = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.3 },
  },
};

export const cardFlip = {
  hidden: { opacity: 0, rotateY: 90, scale: 0.8 },
  visible: {
    opacity: 1,
    rotateY: 0,
    scale: 1,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};