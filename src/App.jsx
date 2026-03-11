import React from 'react';
import { ConfigProvider } from 'antd';
import Hero from './components/Hero';
import Abstract from './components/Abstract';
import MainDemo from './components/MainDemo';
import Method from './components/Method';
import AudioDemo from './components/AudioDemo';
import Comparison from './components/Comparison';
import Footer from './components/Footer';
import './App.css';

function App() {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#0066cc',
          borderRadius: 8,
        },
      }}
    >
      <div className="min-h-screen bg-white">
        <Hero />
        <Abstract />
        {/* <Method /> */}
        <MainDemo />
        <AudioDemo />
        <Comparison />
        <Footer />
      </div>
    </ConfigProvider>
  );
}

export default App;

