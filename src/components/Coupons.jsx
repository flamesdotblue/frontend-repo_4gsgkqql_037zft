import React, { useMemo, useState } from 'react';
import { Ticket, ExternalLink, Copy, Star, Heart, CheckCircle, X, Clock } from 'lucide-react';

// Demo coupons array to mirror the proposed backend structure
const demoCoupons = [
  {
    id: 'coupon123',
    title: '20% off on Uber Eats',
    brand: 'Uber Eats',
    code: 'SAVE20',
    expiry: '2025-11-15',
    deepLink: 'ubereats://promos?code=SAVE20',
    fallbackUrl: 'https://www.ubereats.com/promo/SAVE20',
    logo: 'https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/ubereats.svg',
    category: 'Food',
  },
  {
    id: 'coupon456',
    title: '15% off on Amazon',
    brand: 'Amazon',
    code: 'SAVE15',
    expiry: '2025-12-01',
    deepLink: 'amazon://coupon/apply?code=SAVE15',
    fallbackUrl: 'https://www.amazon.com/gp/promotions',
    logo: 'https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/amazon.svg',
    category: 'Shopping',
  },
  {
    id: 'coupon789',
    title: '25% off on DoorDash',
    brand: 'DoorDash',
    code: 'DASH25',
    expiry: '2025-10-30',
    deepLink: 'doordash://promos?code=DASH25',
    fallbackUrl: 'https://www.doordash.com',
    logo: 'https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/doordash.svg',
    category: 'Food',
  },
];

