import React from 'react';
import { Wallet, TrendingUp, Ticket, Bell } from 'lucide-react';

export default function Highlights() {
  // Simple demo values and derived metrics
  const monthlyIncome = 2000;
  const targetSavings = 600;
  const recommendedWeeklyBudget = Math.round(((monthlyIncome - targetSavings) / 4));
  const spentThisWeek = 410; // example
  const spentThisMonth = 1385; // example
  const couponsAvailable = 7;

  const budgetLeft = Math.max(0, recommendedWeeklyBudget - spentThisWeek);
  const savingsProgress = Math.min(100, Math.round((targetSavings / monthlyIncome) * 100));

  const alertMessage = budgetLeft < 50
    ? "You’re close to exceeding your weekly limit!"
    : "You’re on track — keep going!";

  return (
    <section id="features" className="relative mx-auto -mt-16 max-w-6xl px-6">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card icon={<Wallet className="h-5 w-5" />} title="Weekly Budget Left" value={`$${budgetLeft}`}
          caption={`Budget: $${recommendedWeeklyBudget}/wk`} color="from-emerald-500/20 to-emerald-500/0" />
        <Card icon={<TrendingUp className="h-5 w-5" />} title="Total Spent This Month" value={`$${spentThisMonth}`}
          caption={`Savings target: $${targetSavings} (${savingsProgress}%)`} color="from-blue-500/20 to-blue-500/0" />
        <Card icon={<Ticket className="h-5 w-5" />} title="Coupons Available" value={couponsAvailable}
          caption="Across Food, Shopping & Travel" color="from-violet-500/20 to-violet-500/0" />
        <Card icon={<Bell className="h-5 w-5" />} title="Smart Alert" value=""
          caption={alertMessage} color="from-amber-500/20 to-amber-500/0" />
      </div>
    </section>
  );
}

function Card({ icon, title, value, caption, color }) {
  return (
    <div className="relative overflow-hidden rounded-xl border border-white/10 bg-slate-900/60 p-5 text-white backdrop-blur">
      <div className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${color}`} />
      <div className="relative z-10 flex items-start justify-between gap-4">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2 text-white/80">
            {icon}
            <span className="text-sm font-medium">{title}</span>
          </div>
          <div className="text-2xl font-semibold tracking-tight">{value}</div>
          <div className="text-xs text-white/60">{caption}</div>
        </div>
      </div>
    </div>
  );
}
