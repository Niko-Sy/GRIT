import React from 'react';
import { motion } from 'framer-motion';
import { Button } from 'antd';
import { GithubOutlined, FileTextOutlined, ExperimentOutlined } from '@ant-design/icons';

const Hero = () => {
  return (
    <motion.div 
      className="text-center py-12 md:py-20 px-6 md:px-12 max-w-7xl mx-auto"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <motion.h1 
        className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-gray-900 tracking-tight"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        style={{ lineHeight: '1.05' }}
      >
        GRIT: Multi-track Music Generation 
      </motion.h1>
      <motion.h2 
        className="text-2xl md:text-3xl lg:text-4xl font-normal mb-12 text-gray-600 max-w-4xl mx-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.6 }}
      >
        Based on Graph-RIPO Hybrid Attention and Attribute Interaction
      </motion.h2>
      
      <motion.div 
        className="text-base md:text-lg text-gray-500 mb-8 max-w-3xl mx-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.6 }}
      >
        <p className="mb-3">
          <span className="font-normal">Yichen Shen<sup>1</sup></span> &nbsp;
          <span className="font-normal">Yi Shen<sup>1</sup></span> &nbsp;
          <span className="font-normal">Xing Tang<sup>2</sup></span> &nbsp;
          <span className="font-normal">Liaotao <sup>1</sup></span>
        </p>
        <p className="text-sm text-gray-400">
          Wuhan University Of Technology <sup>1</sup>&nbsp;&nbsp;
        </p>
      </motion.div>

      <motion.div 
        className="flex flex-wrap justify-center gap-4 mt-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.6 }}
      >
        <Button 
          type="primary" 
          size="large" 
          icon={<FileTextOutlined />}
          className="bg-black hover:bg-gray-800 border-0 rounded-full px-8 h-12 text-base font-medium"
        >
          Read Paper
        </Button>
        <Button 
          size="large" 
          icon={<GithubOutlined />}
          className="border-2 border-gray-300 hover:border-black hover:text-black rounded-full px-8 h-12 text-base font-medium"
        >
          GitHub
        </Button>
        <Button 
          size="large" 
          icon={<ExperimentOutlined />}
          className="border-2 border-gray-300 hover:border-black hover:text-black rounded-full px-8 h-12 text-base font-medium"
        >
          Try Demo
        </Button>
      </motion.div>
    </motion.div>
  );
};

export default Hero;
