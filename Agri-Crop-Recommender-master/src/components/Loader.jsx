import React from 'react';
import { motion } from 'framer-motion';

const Loader = ({ t }) => {
  return (
    <div className="flex flex-col items-center justify-center space-y-6">
      <div className="relative w-24 h-24">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 360],
            borderRadius: ["20%", "50%", "20%"]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute inset-0 border-4 border-primary/30 rounded-3xl"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [360, 0],
            borderRadius: ["50%", "20%", "50%"]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute inset-4 border-4 border-primary rounded-2xl"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            animate={{ opacity: [0, 1, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-2 h-2 bg-primary rounded-full"
          />
        </div>
      </div>
      <div className="text-center">
        <h3 className="text-xl font-semibold mb-2">{t.analyzing}</h3>
        <p className="text-gray-400 text-sm animate-pulse">{t.loaderText}</p>
      </div>
    </div>
  );
};

export default Loader;
