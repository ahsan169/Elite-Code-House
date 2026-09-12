"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function LoadingScreen() {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setIsLoading(false), 300);
          return 100;
        }
        return prev + Math.floor(Math.random() * 15) + 5;
      });
    }, 100);

    return () => clearInterval(interval);
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-[100] bg-dark-300 flex items-center justify-center"
        >
          <div className="relative">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="text-center"
            >
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
                Elite<span className="text-primary-500">Code</span>
              </h1>
              <p className="text-white/60 text-sm">Building Digital Excellence</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="absolute -bottom-16 right-0"
            >
              <span className="text-6xl md:text-8xl font-bold text-white/10">
                {Math.min(progress, 100)}%
              </span>
            </motion.div>
          </div>

          <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/10">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${Math.min(progress, 100)}%` }}
              className="h-full bg-primary-500"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
