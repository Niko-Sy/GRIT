import React from 'react';
import { motion } from 'framer-motion';

const Abstract = () => {
  return (
    <motion.div 
      className="max-w-5xl mx-auto px-6 md:px-12 py-12 md:py-8"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
    >
      <div className="bg-gray-50 rounded-3xl p-8 md:p-16">
        <h2 className="text-3xl md:text-4xl font-semibold mb-8 text-gray-900">
          Abstract
        </h2>
        <p className="text-gray-700 leading-relaxed text-lg md:text-xl mb-6" style={{ lineHeight: '1.6' }}>
          We present a novel approach to AI-driven music generation using advanced neural network 
          architectures. Our model leverages transformer-based architectures combined with 
          hierarchical attention mechanisms to generate coherent and expressive musical compositions. 
          The system can condition on various musical attributes including chord progressions, 
          rhythm patterns, and melodic contours.
        </p>
        <p className="text-gray-700 leading-relaxed text-lg md:text-xl" style={{ lineHeight: '1.6' }}>
          Through extensive experiments on multiple music datasets, we demonstrate that our approach 
          achieves state-of-the-art performance in generating high-quality, musically coherent sequences 
          while maintaining controllability over key musical parameters. Our framework introduces 
          lightweight conditioning mechanisms that allow fine-grained control over generated music 
          without requiring extensive computational resources.
        </p>
      </div>
    </motion.div>
  );
};

export default Abstract;
