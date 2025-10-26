import React from 'react';
import HeroSection from './components/HeroSection';
import Highlights from './components/Highlights';
import DashboardCharts from './components/DashboardCharts';
import Coupons from './components/Coupons';

function App() {
  return (
    <div className="min-h-screen bg-slate-950 font-inter text-white">
      <HeroSection />
      <Highlights />
      <DashboardCharts />
      <Coupons />

      <footer className="mx-auto mt-16 max-w-6xl px-6 pb-16 text-center text-xs text-white/50">
        SAVE-IOUR — Save smart, spend wisely, and earn while you do it.
      </footer>
    </div>
  );
}

export default App;
