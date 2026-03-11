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
          Existing symbolic music generation models have achieved substantial progress in single-track settings, yet still face key modeling bottlenecks in multi-track generation. 
          On the one hand, relative-attribute modeling approaches typically rely on linear sequence indices to characterize relations among discrete events, making it difficult to capture nonlinear interactions among concurrent events across streams. 
          On the other hand, mainstream representations often handle multi-attribute event descriptions by summing attribute embeddings, which introduces information blurring and undermines feature separability, thereby weakening the modeling of stream-identity-related behavioral patterns and multi-attribute compositional patterns. 
        </p>
        <p className="text-gray-700 leading-relaxed text-lg md:text-xl" style={{ lineHeight: '1.6' }}>
          To address these challenges, we propose GRIT, a structure-enhanced modeling approach for multi-stream symbolic sequence generation.
          GRIT injects graph-induced relational biases into relative attention computation, capturing complex dependencies among concurrent events without relying on a single linear distance assumption, thus mitigating the limitations of linear relative relations in multi-stream settings. 
          Meanwhile, GRIT explicitly models dependencies among sequence attributes under global sequence context, strengthening the joint modeling of cross-attribute dependencies and improving the characterization of stream-identity-related features. 
          Experiments on multiple large-scale symbolic music datasets show that GRIT outperforms state-of-the-art baselines on key metrics, including chord progression similarity, groove consistency, and pitch-class entropy, validating the effectiveness of the proposed structured relational modeling strategy for multi-track music generation. 
          Given the generality of modeling concurrent structures and capturing multi-attribute interactions, our approach may also benefit other structured generative tasks beyond multi-track symbolic music generation.
        </p>
      </div>
    </motion.div>
  );
};

export default Abstract;
