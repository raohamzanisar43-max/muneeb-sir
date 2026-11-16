import { useCallback, useEffect, useRef, useState } from "react";
import Confetti from "./Confetti.jsx";
import Cake from "./Cake.jsx";
import Countdown from "./Countdown.jsx";
import { CONFIG, DUAS, GALLERY, LETTER, MARQUEE, QUALITIES, SHARE_TEXT } from "./config.js";

function Title({ eyebrow, children, id }) {
  return (
    <div className="title">
      {eyebrow && <p className="eyebrow">{eyebrow}</p>}
      <h2 id={id}>{children}</h2>
      <i className="orn" aria-hidden="true" />
    </div>
  );
}

export default function App() {
  const confetti = useRef(null);
  const audio = useRef(null);
  const [lit, setLit] = useState(true);
  const [copied, setCopied] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [open, setOpen] = useState(null);

  const burst = useCallback((x, y, n) => confetti.current?.burst(x, y, n), []);

  useEffect(() => {
    const t = setTimeout(() => {
      burst(innerWidth * 0.25, innerHeight * 0.35, 70);
      burst(innerWidth * 0.75, innerHeight * 0.35, 70);
    }, 500);
    return () => clearTimeout(t);
  }, [burst]);

  useEffect(() => {
    if (open === null) return;
    const k = (e) => {
      if (e.key === "Escape") setOpen(null);
      if (e.key === "ArrowRight") setOpen((i) => (i + 1) % GALLERY.length);
      if (e.key === "ArrowLeft") setOpen((i) => (i - 1 + GALLERY.length) % GALLERY.length);
    };
    addEventListener("keydown", k);
    document.body.style.overflow = "hidden";
    return () => {
      removeEventListener("keydown", k);
      document.body.style.overflow = "";
    };
  }, [open]);

  const toggleCake = (e) => {
    const next = !lit;
    setLit(next);
    if (!next) {
      const r = e.currentTarget.getBoundingClientRect();
      burst(r.left + r.width / 2, r.top + r.height * 0.3, 140);
    }
  };

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(SHARE_TEXT);
    } catch {
      const ta = document.createElement("textarea");
      ta.value = SHARE_TEXT;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      ta.remove();
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  const toggleMusic = () => {
    const a = audio.current;
    if (!a) return;
    if (a.paused) a.play().then(() => setPlaying(true)).catch(() => {});
    else {
      a.pause();
      setPlaying(false);
    }
  };

  const initial = CONFIG.name.trim()[0]?.toUpperCase() ?? "M";
  const wa = `https://wa.me/?text=${encodeURIComponent(SHARE_TEXT)}`;

  return (
    <>
      <div className="bg" aria-hidden="true" />
      <Confetti ref={confetti} />

      <main>
        {/* HERO */}
        <header className="hero wrap">
          <div className="badge">
            {CONFIG.photo ? <img src={CONFIG.photo} alt={CONFIG.name} /> : <span aria-hidden="true">{initial}</span>}
          </div>
          <p className="eyebrow">{CONFIG.dateLabel}</p>
          <p className="urdu" lang="ur" dir="rtl">
            {CONFIG.urduGreeting}
          </p>
          <h1>
            Happy Birthday
            <br />
            <em>{CONFIG.name}</em>
          </h1>
          <p className="tagline">{CONFIG.tagline}</p>
          <a className="scroll" href="#countdown" aria-label="Neeche scroll karein">
            <span />
          </a>
        </header>

        {/* MARQUEE */}
        <div className="marquee" aria-hidden="true">
          <div>
            {[...MARQUEE, ...MARQUEE, ...MARQUEE, ...MARQUEE].map((w, i) => (
              <span key={i}>{w} <b>✦</b></span>
            ))}
          </div>
        </div>

        {/* COUNTDOWN */}
        <section id="countdown" className="wrap block center" aria-labelledby="cd-h">
          <Title id="cd-h" eyebrow="Intezar ki ghadiyan">Sir ke khaas din tak</Title>
          <Countdown target={CONFIG.birthday} />
        </section>

        {/* QUALITIES */}
        <section className="wrap block" aria-labelledby="q-h">
          <Title id="q-h" eyebrow="Shukriya">Aap se humne kya seekha</Title>
          <ol className="quals">
            {QUALITIES.map((q) => (
              <li key={q.n}>
                <span className="num">{q.n}</span>
                <div>
                  <h3>{q.title}</h3>
                  <p>{q.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        {/* CINEMATIC BANNER */}
        <section className="banner" style={{ "--img": `url(${GALLERY[0].src})` }} aria-label="Dua">
          <div className="banner-in wrap">
            <p className="urdu" lang="ur" dir="rtl">اللہ آپ کو سلامت رکھے</p>
            <blockquote>
              &ldquo;Ustaad woh charagh hai jo khud jal kar doosron ka raasta roshan karta hai.&rdquo;
            </blockquote>
          </div>
        </section>

        {/* CAKE */}
        <section className="wrap block center" aria-labelledby="cake-h">
          <Title id="cake-h" eyebrow="Ek chhoti si dua">Phoonk maariye, dua maangiye</Title>
          <Cake lit={lit} onToggle={toggleCake} />
          <p className="hint">
            {lit ? "Candles par tap karke phoonk maariye 🕯️" : "Aameen! Dua qubool ho. Dobara jalane ke liye tap karein ✨"}
          </p>
          <div className="actions">
            <button
              className="btn"
              onClick={(e) => {
                const r = e.currentTarget.getBoundingClientRect();
                burst(r.left + r.width / 2, r.top, 130);
              }}
            >
              🎉 Confetti
            </button>
            {CONFIG.music && (
              <>
                <button className="btn ghost" onClick={toggleMusic} aria-pressed={playing}>
                  {playing ? "⏸ Music rokein" : "🎵 Music chalayein"}
                </button>
                <audio ref={audio} src={CONFIG.music} loop preload="none" onEnded={() => setPlaying(false)} />
              </>
            )}
          </div>
        </section>

        {/* DUAS */}
        <section className="tint">
          <div className="wrap block" aria-labelledby="dua-h">
            <Title id="dua-h" eyebrow="Dil ki gehraiyon se">Aap ke liye duaen</Title>
            <ul className="grid">
              {DUAS.map((d, i) => (
                <li key={d.title} className={`card c${i % 3}`}>
                  <span className="icon" aria-hidden="true">{d.icon}</span>
                  <h3>{d.title}</h3>
                  <p>{d.text}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* GALLERY */}
        <section className="wrap block" aria-labelledby="gal-h">
          <Title id="gal-h" eyebrow="Yaadgar lamhe">Sir ki jhalkiyan</Title>
          <ul className="shots">
            {GALLERY.map((g, i) => (
              <li key={g.src} className={`shot s${i}`}>
                <button type="button" onClick={() => setOpen(i)} aria-label={`${g.caption} bara karein`}>
                  <img src={g.src} alt={`${CONFIG.name} - ${g.caption}`} loading={i < 2 ? "eager" : "lazy"} style={{ objectPosition: g.pos }} />
                  <span>{g.caption}</span>
                </button>
              </li>
            ))}
          </ul>
        </section>

        {/* LETTER */}
        <section className="wrap block" aria-labelledby="l-h">
          <Title id="l-h" eyebrow="Ek chhota sa khat">Dil ki baat</Title>
          <article className="letter">
            {LETTER.map((p, i) => (
              <p key={i} className={i === 0 ? "greet" : ""}>{p}</p>
            ))}
            <p className="sign">— {CONFIG.sender}</p>
          </article>
        </section>

        {/* SIGN-OFF */}
        <section className="signoff">
          <div className="wrap block center" aria-labelledby="n-h">
            <Title id="n-h" eyebrow="Mubarakbaad">Janamdin mubarak</Title>
            <p className="big-name">{CONFIG.name}</p>
            <div className="actions">
              <button className="btn" onClick={copy}>{copied ? "✓ Copy ho gaya" : "📋 Message copy karein"}</button>
              <a className="btn ghost" href={wa} target="_blank" rel="noopener noreferrer">💬 WhatsApp par bhejein</a>
            </div>
            <span className="sr-only" role="status">{copied ? "Message copied" : ""}</span>
          </div>
        </section>

        <footer className="foot">
          Made with ♥ for {CONFIG.title} · {CONFIG.dateLabel}
        </footer>
      </main>

      {open !== null && (
        <div className="lightbox" role="dialog" aria-modal="true" aria-label={GALLERY[open].caption} onClick={() => setOpen(null)}>
          <img src={GALLERY[open].src} alt={`${CONFIG.name} - ${GALLERY[open].caption}`} onClick={(e) => e.stopPropagation()} />
          <p>{GALLERY[open].caption}</p>
          <button className="lb-close" onClick={() => setOpen(null)} aria-label="Band karein">✕</button>
          <button className="lb-nav prev" onClick={(e) => { e.stopPropagation(); setOpen((open - 1 + GALLERY.length) % GALLERY.length); }} aria-label="Pichli tasveer">‹</button>
          <button className="lb-nav next" onClick={(e) => { e.stopPropagation(); setOpen((open + 1) % GALLERY.length); }} aria-label="Agli tasveer">›</button>
        </div>
      )}
    </>
  );
}
