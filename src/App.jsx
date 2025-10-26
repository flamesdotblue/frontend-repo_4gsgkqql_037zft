import React from 'react';
import HeroSection from './components/HeroSection';
import Highlights from './components/Highlights';
import DashboardCharts from './components/DashboardCharts';
import BottomNav from './components/BottomNav';

function App() {
  return (
    <div className="min-h-screen bg-slate-950 font-inter text-white">
      <HeroSection />
      <Highlights />
      <DashboardCharts />

      {/* Simple coupons & rewards section preview */}
      <section className="mx-auto mt-10 max-w-6xl px-6" aria-labelledby="coupons-rewards">
        <h2 id="coupons-rewards" className="mb-4 text-lg font-semibold text-white/90">Coupons & Rewards</h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <div className="rounded-xl border border-white/10 bg-slate-900/60 p-5">
            <div className="text-sm text-white/80">Coupons expiring soon</div>
            <div className="mt-2 text-2xl font-semibold">3</div>
            <p className="mt-2 text-xs text-white/60">Never miss a deal — we’ll remind you before they expire.</p>
          </div>
          <div className="rounded-xl border border-white/10 bg-slate-900/60 p-5">
            <div className="text-sm text-white/80">Earned Points</div>
            <div className="mt-2 text-2xl font-semibold">250</div>
            <button className="mt-3 w-full rounded-lg bg-emerald-500 px-4 py-2 text-sm font-semibold text-slate-900 hover:bg-emerald-400">Redeem Rewards</button>
          </div>
          <div className="rounded-xl border border-white/10 bg-slate-900/60 p-5">
            <div className="text-sm text-white/80">AI Insights</div>
            <p className="mt-2 text-sm text-white/70">You spent 20% more on dining this month than usual. Consider a $25 cut on subscriptions to reach your goal faster.</p>
          </div>
        </div>
      </section>

      <div className="h-24" />
      <div className="fixed inset-x-0 bottom-0 flex items-end justify-center md:hidden">
        <BottomNav />
      </div>

      <footer className="mx-auto mt-16 max-w-6xl px-6 pb-16 text-center text-xs text-white/50">
        SAVE-IOUR — Save smart, spend wisely, and earn while you do it.
      </footer>
    </div>
  );
}

export default App;