export default function Coupons() {
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState(null);
  const [inAppUrl, setInAppUrl] = useState('');
  const [rating, setRating] = useState({}); // { [couponId]: 1-5 }
  const [favorites, setFavorites] = useState({}); // { [couponId]: true }
  const [used, setUsed] = useState({}); // { [couponId]: true }

  const filtered = useMemo(() => {
    const q = query.toLowerCase();
    return demoCoupons.filter(
      (c) => c.title.toLowerCase().includes(q) || c.brand.toLowerCase().includes(q) || c.category.toLowerCase().includes(q)
    );
  }, [query]);

  const copyCode = async (code) => {
    try {
      await navigator.clipboard.writeText(code);
    } catch {}
  };

  const toggleFavorite = (id) => setFavorites((f) => ({ ...f, [id]: !f[id] }));

  const markUsed = (id) => setUsed((u) => ({ ...u, [id]: true }));

  const handleUseNow = (coupon) => {
    // Try opening app deep link, then fall back to in-app browser after a short delay
    const timeout = setTimeout(() => {
      setInAppUrl(coupon.fallbackUrl);
    }, 1200);

    try {
      // window.open can be blocked by pop-up policies; using location assignment is more reliable
      window.location.href = coupon.deepLink;
    } catch {
      clearTimeout(timeout);
      setInAppUrl(coupon.fallbackUrl);
    }

    // Optimistically mark as used when returning
    setTimeout(() => markUsed(coupon.id), 3000);
  };

  return (
    <section className="mx-auto mt-10 max-w-6xl px-6" aria-labelledby="coupons">
      <div className="mb-4 flex items-center justify-between gap-3">
        <h2 id="coupons" className="text-lg font-semibold text-white/90">Smart Coupons</h2>
        <div className="flex items-center gap-2 text-xs text-white/60">
          <Clock className="h-4 w-4" />
          Reminders arrive 2–3 days before expiry
        </div>
      </div>

      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search coupons by brand or category"
          className="w-full rounded-lg border border-white/10 bg-slate-900/60 px-4 py-2 text-sm text-white placeholder-white/40 outline-none focus:border-emerald-400/60 sm:max-w-sm"
        />
        <div className="text-xs text-white/60">Found {filtered.length} coupons</div>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {filtered.map((c) => (
          <article key={c.id} className="group relative overflow-hidden rounded-xl border border-white/10 bg-slate-900/60 p-5 text-white">
            <div className="mb-3 flex items-center gap-3">
              <div className="h-8 w-8 shrink-0 overflow-hidden rounded bg-white/5 p-1">
                {/* external SVG logos may be monochrome; this is illustrative */}
                <img src={c.logo} alt={c.brand} className="h-full w-full object-contain" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-white/90">{c.title}</h3>
                <p className="text-xs text-white/60">Expires {new Date(c.expiry).toLocaleDateString()}</p>
              </div>
              <button
                className={`ml-auto rounded-full p-2 ${favorites[c.id] ? 'text-rose-400' : 'text-white/50'} hover:bg-white/5`}
                aria-label="Favorite"
                onClick={() => toggleFavorite(c.id)}
              >
                <Heart className="h-4 w-4" />
              </button>
            </div>

            <div className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-2">
              <Ticket className="h-4 w-4 text-emerald-300" />
              <code className="text-sm tracking-wide">{c.code}</code>
              <button onClick={() => copyCode(c.code)} className="ml-auto inline-flex items-center gap-1 rounded-md bg-white/10 px-2 py-1 text-xs hover:bg-white/15">
                <Copy className="h-3.5 w-3.5" /> Copy
              </button>
            </div>

            <div className="mt-3 flex items-center gap-2 text-xs text-white/60">
              {used[c.id] ? (
                <span className="inline-flex items-center gap-1 text-emerald-300">
                  <CheckCircle className="h-3.5 w-3.5" /> Marked as used
                </span>
              ) : (
                <span>Not used yet</span>
              )}
            </div>

            <div className="mt-4 flex items-center gap-2">
              <button
                onClick={() => setSelected(c)}
                className="flex-1 rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium hover:bg-white/10"
              >
                Details
              </button>
              <button
                onClick={() => handleUseNow(c)}
                className="flex-1 rounded-lg bg-emerald-500 px-4 py-2 text-sm font-semibold text-slate-900 hover:bg-emerald-400"
              >
                Use Now
              </button>
            </div>

            <div className="mt-3 flex items-center gap-1 text-xs text-white/60">
              <span>Rate:</span>
              {[1, 2, 3, 4, 5].map((s) => (
                <button
                  key={s}
                  onClick={() => setRating((r) => ({ ...r, [c.id]: s }))}
                  className={`p-1 ${rating[c.id] >= s ? 'text-amber-400' : 'text-white/30'}`}
                  aria-label={`Rate ${s}`}
                >
                  <Star className="h-4 w-4" />
                </button>
              ))}
            </div>
          </article>
        ))}
      </div>

      {/* Detail modal */}
      {selected && (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/60 p-4">
          <div className="w-full max-w-lg overflow-hidden rounded-2xl border border-white/10 bg-slate-900 text-white">
            <div className="flex items-center justify-between border-b border-white/10 px-5 py-3">
              <div className="flex items-center gap-2">
                <img src={selected.logo} alt={selected.brand} className="h-6 w-6" />
                <h3 className="text-sm font-semibold text-white/90">{selected.brand} — Coupon</h3>
              </div>
              <button onClick={() => setSelected(null)} className="rounded p-1 text-white/60 hover:bg-white/10" aria-label="Close">
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="space-y-4 p-5">
              <h4 className="text-lg font-semibold">{selected.title}</h4>
              <div className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-2">
                <Ticket className="h-4 w-4 text-emerald-300" />
                <code className="text-sm tracking-wide">{selected.code}</code>
                <button onClick={() => copyCode(selected.code)} className="ml-auto inline-flex items-center gap-1 rounded-md bg-white/10 px-2 py-1 text-xs hover:bg-white/15">
                  <Copy className="h-3.5 w-3.5" /> Copy
                </button>
              </div>
              <p className="text-sm text-white/70">Expiry: {new Date(selected.expiry).toLocaleDateString()}</p>
              <div className="flex gap-2">
                <button
                  onClick={() => handleUseNow(selected)}
                  className="flex-1 rounded-lg bg-emerald-500 px-4 py-2 text-sm font-semibold text-slate-900 hover:bg-emerald-400"
                >
                  Use Coupon
                </button>
                <a
                  href={selected.fallbackUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-sm hover:bg-white/10"
                >
                  <ExternalLink className="h-4 w-4" /> Open Website
                </a>
              </div>
              <div className="flex items-center gap-2 text-xs text-white/60">
                <button
                  onClick={() => toggleFavorite(selected.id)}
                  className={`inline-flex items-center gap-1 rounded-full px-3 py-1 ${favorites[selected.id] ? 'bg-rose-500/20 text-rose-300' : 'bg-white/5 hover:bg-white/10'}`}
                >
                  <Heart className="h-3.5 w-3.5" /> Favorite
                </button>
                {used[selected.id] && (
                  <span className="inline-flex items-center gap-1 text-emerald-300">
                    <CheckCircle className="h-3.5 w-3.5" /> Used
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* In-app browser modal */}
      {inAppUrl && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
          <div className="flex h-[80vh] w-full max-w-4xl flex-col overflow-hidden rounded-2xl border border-white/10 bg-slate-900">
            <div className="flex items-center justify-between border-b border-white/10 px-4 py-3 text-white">
              <div className="text-sm">In-app Browser</div>
              <div className="flex items-center gap-2">
                {selected && (
                  <button onClick={() => copyCode(selected.code)} className="rounded bg-white/10 px-2 py-1 text-xs hover:bg-white/15">
                    <Copy className="mr-1 inline h-3.5 w-3.5" /> Copy Code
                  </button>
                )}
                <button onClick={() => setInAppUrl('')} className="rounded p-1 text-white/60 hover:bg-white/10" aria-label="Close">
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>
            <iframe title="In-app Browser" src={inAppUrl} className="h-full w-full border-0" />
          </div>
        </div>
      )}
    </section>
  );
}
