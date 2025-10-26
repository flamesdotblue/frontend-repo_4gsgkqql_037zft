import React, { useMemo } from 'react';
import { PieChart, Calendar, Trophy } from 'lucide-react';

export default function DashboardCharts() {
  // Sample daily spending for a month (30 days)
  const daily = [12, 35, 22, 18, 40, 28, 19, 15, 38, 44, 23, 31, 26, 20, 17, 29, 33, 24, 21, 36, 27, 30, 25, 22, 18, 34, 28, 20, 16, 39];

  // Sample categories
  const categories = [
    { label: 'Food', value: 420, color: '#34d399' },
    { label: 'Rent', value: 700, color: '#60a5fa' },
    { label: 'Subscriptions', value: 120, color: '#a78bfa' },
    { label: 'Shopping', value: 260, color: '#f59e0b' },
    { label: 'Travel', value: 180, color: '#f472b6' },
  ];

  const totalCategory = useMemo(() => categories.reduce((sum, c) => sum + c.value, 0), [categories]);

  // Build pie arcs as simple proportional slices
  const pieData = useMemo(() => {
    let cumulative = 0;
    return categories.map((c) => {
      const start = cumulative / totalCategory;
      cumulative += c.value;
      const end = cumulative / totalCategory;
      return { ...c, start, end };
    });
  }, [categories, totalCategory]);

  // Weekly target tracker (allowed vs actual)
  const weeklyAllowed = 350;
  const weeklyActual = 410;
  const weeklyPct = Math.min(100, Math.round((weeklyActual / weeklyAllowed) * 100));

  return (
    <section id="dashboard" className="mx-auto mt-10 max-w-6xl px-6">
      <div className="mb-6 flex items-center gap-3 text-white/90">
        <Trophy className="h-5 w-5 text-emerald-400" />
        <p className="text-sm">You’re on track to save <span className="font-semibold text-white">$600</span> this month 🎯</p>
      </div>
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Line chart */}
        <div className="col-span-2 rounded-xl border border-white/10 bg-slate-900/60 p-5 text-white">
          <div className="mb-4 flex items-center gap-2">
            <Calendar className="h-5 w-5 text-blue-300" />
            <h3 className="text-sm font-semibold text-white/90">Daily Spending (This Month)</h3>
          </div>
          <LineChart data={daily} />
        </div>

        {/* Pie chart */}
        <div className="rounded-xl border border-white/10 bg-slate-900/60 p-5 text-white">
          <div className="mb-4 flex items-center gap-2">
            <PieChart className="h-5 w-5 text-violet-300" />
            <h3 className="text-sm font-semibold text-white/90">Spending by Category</h3>
          </div>
          <Pie categories={pieData} />
          <div className="mt-4 grid grid-cols-2 gap-2 text-xs">
            {categories.map((c) => (
              <div key={c.label} className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full" style={{ backgroundColor: c.color }} />
                <span className="text-white/80">{c.label}</span>
                <span className="ml-auto text-white/60">${c.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Weekly target tracker */}
      <div className="mt-6 rounded-xl border border-white/10 bg-slate-900/60 p-5 text-white">
        <div className="mb-3 flex items-center justify-between text-sm">
          <span className="text-white/90">Weekly Target Tracker</span>
          <span className="text-white/70">Allowed: ${weeklyAllowed} • Actual: ${weeklyActual}</span>
        </div>
        <div className="h-3 w-full overflow-hidden rounded-full bg-white/10">
          <div
            className={`h-full rounded-full ${weeklyPct <= 100 ? 'bg-emerald-400' : 'bg-rose-400'}`}
            style={{ width: `${Math.min(100, weeklyPct)}%` }}
          />
        </div>
        <div className="mt-2 text-right text-xs text-white/60">{weeklyPct}% of weekly budget used</div>
      </div>
    </section>
  );
}

function LineChart({ data }) {
  const width = 700;
  const height = 220;
  const padding = 24;
  const maxVal = Math.max(...data) * 1.2;
  const stepX = (width - padding * 2) / (data.length - 1);
  const points = data
    .map((d, i) => {
      const x = padding + i * stepX;
      const y = height - padding - (d / maxVal) * (height - padding * 2);
      return `${x},${y}`;
    })
    .join(' ');

  const gradientId = 'lineGradient';

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="h-56 w-full">
      <defs>
        <linearGradient id={gradientId} x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="#34d399" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#34d399" stopOpacity="0.05" />
        </linearGradient>
      </defs>
      {/* Grid */}
      <g stroke="rgba(255,255,255,0.08)" strokeWidth="1">
        {Array.from({ length: 4 }).map((_, i) => (
          <line key={i} x1={padding} x2={width - padding} y1={padding + i * ((height - padding * 2) / 3)} y2={padding + i * ((height - padding * 2) / 3)} />
        ))}
      </g>
      {/* Area fill */}
      <polyline points={`${padding},${height - padding} ${points} ${width - padding},${height - padding}`} fill={`url(#${gradientId})`} stroke="none" />
      {/* Line */}
      <polyline points={points} fill="none" stroke="#34d399" strokeWidth="2.5" />
      {/* Dots */}
      {data.map((d, i) => {
        const x = padding + i * stepX;
        const y = height - padding - (d / maxVal) * (height - padding * 2);
        return <circle key={i} cx={x} cy={y} r={2} fill="#34d399" />;
      })}
    </svg>
  );
}

function Pie({ categories }) {
  const size = 160;
  const center = size / 2;
  const radius = size / 2 - 6;

  const arcs = categories.map((c, idx) => {
    const startAngle = c.start * 2 * Math.PI - Math.PI / 2;
    const endAngle = c.end * 2 * Math.PI - Math.PI / 2;
    const largeArc = endAngle - startAngle > Math.PI ? 1 : 0;

    const startX = center + radius * Math.cos(startAngle);
    const startY = center + radius * Math.sin(startAngle);
    const endX = center + radius * Math.cos(endAngle);
    const endY = center + radius * Math.sin(endAngle);

    const d = [
      `M ${center} ${center}`,
      `L ${startX} ${startY}`,
      `A ${radius} ${radius} 0 ${largeArc} 1 ${endX} ${endY}`,
      'Z',
    ].join(' ');

    return <path key={idx} d={d} fill={c.color} opacity={0.9} />;
  });

  return (
    <div className="flex items-center justify-center">
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <g>{arcs}</g>
        {/* Inner cutout for donut */}
        <circle cx={center} cy={center} r={radius - 22} fill="#0f172a" />
        <text x="50%" y="50%" dominantBaseline="middle" textAnchor="middle" fill="#e2e8f0" fontSize="14" fontWeight="600">
          Expenses
        </text>
      </svg>
    </div>
  );
}
