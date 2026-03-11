import React from 'react';
import { motion } from 'framer-motion';
import { Badge } from 'antd';
import sample1 from '../assets/inference_0.mp3';

const audioSamples = [
  {
    id: 1,
    title: 'Sample 1: Classical Style',
    description: 'Multitrack Piano composition with rich harmonies and dynamics',
    audioUrl: sample1,
    tag: 'Classical',
    highlight: false
  },
  {
    id: 2,
    title: 'Sample 2: Jazz Fusion',
    description: 'Jazz-inspired piece with complex chord progressions',
    audioUrl: '#',
    tag: 'Jazz',
    highlight: false
  },
  {
    id: 3,
    title: 'Sample 3: Pop Music',
    description: 'Contemporary pop arrangement with catchy melody',
    audioUrl: '#',
    tag: 'Pop',
    highlight: false
  },
  {
    id: 4,
    title: 'Sample 4: Electronic',
    description: 'Electronic music with synthesized instruments',
    audioUrl: '#',
    tag: 'Electronic',
    highlight: false
  },
  {
    id: 5,
    title: 'Sample 5: Rock',
    description: 'Energetic rock composition with guitar and drums',
    audioUrl: '#',
    tag: 'Rock',
    highlight: false
  },
  {
    id: 6,
    title: 'Sample 6: Ambient',
    description: 'Atmospheric ambient soundscape',
    audioUrl: '#',
    tag: 'Ambient',
    highlight: false
  }
];

const AudioDemo = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-6 md:px-12 py-12 md:py-16">
      <motion.h2 
        className="text-4xl md:text-5xl font-semibold text-center mb-16 text-gray-900"
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        More Audio Demonstrations
      </motion.h2>

      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {audioSamples.map((sample) => (
          <motion.div key={sample.id} variants={itemVariants} className="h-full">
            <div 
              className={`rounded-3xl p-6 transition-all duration-300 h-full flex flex-col ${
                sample.highlight ? 'bg-gray-800 text-white' : 'bg-white border border-gray-200'
              }`}
            >
              <div className="flex items-start justify-between mb-4">
                <h3 className={`text-xl font-semibold ${
                  sample.highlight ? 'text-white' : 'text-gray-900'
                }`}>
                  {sample.title}
                </h3>
                <Badge 
                  color={sample.highlight ? 'white' : 'black'} 
                  text={sample.tag }
                  className="ml-2 flex-shrink-0"
                />
              </div>
              <p className={`text-base mb-6 leading-relaxed line-clamp-2 flex-grow ${
                sample.highlight ? 'text-gray-300' : 'text-gray-600'
              }`}>
                {sample.description}
              </p>
              <div className="mt-auto">
                <audio 
                  controls 
                  className="w-full rounded-xl"
                  style={{ height: '48px' }}
                >
                  <source src={sample.audioUrl} type="audio/mpeg" />
                  Your browser does not support the audio element.
                </audio>
                {sample.highlight && (
                  <div className="mt-3 text-sm text-gray-300 font-medium">
                    ★ Featured Sample
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default AudioDemo;
