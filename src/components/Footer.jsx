import React from 'react';
import { motion } from 'framer-motion';

const Footer = () => {
  return (
    <motion.footer 
      className="bg-gray-50 border-t border-gray-200 py-4 mt-4"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
    >
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row justify-between items-center mb-2">
          <div className="mb-2 md:mb-0">
            <p className="text-gray-700 text-base font-medium mb-1">
              GRIT: Structure-Enhanced Modeling for Multi-Track Symbolic Music Generation
            </p>
            <p className="text-gray-500 text-sm">
              © 2026 All rights reserved
            </p>
          </div>
          {/* <div className="flex gap-8">
            <a 
              href="#" 
              className="text-gray-600 hover:text-gray-900 transition-colors duration-300 text-sm"
            >
              Contact
            </a>
            <a 
              href="#" 
              className="text-gray-600 hover:text-gray-900 transition-colors duration-300 text-sm"
            >
              Privacy Policy
            </a>
            <a 
              href="#" 
              className="text-gray-600 hover:text-gray-900 transition-colors duration-300 text-sm"
            >
              Terms of Use
            </a>
          </div> */}
        </div>
        {/* <div className="text-center md:text-left">
          <p className="text-gray-500 text-xs">
            Built with React, Tailwind CSS, and Ant Design
          </p>
        </div> */}
      </div>
    </motion.footer>
  );
};

export default Footer;
