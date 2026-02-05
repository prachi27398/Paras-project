import { useEffect, useMemo, useRef, useState } from 'react'
import './App.css'

export default function App() {
  const content = useMemo(
    () => ({
      heroTitle: "Hey you 😌✨",
      heroSubtitle:
        "This is a tiny webpage to remind you I’m iconic… and you’re stuck with me.",
      line1:
        "Friendly announcement: you’re one of my favourite humans. Don’t get emotional.",
      iceCap:
        "Also… you calling me “iced cap” is officially my favourite nickname. I accept this title with pride 🧊👑",
      loveLetterTitle: "Open this ✉️ (no drama) ",
      loveLetter: [
        "Dear you,",
        "You’re that person I can laugh with, vent to, and still be weird around.",
        "Thanks for existing and making life 10x funnier.",
        "If being supportive was a job, you’d be employee of the month. Every month.",
        "Please If you ever stop calling me “iced cap”, I will write a complaint letter 😤🧊",
      ],
      questionTitle: "Very important question 🤨",
      question:
        "Will you continue being my friend even when I’m annoying (which is daily)?",
      yesText: "YES (obviously) 😎",
      noText: "No 🙃",
      yesTitle: "Correct answer ✅😂",
      yesMsg:
        "Congrats! You just renewed your subscription to me: 100% chaos, 200% laughs, unlimited bestie energy.",
      footer: "Made with friendship + nonsense ✨ • Enjoy 😄",
    }),
    []
  );

  const [letterOpen, setLetterOpen] = useState(false);
  const [saidYes, setSaidYes] = useState(false);

  // NO button escape
  const [noPos, setNoPos] = useState({ x: 0, y: 0 });
  const noWrapRef = useRef(null);

  // sparkles
  const [sparkles, setSparkles] = useState([]);

  useEffect(() => {
    setNoPos({ x: 0, y: 0 });
  }, []);

  function spawnSparkles() {
    const now = Date.now();
    const items = Array.from({ length: 16 }).map((_, i) => ({
      id: `${now}-${i}`,
      left: 10 + Math.random() * 80,
      delay: Math.random() * 0.5,
      size: 6 + Math.random() * 10,
      top: 10 + Math.random() * 25,
    }));
    setSparkles(items);
    setTimeout(() => setSparkles([]), 1200);
  }

  function moveNoButton() {
    const wrap = noWrapRef.current;
    if (!wrap) return;

    const rect = wrap.getBoundingClientRect();
    const maxX = Math.max(0, rect.width - 140);
    const maxY = Math.max(0, rect.height - 60);

    const x = (Math.random() - 0.5) * maxX;
    const y = (Math.random() - 0.2) * maxY; // bias upward a bit

    setNoPos({ x, y });
  }

  function onYes() {
    setSaidYes(true);
    spawnSparkles();
  }

  return (
    <div className="page">
      <FloatingHearts />

      {/* Sparkles */}
      <div className="sparkleLayer" aria-hidden="true">
        {sparkles.map((s) => (
          <span
            key={s.id}
            className="sparkle"
            style={{
              left: `${s.left}%`,
              top: `${s.top}%`,
              width: `${s.size}px`,
              height: `${s.size}px`,
              animationDelay: `${s.delay}s`,
            }}
          />
        ))}
      </div>

      <main className="container">
        <header className="hero">
          <div className="pill">✨ Iced Capp</div>
          <h1 className="title">{content.heroTitle}</h1>
          <p className="subtitle">{content.heroSubtitle}</p>

          <div className="miniLines">
            <div className="miniCard">{content.line1}</div>
            <div className="miniCard coffee">{content.iceCap}</div>
          </div>
        </header>

        {/* Love letter */}
        <section className="card">
          <div className="row">
            <div>
              <h2 className="h2">{content.loveLetterTitle}</h2>
              <p className="muted">
                Tap the envelope. If you smile, you owe me one 😌
              </p>

              <button
                className={`envelopeBtn ${letterOpen ? "open" : ""}`}
                onClick={() => setLetterOpen(true)}
                aria-label="Open love letter"
              >
                <span className="envIcon" aria-hidden="true">
                  ✉️
                </span>
                <span>Open message</span>
              </button>
            </div>

            <div>
              <div className={`letter ${letterOpen ? "show" : ""}`}>
                <div className="letterTop">
                  <div className="stamp">💌</div>
                  <button
                    className="closeBtn"
                    onClick={() => setLetterOpen(false)}
                    aria-label="Close"
                  >
                    ✕
                  </button>
                </div>

                <div className="letterBody">
                  {content.loveLetter.map((line, idx) => (
                    <p key={idx} className="letterLine">
                      {line}
                    </p>
                  ))}
                </div>

                <div className="letterFooter">— always yours ❤️</div>
              </div>

              <div className="tip">
                Tip: try to press “No” later 😄
              </div>
            </div>
          </div>
        </section>

        {/* Funny love question */}
        <section className="card questionCard">
          <h2 className="h2">{content.questionTitle}</h2>
          <div className="bigQ">{content.question}</div>

          {!saidYes ? (
            <div className="btnArea" ref={noWrapRef}>
              <button className="btn yes" onClick={onYes}>
                {content.yesText}
              </button>

              <button
                className="btn no"
                style={{ transform: `translate(${noPos.x}px, ${noPos.y}px)` }}
                onMouseEnter={moveNoButton}
                onTouchStart={moveNoButton}
                onClick={moveNoButton}
              >
                {content.noText}
              </button>

              <div className="hint">(No button is shy 🙈)</div>
            </div>
          ) : (
            <div className="yesBox">
              <div className="yesTitle">{content.yesTitle}</div>
              <p className="yesMsg">{content.yesMsg}</p>
              <div className="ring" aria-hidden="true">
                💍✨☕️
              </div>

              <div className="finalFun">
                Say it out loud: <b>“Iced cap coffee”</b> 😌
              </div>
            </div>
          )}
        </section>

        <footer className="footer">{content.footer}</footer>
      </main>
    </div>
  );
}

function FloatingHearts() {
  // fewer hearts for smoother mobile scroll
  return (
    <div className="hearts" aria-hidden="true">
      {Array.from({ length: 10 }).map((_, i) => (
        <span key={i} className="heart" style={{ "--i": i }} />
      ))}
    </div>
  );
}
