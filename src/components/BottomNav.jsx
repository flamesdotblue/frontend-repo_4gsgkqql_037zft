import React from 'react';
import { Home, Ticket, Trophy, Settings } from 'lucide-react';

export default function BottomNav() {
  const items = [
    { label: 'Dashboard', icon: Home, href: '#dashboard' },
    { label: 'Coupons', icon: Ticket, href: '#features' },
    { label: 'Rewards', icon: Trophy, href: '#dashboard' },
    { label: 'Profile', icon: Settings, href: '#profile' },
  ];

  return (
    <nav className="sticky bottom-4 z-20 mx-auto max-w-md rounded-2xl border border-white/10 bg-slate-900/80 px-2 py-2 text-white backdrop-blur md:hidden">
      <ul className="grid grid-cols-4">
        {items.map((it) => (
          <li key={it.label} className="flex items-center justify-center">
            <a href={it.href} className="flex flex-col items-center gap-1 rounded-xl px-3 py-2 text-xs text-white/80 hover:bg-white/5">
              <it.icon className="h-5 w-5" />
              {it.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
