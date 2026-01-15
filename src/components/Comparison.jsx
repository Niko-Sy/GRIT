import React from 'react';
import { motion } from 'framer-motion';
import { Table, Tag } from 'antd';

const comparisonData = [
  {
    key: '1',
    model: 'Our Model',
    musicality: 9.2,
    coherence: 8.9,
    diversity: 8.7,
    highlight: true
  },
  {
    key: '2',
    model: 'Music Transformer',
    musicality: 7.8,
    coherence: 7.5,
    diversity: 7.2,
    highlight: false
  },
  {
    key: '3',
    model: 'MuseGAN',
    musicality: 7.2,
    coherence: 6.9,
    diversity: 8.1,
    highlight: false
  },
  {
    key: '4',
    model: 'MusicVAE',
    musicality: 7.5,
    coherence: 7.1,
    diversity: 7.8,
    highlight: false
  }
];

const columns = [
  {
    title: 'Model',
    dataIndex: 'model',
    key: 'model',
    render: (text, record) => (
      record.highlight ? 
      <span className="font-semibold text-primary">{text}</span> : 
      <span>{text}</span>
    ),
  },
  {
    title: 'Musicality',
    dataIndex: 'musicality',
    key: 'musicality',
    render: (score, record) => (
      <Tag color={record.highlight ? 'blue' : 'default'}>
        {score}/10
      </Tag>
    ),
    sorter: (a, b) => a.musicality - b.musicality,
  },
  {
    title: 'Coherence',
    dataIndex: 'coherence',
    key: 'coherence',
    render: (score, record) => (
      <Tag color={record.highlight ? 'blue' : 'default'}>
        {score}/10
      </Tag>
    ),
    sorter: (a, b) => a.coherence - b.coherence,
  },
  {
    title: 'Diversity',
    dataIndex: 'diversity',
    key: 'diversity',
    render: (score, record) => (
      <Tag color={record.highlight ? 'blue' : 'default'}>
        {score}/10
      </Tag>
    ),
    sorter: (a, b) => a.diversity - b.diversity,
  },
];

const Comparison = () => {
  return (
    <motion.div 
      className="max-w-6xl mx-auto px-6 md:px-12 py-12 md:py-16"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
    >
      <h2 className="text-4xl md:text-5xl font-semibold text-center mb-16 text-gray-900">
        Model Comparison
      </h2>
      
      <div className="bg-white rounded-3xl p-8 md:p-12 border border-gray-200">
        <p className="text-gray-700 mb-8 text-lg leading-relaxed">
          Comparative evaluation of different music generation models based on user studies 
          and objective metrics. Our model demonstrates superior performance across multiple dimensions.
        </p>
        
        <Table 
          columns={columns} 
          dataSource={comparisonData} 
          pagination={false}
          className="comparison-table"
          rowClassName={(record) => record.highlight ? 'bg-blue-50' : ''}
        />

        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
          <motion.div 
            className="text-center p-8 bg-gray-50 rounded-3xl"
            whileHover={{ scale: 1.03, backgroundColor: '#f9fafb' }}
            transition={{ duration: 0.3 }}
          >
            <div className="text-5xl font-semibold text-gray-900 mb-3">95%</div>
            <div className="text-base text-gray-600">User Preference</div>
          </motion.div>
          <motion.div 
            className="text-center p-8 bg-gray-50 rounded-3xl"
            whileHover={{ scale: 1.03, backgroundColor: '#f9fafb' }}
            transition={{ duration: 0.3 }}
          >
            <div className="text-5xl font-semibold text-gray-900 mb-3">8.9/10</div>
            <div className="text-base text-gray-600">Overall Quality</div>
          </motion.div>
          <motion.div 
            className="text-center p-8 bg-gray-50 rounded-3xl"
            whileHover={{ scale: 1.03, backgroundColor: '#f9fafb' }}
            transition={{ duration: 0.3 }}
          >
            <div className="text-5xl font-semibold text-gray-900 mb-3">2.3x</div>
            <div className="text-base text-gray-600">Faster Training</div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default Comparison;
