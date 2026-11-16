// Interactive SVG cake: tap = phoonk maariye, dobara tap = candles dobara jala dein.
const CANDLES = [
  { x: 92, h: 34, c: "#c23b52" },
  { x: 130, h: 44, c: "#e0b45a" },
  { x: 168, h: 34, c: "#f6ecd6" },
];

export default function Cake({ lit, onToggle }) {
  return (
    <button
      type="button"
      className={`cake ${lit ? "is-lit" : "is-out"}`}
      onClick={onToggle}
      aria-pressed={!lit}
      aria-label={lit ? "Candles bujhane ke liye tap karein" : "Candles dobara jalane ke liye tap karein"}
    >
      <svg viewBox="0 0 260 250" aria-hidden="true">
        <defs>
          <linearGradient id="gold" x1="0" x2="1">
            <stop offset="0" stopColor="#c98f2f" />
            <stop offset=".5" stopColor="#ffe3a3" />
            <stop offset="1" stopColor="#c98f2f" />
          </linearGradient>
          <linearGradient id="rose" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#d9566c" />
            <stop offset="1" stopColor="#7d1527" />
          </linearGradient>
          <linearGradient id="cream" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#fff4dd" />
            <stop offset="1" stopColor="#f3d9ad" />
          </linearGradient>
          <radialGradient id="flame" cx=".5" cy=".7" r=".6">
            <stop offset="0" stopColor="#fff7d1" />
            <stop offset=".5" stopColor="#ffc857" />
            <stop offset="1" stopColor="#ff7a45" />
          </radialGradient>
        </defs>

        {/* plate */}
        <ellipse cx="130" cy="228" rx="118" ry="14" fill="url(#gold)" />
        <ellipse cx="130" cy="224" rx="104" ry="10" fill="#141a3d" />

        {/* bottom tier */}
        <rect x="30" y="148" width="200" height="76" rx="14" fill="url(#rose)" />
        <path
          d="M30 162 q16 18 32 0 t32 0 t32 0 t32 0 t32 0 t32 0 t10 0 v-12 a14 14 0 0 0 -14 -14 H44 a14 14 0 0 0 -14 14z"
          fill="url(#cream)"
        />
        <g fill="#ffe3a3">
          {[56, 98, 140, 182].map((x) => (
            <circle key={x} cx={x} cy="198" r="5" />
          ))}
        </g>

        {/* top tier */}
        <rect x="64" y="100" width="132" height="56" rx="12" fill="#24399a" />
        <path
          d="M64 112 q11 14 22 0 t22 0 t22 0 t22 0 t22 0 t22 0 v-8 a12 12 0 0 0 -12 -12 H76 a12 12 0 0 0 -12 12z"
          fill="url(#cream)"
        />
        <rect x="64" y="136" width="132" height="6" fill="url(#gold)" opacity=".9" />

        {/* candles */}
        {CANDLES.map((k, i) => (
          <g key={k.x}>
            <rect x={k.x - 5} y={100 - k.h} width="10" height={k.h + 2} rx="3" fill={k.c} />
            <path
              d={`M${k.x - 5} ${100 - k.h + 10} l10 -4 M${k.x - 5} ${100 - k.h + 20} l10 -4`}
              stroke="#ffffff88"
              strokeWidth="2.5"
            />
            <line x1={k.x} y1={100 - k.h} x2={k.x} y2={100 - k.h - 6} stroke="#3a2a1a" strokeWidth="2" />
            <g transform={`translate(${k.x} ${100 - k.h - 6})`}>
              <g className="flame" style={{ animationDelay: `${i * 0.18}s` }}>
                <ellipse cx="0" cy="-10" rx="13" ry="16" fill="#ffc857" opacity=".25" />
                <path d="M0 -26 C9 -14 8 -4 0 -2 C-8 -4 -9 -14 0 -26z" fill="url(#flame)" />
              </g>
              <g className="smoke" style={{ animationDelay: `${i * 0.12}s` }}>
                <path d="M0 -2 q-5 -8 0 -14 t0 -14" stroke="#cfc8ff" strokeWidth="2.5" fill="none" strokeLinecap="round" />
              </g>
            </g>
          </g>
        ))}
      </svg>
    </button>
  );
}
