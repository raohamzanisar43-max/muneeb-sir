import { useEffect, useState } from "react";

const pad = (n) => String(n).padStart(2, "0");

export default function Countdown({ target }) {
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);

  const end = new Date(target).getTime();
  const diff = end - now;

  // Birthday aa gaya (ya guzar gaya)
  if (diff <= 0) {
    const sameDay = now - end < 86400000;
    return (
      <div className="count count-done" role="status">
        <span className="count-big">{sameDay ? "Aaj Sir ka din hai! 🎉" : "Dua hai har din khush rahein ✨"}</span>
      </div>
    );
  }

  const s = Math.floor(diff / 1000);
  const parts = [
    ["Din", Math.floor(s / 86400)],
    ["Ghante", Math.floor((s % 86400) / 3600)],
    ["Minute", Math.floor((s % 3600) / 60)],
    ["Second", s % 60],
  ];
  return (
    <div className="count" role="timer" aria-label="Birthday mein baqi waqt">
      {parts.map(([label, v]) => (
        <div key={label} className="count-box">
          <b>{pad(v)}</b>
          <span>{label}</span>
        </div>
      ))}
    </div>
  );
}
