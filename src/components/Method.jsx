import React from 'react';
import { motion } from 'framer-motion';
import { Timeline } from 'antd';
import { CheckCircleOutlined } from '@ant-design/icons';

const Method = () => {
  const methodSteps = [
    {
      title: 'Data Preprocessing',
      description: 'Collect and preprocess large-scale music datasets, including MIDI files, audio recordings, and symbolic representations.'
    },
    {
      title: 'Model Architecture',
      description: 'Design transformer-based neural network with hierarchical attention mechanisms for capturing musical structures.'
    },
    {
      title: 'Training Strategy',
      description: 'Implement progressive training with curriculum learning to improve model convergence and generation quality.'
    },
    {
      title: 'Conditioning Mechanisms',
      description: 'Integrate lightweight conditioning modules for controllable music generation based on user-specified parameters.'
    },
    {
      title: 'Evaluation & Fine-tuning',
      description: 'Conduct comprehensive evaluation using both objective metrics and subjective user studies.'
    }
  ];

  return (
    <motion.div 
      className="max-w-6xl mx-auto px-6 md:px-12 py-12 md:py-16"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
    >
      <h2 className="text-4xl md:text-5xl font-semibold text-center mb-16 text-gray-900">
        Methodology
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="bg-white rounded-3xl p-8 h-full border border-gray-200">
            <h3 className="text-2xl font-semibold mb-6 text-gray-900">
              Architecture Overview
            </h3>
            <p className="text-gray-700 leading-relaxed text-lg">
              Our model employs a multi-layer transformer architecture with specialized 
              attention mechanisms designed for musical sequence modeling. The architecture 
              includes dedicated modules for melody, harmony, and rhythm processing, allowing 
              for fine-grained control over different musical aspects.
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="bg-white rounded-3xl p-8 h-full border border-gray-200">
            <h3 className="text-2xl font-semibold mb-6 text-gray-900">
              Training Process
            </h3>
            <p className="text-gray-700 leading-relaxed text-lg">
              We utilize a two-stage training procedure: first, pre-training on large-scale 
              music datasets to learn general musical patterns, followed by fine-tuning with 
              specific conditioning signals. This approach ensures both musical quality and 
              controllability of the generated outputs.
            </p>
          </div>
        </motion.div>
      </div>

      <div className="bg-gray-50 rounded-3xl p-8 md:p-12">
        <h3 className="text-2xl font-semibold mb-8 text-gray-900">
          Pipeline Steps
        </h3>
        <Timeline
          items={methodSteps.map((step, index) => ({
            dot: <CheckCircleOutlined style={{ fontSize: '18px' }} />,
            color: 'black',
            children: (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="pb-4"
              >
                <h4 className="font-semibold text-gray-900 mb-2 text-lg">{step.title}</h4>
                <p className="text-gray-600 text-base leading-relaxed">{step.description}</p>
              </motion.div>
            )
          }))}
        />
      </div>
    </motion.div>
  );
};

export default Method;
