import { useState, useEffect, useRef, useMemo } from "react";
import {
  ArrowUpRight,
  Mail,
  Menu,
  X,
  Copy,
  Check,
  MapPin,
  TrendingUp,
  Sparkles,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/*  DATA                                                               */
/* ------------------------------------------------------------------ */

const NAV = [
  { id: "about", label: "Over mij" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projecten" },
  { id: "experience", label: "Ervaring" },
  { id: "contact", label: "Contact" },
];

const EMAIL = "bekir194559@hotmail.com";

const skillGroups = [
  {
    title: "Frontend",
    items: ["React", "TypeScript", "JavaScript", "Tailwind CSS", "HTML", "CSS"],
  },
  {
    title: "Backend & data",
    items: ["PHP", "MySQL", "REST APIs", "AI-integraties"],
  },
  {
    title: "Craft",
    items: ["UI Design", "Responsive Design", "UX-denken", "Webapplicaties"],
  },
];

const projects = [
  {
    title: "Numico",
    label: "AI-boekhoudplatform",
    year: "2025",
    description:
      "Een AI-gedreven boekhoudapp waarmee ondernemers bonnetjes verwerken, hun administratie automatiseren en realtime overzicht krijgen over hun bedrijf.",
    tech: ["React", "TypeScript", "Tailwind", "AI", "PHP", "MySQL"],
    accent: "var(--accent)",
    link: "https://smartxx-kohl.vercel.app/",
  },
  {
    title: "GoldStone",
    label: "Consultancy website",
    year: "2026",
    description:
      "Een professionele website voor GoldStone Consulting, gericht op groei en leadgeneratie. Gebouwd met herbruikbare componenten en heldere conversiesecties.",
    tech: ["React", "Tailwind CSS", "UX", "Responsive"],
    accent: "var(--accent-2)",
    link: "https://goldstoneconsulting.vercel.app/",
  },
  {
    title: "Portfolio",
    label: "Personal brand",
    year: "2025",
    description:
      "Deze site. Een plek waar mijn skills, projecten en ambitie als developer samenkomen in één strak, snel geheel.",
    tech: ["Vite", "React", "Tailwind CSS"],
    accent: "var(--grow)",
    link: "",
  },
];

const experience = [
  {
    period: "Nu",
    title: "Frontend Developer — eigen projecten",
    text: "Ik bouw moderne websites en webapplicaties met React, TypeScript en Tailwind CSS. Focus op strakke interfaces, heldere structuur en een professionele gebruikerservaring.",
  },
  {
    period: "Project",
    title: "Numico — AI-boekhouding",
    text: "Aan een platform dat administratie makkelijker maakt voor ondernemers: bonnetjes, dashboards, automatisering en AI-functionaliteiten.",
  },
  {
    period: "Werk",
    title: "Europcar — Schiphol",
    text: "Dagelijks klantcontact in een drukke internationale omgeving. Hier leerde ik professioneel communiceren, snel schakelen en verantwoordelijkheid nemen.",
  },
  {
    period: "Opleiding",
    title: "Software Developer",
    text: "Geleerd om websites, applicaties en databases te bouwen. Ik combineer technische kennis met creatief en commercieel denken.",
  },
];

const values = [
  {
    title: "Strak design",
    text: "Websites die direct professioneel voelen: rustig, helder en modern.",
  },
  {
    title: "Slim bouwen",
    text: "Niet zomaar code, maar nadenken over structuur, herbruikbare componenten en onderhoudbaarheid.",
  },
  {
    title: "Elke dag beter",
    text: "Blijven leren, blijven bouwen en steeds professioneler worden. 1% per dag telt op.",
  },
];

/* ------------------------------------------------------------------ */
/*  HOOKS                                                              */
/* ------------------------------------------------------------------ */

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll("[data-reveal]");
    if (typeof IntersectionObserver === "undefined") {
      els.forEach((el) => el.classList.add("is-in"));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("is-in");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -8% 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

function useScrollProgress() {
  const [p, setP] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      const max = h.scrollHeight - h.clientHeight;
      setP(max > 0 ? (h.scrollTop / max) * 100 : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return p;
}

function useActiveSection() {
  const [active, setActive] = useState("");
  useEffect(() => {
    const ids = NAV.map((n) => n.id);
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, []);
  return active;
}

type CounterProps = {
  to: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
};

function Counter({
  to,
  suffix = "",
  prefix = "",
  duration = 1400,
}: CounterProps) {
  const [val, setVal] = useState(0);
  const ref = useRef<HTMLSpanElement | null>(null);
  const done = useRef(false);

  useEffect(() => {
    const reduce =
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduce) {
      setVal(to);
      return;
    }

    const io = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !done.current) {
        done.current = true;

        const start = performance.now();

        const tick = (now: number) => {
          const t = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - t, 3);

          setVal(to * eased);

          if (t < 1) {
            requestAnimationFrame(tick);
          }
        };

        requestAnimationFrame(tick);
      }
    });

    if (ref.current) {
      io.observe(ref.current);
    }

    return () => io.disconnect();
  }, [to, duration]);

  const display = Number.isInteger(to) ? Math.round(val) : val.toFixed(1);

  return (
    <span ref={ref}>
      {prefix}
      {display}
      {suffix}
    </span>
  );
}

/* ------------------------------------------------------------------ */
/*  SIGNATURE: compound-growth curve  (1.01^365 ≈ 37.8x)               */
/* ------------------------------------------------------------------ */

function CompoundCurve() {
  const W = 320;
  const H = 150;
  const pad = 6;

  const path = useMemo(() => {
    const n = 64;
    const vals = Array.from({ length: n }, (_, i) =>
      Math.pow(1.01, (i / (n - 1)) * 200),
    );
    const min = vals[0];
    const max = vals[n - 1];
    const pts = vals.map((v, i) => {
      const x = pad + (i / (n - 1)) * (W - pad * 2);
      const y = H - pad - ((v - min) / (max - min)) * (H - pad * 2);
      return [x, y];
    });
    let d = `M ${pts[0][0]} ${pts[0][1]}`;
    for (let i = 1; i < pts.length; i++) {
      const [x0, y0] = pts[i - 1];
      const [x1, y1] = pts[i];
      const cx = (x0 + x1) / 2;
      d += ` C ${cx} ${y0}, ${cx} ${y1}, ${x1} ${y1}`;
    }
    const area = `${d} L ${pts[n - 1][0]} ${H - pad} L ${pts[0][0]} ${
      H - pad
    } Z`;
    return { d, area, end: pts[n - 1] };
  }, []);

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      className="w-full h-auto"
      role="img"
      aria-label="Compound-growth curve: 1% beter per dag wordt 37,8 keer over een jaar"
    >
      <defs>
        <linearGradient id="curveFill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--grow)" stopOpacity="0.28" />
          <stop offset="100%" stopColor="var(--grow)" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="curveStroke" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="var(--accent)" />
          <stop offset="100%" stopColor="var(--grow)" />
        </linearGradient>
      </defs>
      {[0.25, 0.5, 0.75].map((g) => (
        <line
          key={g}
          x1={pad}
          x2={W - pad}
          y1={H * g}
          y2={H * g}
          stroke="rgba(255,255,255,0.06)"
          strokeWidth="1"
        />
      ))}
      <path d={path.area} fill="url(#curveFill)" className="curve-area" />
      <path
        d={path.d}
        fill="none"
        stroke="url(#curveStroke)"
        strokeWidth="2.5"
        strokeLinecap="round"
        className="curve-line"
      />
      <circle
        cx={path.end[0]}
        cy={path.end[1]}
        r="4.5"
        fill="var(--grow)"
        className="curve-dot"
      />
      <circle
        cx={path.end[0]}
        cy={path.end[1]}
        r="4.5"
        fill="none"
        stroke="var(--grow)"
        strokeWidth="2"
        className="curve-ping"
      />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  TERMINAL                                                           */
/* ------------------------------------------------------------------ */

function Terminal() {
  return (
    <div className="term">
      <div className="term-bar">
        <span className="dot" style={{ background: "#ff5f57" }} />
        <span className="dot" style={{ background: "#febc2e" }} />
        <span className="dot" style={{ background: "#28c840" }} />
        <span className="term-name">developer.ts</span>
      </div>
      <pre className="term-body">
        <code>
          <span className="ln">
            <span className="kw">const</span>{" "}
            <span className="vr">developer</span> <span className="op">=</span>{" "}
            <span className="br">{"{"}</span>
          </span>
          <span className="ln pl">
            name: <span className="st">"Bekir Sezgin"</span>,
          </span>
          <span className="ln pl">
            stack:{" "}
            <span className="st">["React", "TypeScript", "Tailwind"]</span>,
          </span>
          <span className="ln pl">
            building: <span className="st">"Numico"</span>,
          </span>
          <span className="ln pl">
            rule: <span className="st">"elke dag 1% beter"</span>,
          </span>
          <span className="ln">
            <span className="br">{"}"}</span>
            <span className="caret">▍</span>
          </span>
        </code>
      </pre>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  APP                                                                */
/* ------------------------------------------------------------------ */

export default function App() {
  useReveal();
  const progress = useScrollProgress();
  const active = useActiveSection();
  const [menuOpen, setMenuOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      window.location.href = `mailto:${EMAIL}`;
    }
  };

  return (
    <div className="bs-root">
      <Styles />

      {/* scroll progress */}
      <div
        className="progress"
        style={{ transform: `scaleX(${progress / 100})` }}
      />

      {/* atmosphere */}
      <div className="bg" aria-hidden="true">
        <div className="orb orb-a" />
        <div className="orb orb-b" />
        <div className="grid-lines" />
        <div className="vignette" />
      </div>

      {/* NAV */}
      <header className="nav">
        <div className="nav-inner">
          <a href="#top" className="brand" onClick={() => setMenuOpen(false)}>
            <span className="brand-mark">BS</span>
            <span className="brand-name">
              Bekir Sezgin<span className="accent">.</span>
            </span>
          </a>

          <nav className="nav-links">
            {NAV.map((n) => (
              <a
                key={n.id}
                href={`#${n.id}`}
                className={active === n.id ? "active" : ""}
              >
                {n.label}
              </a>
            ))}
          </nav>

          <div className="nav-right">
            <a href={`mailto:${EMAIL}`} className="btn btn-ghost nav-cta">
              Mail mij
            </a>
            <button
              className="menu-btn"
              aria-label="Menu"
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((o) => !o)}
            >
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* mobile menu */}
        <div className={`mobile-menu ${menuOpen ? "open" : ""}`}>
          {NAV.map((n) => (
            <a key={n.id} href={`#${n.id}`} onClick={() => setMenuOpen(false)}>
              {n.label}
            </a>
          ))}
          <a
            href={`mailto:${EMAIL}`}
            className="btn btn-solid"
            onClick={() => setMenuOpen(false)}
          >
            Mail mij
          </a>
        </div>
      </header>

      <main id="top">
        {/* HERO */}
        <section className="hero">
          <div className="container hero-grid">
            <div className="hero-copy">
              <div className="eyebrow load load-1">
                <span className="pulse" />
                Frontend Developer · Haarlem, NL
              </div>

              <h1 className="hero-title">
                <span className="load load-2">Ik bouw digitale producten</span>{" "}
                <span className="load load-3">
                  met <span className="grad">uitstraling</span>,
                </span>{" "}
                <span className="load load-4">structuur en ambitie.</span>
              </h1>

              <p className="hero-lead load load-5">
                Ik ben Bekir. Ik ontwikkel snelle, moderne webapps met React,
                TypeScript en Tailwind — met gevoel voor design,
                gebruiksvriendelijkheid en commerciële impact.
              </p>

              <div className="hero-actions load load-6">
                <a href="#projects" className="btn btn-solid">
                  Bekijk mijn werk
                  <ArrowUpRight size={18} />
                </a>
                <a href="#contact" className="btn btn-ghost">
                  Neem contact op
                </a>
              </div>

              <dl className="hero-stats load load-7">
                <div>
                  <dt>Eigen projecten</dt>
                  <dd>
                    <Counter to={3} suffix="+" />
                  </dd>
                </div>
                <div>
                  <dt>Kerntalen</dt>
                  <dd>NL · EN · TR</dd>
                </div>
                <div>
                  <dt>Hoofdfocus</dt>
                  <dd>Frontend</dd>
                </div>
              </dl>
            </div>

            {/* signature panel */}
            <aside className="hero-panel load load-5">
              <Terminal />

              <div className="growth-card">
                <div className="growth-head">
                  <div className="growth-label">
                    <TrendingUp size={15} />
                    Mijn principe
                  </div>
                  <span className="growth-eq">1.01³⁶⁵</span>
                </div>
                <CompoundCurve />
                <div className="growth-foot">
                  <p>
                    <span className="grow-num">
                      <Counter to={37.8} suffix="×" duration={1700} />
                    </span>
                    <span className="grow-cap">in één jaar</span>
                  </p>
                  <p className="grow-note">
                    Elke dag 1% beter telt op. Zo bouw ik — en zo denk ik.
                  </p>
                </div>
              </div>
            </aside>
          </div>
        </section>

        {/* ABOUT */}
        <section id="about" className="section">
          <div className="container">
            <div className="about-grid" data-reveal>
              <div>
                <p className="kicker">Over mij</p>
                <h2 className="h2">
                  Van idee naar een strak digitaal product.
                </h2>
              </div>
              <div className="about-text">
                <p>
                  Ik ben een leergierige developer met een sterke focus op
                  frontend. Ik bouw graag websites die niet alleen werken, maar
                  ook professioneel aanvoelen — design, structuur en snelheid
                  staan voorop.
                </p>
                <p>
                  Met projecten als Numico en GoldStone werk ik aan mijn
                  ontwikkeling als developer én ondernemer. Ik wil producten
                  bouwen die helder, modern en waardevol zijn.
                </p>
              </div>
            </div>

            <div className="values">
              {values.map((v, i) => (
                <article
                  className="value-card card"
                  data-reveal
                  style={{ transitionDelay: `${i * 90}ms` }}
                  key={v.title}
                >
                  <span className="value-no">0{i + 1}</span>
                  <h3>{v.title}</h3>
                  <p>{v.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* SKILLS */}
        <section id="skills" className="section">
          <div className="container">
            <div className="head" data-reveal>
              <p className="kicker">Skills</p>
              <h2 className="h2">De stack waarmee ik bouw.</h2>
            </div>
            <div className="skill-grid">
              {skillGroups.map((g, gi) => (
                <div
                  className="skill-col card"
                  data-reveal
                  style={{ transitionDelay: `${gi * 90}ms` }}
                  key={g.title}
                >
                  <h3 className="skill-title">
                    <Sparkles size={15} className="accent" />
                    {g.title}
                  </h3>
                  <ul className="chips">
                    {g.items.map((s) => (
                      <li key={s}>{s}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* PROJECTS */}
        <section id="projects" className="section">
          <div className="container">
            <div className="head head-row" data-reveal>
              <div>
                <p className="kicker">Projecten</p>
                <h2 className="h2">Werk dat laat zien hoe ik denk en bouw.</h2>
              </div>
              <p className="head-aside">
                Elk project combineert development, design en logica — en maakt
                me een betere developer.
              </p>
            </div>

            <div className="projects">
              {projects.map((p, i) => {
                const Tag = p.link ? "a" : "article";
                return (
                  <Tag
                    className="project card"
                    data-reveal
                    style={
                      {
                        transitionDelay: `${i * 90}ms`,
                        "--c": p.accent,
                      } as React.CSSProperties
                    }
                    key={p.title}
                    {...(p.link
                      ? { href: p.link, target: "_blank", rel: "noreferrer" }
                      : {})}
                  >
                    <div className="project-top">
                      <span className="project-no">0{i + 1}</span>
                      <span className="project-year">{p.year}</span>
                    </div>
                    <div className="project-glow" />
                    <div className="project-body">
                      <p className="project-label">{p.label}</p>
                      <h3 className="project-title">
                        {p.title}
                        <ArrowUpRight className="project-arrow" size={20} />
                      </h3>
                      <p className="project-desc">{p.description}</p>
                      <div className="chips chips-sm">
                        {p.tech.map((t) => (
                          <span key={t}>{t}</span>
                        ))}
                      </div>
                    </div>
                  </Tag>
                );
              })}
            </div>
          </div>
        </section>

        {/* EXPERIENCE */}
        <section id="experience" className="section">
          <div className="container">
            <div className="head" data-reveal>
              <p className="kicker">Ervaring</p>
              <h2 className="h2">
                Mijn achtergrond in development en klantcontact.
              </h2>
            </div>

            <div className="timeline">
              {experience.map((e, i) => (
                <article
                  className="tl-item"
                  data-reveal
                  style={{ transitionDelay: `${i * 80}ms` }}
                  key={e.title}
                >
                  <div className="tl-node" />
                  <span className="tl-period">{e.period}</span>
                  <div className="tl-content card">
                    <h3>{e.title}</h3>
                    <p>{e.text}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* CONTACT */}
        <section id="contact" className="section">
          <div className="container">
            <div className="contact card" data-reveal>
              <div className="contact-main">
                <p className="kicker">Contact</p>
                <h2 className="h2">Laten we iets bouwen dat blijft hangen.</h2>
                <p className="contact-lead">
                  Interesse in mijn werk, zin om samen te werken of gewoon even
                  sparren? Stuur gerust een bericht.
                </p>

                <div className="contact-actions">
                  <a href={`mailto:${EMAIL}`} className="btn btn-solid">
                    <Mail size={18} />
                    Mail mij
                  </a>
                  <button onClick={copyEmail} className="btn btn-ghost">
                    {copied ? <Check size={18} /> : <Copy size={18} />}
                    {copied ? "Gekopieerd!" : "Kopieer e-mail"}
                  </button>
                  <a
                    href="https://www.linkedin.com"
                    target="_blank"
                    rel="noreferrer"
                    className="btn btn-ghost"
                  >
                    LinkedIn
                  </a>
                </div>
              </div>

              <div className="contact-meta">
                {[
                  { k: "Naam", v: "Bekir Sezgin" },
                  { k: "Rol", v: "Frontend Developer" },
                ].map((m) => (
                  <div className="meta-row" key={m.k}>
                    <span>{m.k}</span>
                    <strong>{m.v}</strong>
                  </div>
                ))}
                <div className="meta-row">
                  <span>Locatie</span>
                  <strong className="meta-loc">
                    <MapPin size={15} className="accent" />
                    Haarlem, NL
                  </strong>
                </div>
                <div className="meta-row">
                  <span>E-mail</span>
                  <a href={`mailto:${EMAIL}`} className="meta-email">
                    {EMAIL}
                  </a>
                </div>
              </div>
            </div>

            <footer className="footer">
              <p>
                © {new Date().getFullYear()} Bekir Sezgin — alle rechten
                voorbehouden.
              </p>
            </footer>
          </div>
        </section>
      </main>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  STYLES                                                             */
/* ------------------------------------------------------------------ */

function Styles() {
  return (
    <style>{`
@import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500;700&display=swap');
.bs-root{
  --ink:#070A12;
  --ink-2:#0B1020;
  --card:rgba(255,255,255,0.035);
  --line:rgba(255,255,255,0.09);
  --text:#F4F6FC;
  --muted:#9298AC;
  --accent:#6EE7F9;
  --accent-2:#B79CFF;
  --grow:#5EEAD4;
  --r:24px;
  position:relative;
  min-height:100vh;
  background:var(--ink);
  color:var(--text);
  font-family:'Inter',system-ui,sans-serif;
  -webkit-font-smoothing:antialiased;
  overflow-x:hidden;
  line-height:1.6;
}
.bs-root *{box-sizing:border-box;}
.bs-root ::selection{background:var(--accent);color:var(--ink);}
.bs-root a{color:inherit;text-decoration:none;}
.accent{color:var(--accent);}
.grad{
  background:linear-gradient(100deg,var(--accent),var(--grow));
  -webkit-background-clip:text;background-clip:text;color:transparent;
}

/* layout */
.container{max-width:1180px;margin:0 auto;padding:0 24px;}
.section{padding:clamp(72px,11vw,140px) 0;position:relative;}
.h2{
  font-family:'Space Grotesk',sans-serif;
  font-weight:700;letter-spacing:-0.035em;line-height:1.05;
  font-size:clamp(30px,4.6vw,52px);margin:0;
}
.kicker{
  font-family:'JetBrains Mono',monospace;
  text-transform:uppercase;letter-spacing:0.32em;font-size:12px;
  color:var(--accent);margin:0 0 16px;font-weight:500;
}
.card{
  background:var(--card);
  border:1px solid var(--line);
  border-radius:var(--r);
  backdrop-filter:blur(14px);
}

/* progress + bg */
.progress{
  position:fixed;top:0;left:0;height:2px;width:100%;z-index:90;
  transform-origin:0 50%;
  background:linear-gradient(90deg,var(--accent),var(--grow));
  box-shadow:0 0 12px rgba(110,231,249,0.6);
}
.bg{position:fixed;inset:0;z-index:0;pointer-events:none;overflow:hidden;}
.orb{position:absolute;width:480px;height:480px;border-radius:50%;filter:blur(130px);opacity:.5;}
.orb-a{top:-12%;left:-8%;background:rgba(110,231,249,0.22);animation:float 22s ease-in-out infinite;}
.orb-b{top:24%;right:-10%;background:rgba(183,156,255,0.18);animation:float 26s ease-in-out infinite reverse;}
.grid-lines{
  position:absolute;inset:0;
  background-image:
    linear-gradient(to right,rgba(255,255,255,0.035) 1px,transparent 1px),
    linear-gradient(to bottom,rgba(255,255,255,0.035) 1px,transparent 1px);
  background-size:76px 76px;
  mask-image:radial-gradient(circle at 50% 20%,black,transparent 78%);
  -webkit-mask-image:radial-gradient(circle at 50% 20%,black,transparent 78%);
}
.vignette{position:absolute;inset:0;background:radial-gradient(circle at 50% 0%,transparent 55%,rgba(0,0,0,0.45));}
@keyframes float{0%,100%{transform:translate(0,0)}50%{transform:translate(30px,40px)}}

/* nav */
.nav{position:fixed;top:0;left:0;width:100%;z-index:80;
  border-bottom:1px solid var(--line);
  background:rgba(7,10,18,0.72);backdrop-filter:blur(18px);}
.nav-inner{max-width:1180px;margin:0 auto;padding:14px 24px;
  display:flex;align-items:center;justify-content:space-between;gap:16px;}
.brand{display:flex;align-items:center;gap:12px;}
.brand-mark{width:38px;height:38px;border-radius:12px;background:var(--text);
  color:var(--ink);display:grid;place-items:center;
  font-family:'Space Grotesk';font-weight:700;font-size:14px;}
.brand-name{font-family:'Space Grotesk';font-weight:700;letter-spacing:-0.02em;font-size:17px;}
.nav-links{display:flex;gap:30px;font-size:14.5px;color:var(--muted);font-weight:500;}
.nav-links a{position:relative;transition:color .2s;padding:4px 0;}
.nav-links a:hover{color:var(--text);}
.nav-links a.active{color:var(--text);}
.nav-links a.active::after{content:"";position:absolute;left:0;bottom:-2px;width:100%;height:2px;
  background:var(--accent);border-radius:2px;box-shadow:0 0 10px var(--accent);}
.nav-right{display:flex;align-items:center;gap:10px;}
.menu-btn{display:none;background:none;border:1px solid var(--line);
  color:var(--text);width:42px;height:42px;border-radius:12px;cursor:pointer;
  align-items:center;justify-content:center;}
.mobile-menu{display:none;flex-direction:column;gap:4px;padding:0 24px;
  max-height:0;overflow:hidden;transition:max-height .35s ease,padding .35s ease;}
.mobile-menu.open{max-height:420px;padding:8px 24px 22px;}
.mobile-menu a{padding:13px 4px;color:var(--muted);font-weight:500;
  border-bottom:1px solid var(--line);}
.mobile-menu a:last-child{border:none;margin-top:10px;}

/* buttons */
.btn{display:inline-flex;align-items:center;gap:8px;border-radius:999px;
  padding:13px 22px;font-weight:600;font-size:15px;cursor:pointer;
  border:1px solid transparent;transition:transform .2s,background .2s,border-color .2s,box-shadow .2s;}
.btn:hover{transform:translateY(-2px);}
.btn-solid{background:var(--accent);color:var(--ink);
  box-shadow:0 0 0 rgba(110,231,249,0);}
.btn-solid:hover{background:#fff;box-shadow:0 8px 30px rgba(110,231,249,0.25);}
.btn-ghost{border-color:var(--line);color:var(--text);background:rgba(255,255,255,0.02);}
.btn-ghost:hover{border-color:rgba(255,255,255,0.35);background:rgba(255,255,255,0.07);}

/* hero */
.hero{padding:clamp(120px,16vw,176px) 0 clamp(64px,9vw,108px);position:relative;z-index:1;}
.hero-grid{display:grid;grid-template-columns:1.05fr 0.95fr;gap:clamp(36px,5vw,64px);align-items:center;}
.eyebrow{display:inline-flex;align-items:center;gap:10px;
  border:1px solid rgba(110,231,249,0.25);background:rgba(110,231,249,0.08);
  color:var(--accent);border-radius:999px;padding:8px 16px;font-size:13px;font-weight:500;
  font-family:'JetBrains Mono',monospace;}
.pulse{width:8px;height:8px;border-radius:50%;background:var(--accent);
  box-shadow:0 0 14px var(--accent);animation:pulse 2s infinite;}
@keyframes pulse{0%,100%{opacity:1}50%{opacity:.35}}
.hero-title{font-family:'Space Grotesk',sans-serif;font-weight:700;
  letter-spacing:-0.045em;line-height:0.98;margin:22px 0 0;
  font-size:clamp(38px,7vw,76px);
  overflow-wrap:break-word;hyphens:auto;}
.hero-lead{margin:24px 0 0;max-width:540px;color:var(--muted);
  font-size:clamp(16px,2vw,18.5px);line-height:1.7;}
.hero-actions{display:flex;flex-wrap:wrap;gap:14px;margin-top:34px;}
.hero-stats{display:grid;grid-template-columns:repeat(3,1fr);gap:14px;margin:44px 0 0;}
.hero-stats div{border-left:1px solid var(--line);padding-left:14px;}
.hero-stats dt{color:var(--muted);font-size:13px;margin-bottom:6px;}
.hero-stats dd{margin:0;font-family:'Space Grotesk';font-weight:700;font-size:22px;}
.hero-copy,.hero-panel{min-width:0;}

/* hero panel */
.hero-panel{display:flex;flex-direction:column;gap:16px;}
.term{border:1px solid var(--line);border-radius:18px;overflow:hidden;
  background:var(--ink-2);box-shadow:0 30px 80px rgba(0,0,0,0.45);}
.term-bar{display:flex;align-items:center;gap:7px;padding:13px 16px;
  border-bottom:1px solid var(--line);background:rgba(255,255,255,0.02);}
.dot{width:11px;height:11px;border-radius:50%;}
.term-name{margin-left:auto;font-family:'JetBrains Mono';font-size:11.5px;color:var(--muted);}
.term-body{margin:0;padding:20px;font-family:'JetBrains Mono',monospace;
  font-size:13.5px;line-height:2;}
.term-body code{display:flex;flex-direction:column;}
.ln{display:block;}
.ln.pl{padding-left:22px;}
.kw{color:var(--accent-2);}
.vr{color:var(--accent);}
.op{color:var(--muted);}
.br{color:rgba(255,255,255,0.55);}
.st{color:var(--grow);}
.caret{color:var(--accent);animation:blink 1.1s steps(1) infinite;margin-left:2px;}
@keyframes blink{0%,50%{opacity:1}51%,100%{opacity:0}}

.growth-card{border:1px solid var(--line);border-radius:18px;padding:18px;
  background:var(--card);backdrop-filter:blur(14px);}
.growth-head{display:flex;align-items:center;justify-content:space-between;margin-bottom:6px;}
.growth-label{display:flex;align-items:center;gap:7px;font-size:13px;color:var(--muted);font-weight:500;}
.growth-label svg{color:var(--grow);}
.growth-eq{font-family:'JetBrains Mono';font-size:12px;color:var(--accent);
  background:rgba(110,231,249,0.08);padding:3px 9px;border-radius:8px;}
.growth-foot{display:flex;align-items:baseline;flex-wrap:wrap;gap:6px 12px;margin-top:8px;}
.grow-num{font-family:'Space Grotesk';font-weight:700;font-size:30px;color:var(--grow);}
.grow-cap{font-size:13px;color:var(--muted);}
.grow-note{flex-basis:100%;font-size:13px;color:var(--muted);margin:2px 0 0;}

/* curve animations */
.curve-line{stroke-dasharray:600;stroke-dashoffset:600;animation:draw 1.8s .3s ease forwards;}
.curve-area{opacity:0;animation:fadeArea 1s 1.4s ease forwards;}
.curve-dot{opacity:0;animation:fadeArea .4s 1.9s ease forwards;}
.curve-ping{transform-origin:center;opacity:0;animation:ping 1.8s 2.1s ease-out infinite;}
@keyframes draw{to{stroke-dashoffset:0}}
@keyframes fadeArea{to{opacity:1}}
@keyframes ping{0%{opacity:.7;transform:scale(1)}80%,100%{opacity:0;transform:scale(2.6)}}

/* about */
.about-grid{display:grid;grid-template-columns:0.8fr 1.2fr;gap:clamp(24px,4vw,56px);align-items:start;}
.about-text{display:grid;gap:18px;}
.about-text p{margin:0;color:var(--muted);font-size:17px;line-height:1.75;
  border-left:2px solid var(--line);padding-left:20px;}
.values{display:grid;grid-template-columns:repeat(3,1fr);gap:18px;margin-top:48px;}
.value-card{padding:28px;transition:transform .55s cubic-bezier(.2,.7,.2,1),opacity .55s,border-color .3s,background .3s;}
.value-card:hover{border-color:rgba(110,231,249,0.3);background:rgba(110,231,249,0.05);}
.value-no{font-family:'JetBrains Mono';font-size:13px;color:var(--accent);}
.value-card h3{font-family:'Space Grotesk';font-weight:700;font-size:21px;margin:14px 0 10px;}
.value-card p{margin:0;color:var(--muted);}

/* head */
.head{max-width:680px;margin-bottom:48px;}
.head-row{display:flex;justify-content:space-between;align-items:flex-end;gap:32px;max-width:none;}
.head-aside{max-width:330px;color:var(--muted);font-size:15px;flex-shrink:0;}

/* skills */
.skill-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:18px;}
.skill-col{padding:26px;transition:transform .55s cubic-bezier(.2,.7,.2,1),opacity .55s;}
.skill-title{display:flex;align-items:center;gap:8px;font-family:'Space Grotesk';
  font-weight:600;font-size:17px;margin:0 0 18px;}
.chips{list-style:none;margin:0;padding:0;display:flex;flex-wrap:wrap;gap:9px;}
.chips li,.chips span{font-size:13.5px;padding:7px 13px;border-radius:999px;
  border:1px solid var(--line);background:rgba(255,255,255,0.03);
  color:var(--text);font-family:'JetBrains Mono';transition:border-color .2s,color .2s;}
.chips li:hover{border-color:var(--accent);color:var(--accent);}
.chips-sm li,.chips-sm span{font-size:12px;padding:5px 11px;
  border-color:rgba(110,231,249,0.22);color:var(--accent);background:rgba(110,231,249,0.06);}

/* projects */
.projects{display:grid;grid-template-columns:repeat(3,1fr);gap:18px;}
.project{position:relative;overflow:hidden;padding:0;
  transition:transform .55s cubic-bezier(.2,.7,.2,1),opacity .55s,border-color .3s;}
.project:hover{transform:translateY(-6px);border-color:color-mix(in srgb,var(--c) 50%,transparent);}
.project-top{display:flex;justify-content:space-between;padding:22px 24px 0;
  font-family:'JetBrains Mono';font-size:12px;}
.project-no{color:var(--c);}
.project-year{color:var(--muted);}
.project-glow{position:absolute;top:0;left:0;right:0;height:140px;
  background:radial-gradient(120% 100% at 50% 0%,color-mix(in srgb,var(--c) 22%,transparent),transparent 70%);
  opacity:.6;transition:opacity .3s;pointer-events:none;}
.project:hover .project-glow{opacity:1;}
.project-body{padding:18px 24px 26px;position:relative;}
.project-label{font-family:'JetBrains Mono';font-size:12.5px;color:var(--c);margin:0 0 8px;}
.project-title{display:flex;align-items:center;justify-content:space-between;gap:8px;
  font-family:'Space Grotesk';font-weight:700;font-size:27px;margin:0 0 14px;}
.project-arrow{color:var(--muted);transition:transform .25s,color .25s;}
.project:hover .project-arrow{color:var(--c);transform:translate(3px,-3px);}
.project-desc{margin:0 0 18px;color:var(--muted);font-size:14.5px;line-height:1.7;}

/* timeline */
.timeline{position:relative;display:grid;gap:16px;}
.timeline::before{content:"";position:absolute;left:7px;top:8px;bottom:8px;width:2px;
  background:linear-gradient(var(--accent),transparent);opacity:.5;}
.tl-item{position:relative;display:grid;grid-template-columns:150px 1fr;gap:20px;
  padding-left:34px;align-items:start;
  transition:transform .55s cubic-bezier(.2,.7,.2,1),opacity .55s;}
.tl-node{position:absolute;left:0;top:24px;width:16px;height:16px;border-radius:50%;
  background:var(--ink);border:2px solid var(--accent);box-shadow:0 0 16px rgba(110,231,249,0.6);}
.tl-period{font-family:'JetBrains Mono';font-size:13px;color:var(--accent);padding-top:24px;}
.tl-content{padding:22px 24px;}
.tl-content h3{font-family:'Space Grotesk';font-weight:700;font-size:20px;margin:0 0 8px;}
.tl-content p{margin:0;color:var(--muted);font-size:15px;line-height:1.7;}

/* contact */
.contact{display:grid;grid-template-columns:1.1fr 0.9fr;overflow:hidden;}
.contact-main{padding:clamp(32px,5vw,56px);}
.contact-lead{max-width:440px;color:var(--muted);font-size:17px;margin:22px 0 0;}
.contact-actions{display:flex;flex-wrap:wrap;gap:12px;margin-top:32px;}
.contact-meta{background:var(--ink-2);border-left:1px solid var(--line);
  padding:clamp(28px,4vw,40px);display:flex;flex-direction:column;justify-content:center;gap:4px;}
.meta-row{display:flex;justify-content:space-between;align-items:center;gap:16px;
  padding:16px 0;border-bottom:1px solid var(--line);}
.meta-row:last-child{border:none;}
.meta-row span{color:var(--muted);font-size:14px;}
.meta-row strong{font-family:'Space Grotesk';font-weight:600;font-size:17px;}
.meta-loc{display:flex;align-items:center;gap:6px;}
.meta-email{font-family:'JetBrains Mono';font-size:14px;color:var(--accent);
  word-break:break-all;text-align:right;transition:opacity .2s;}
.meta-email:hover{opacity:.7;}

.footer{display:flex;justify-content:space-between;flex-wrap:wrap;gap:10px;
  padding:36px 4px 0;color:var(--muted);font-size:13.5px;}

/* reveal */
[data-reveal]{opacity:0;transform:translateY(26px);
  transition:opacity .65s cubic-bezier(.2,.7,.2,1),transform .65s cubic-bezier(.2,.7,.2,1);}
[data-reveal].is-in{opacity:1;transform:none;}

/* load (hero) */
.load{opacity:0;transform:translateY(20px);animation:rise .7s cubic-bezier(.2,.7,.2,1) forwards;}
.load-1{animation-delay:.05s}.load-2{animation-delay:.15s}.load-3{animation-delay:.25s}
.load-4{animation-delay:.35s}.load-5{animation-delay:.45s}.load-6{animation-delay:.55s}.load-7{animation-delay:.65s}
@keyframes rise{to{opacity:1;transform:none}}

/* focus */
.bs-root a:focus-visible,.bs-root button:focus-visible{
  outline:2px solid var(--accent);outline-offset:3px;border-radius:6px;}

/* responsive */
@media(max-width:980px){
  .hero-grid,.about-grid,.skill-grid,.projects,.contact{grid-template-columns:1fr;}
  .head-row{flex-direction:column;align-items:flex-start;}
  .head-aside{max-width:none;}
  .values{grid-template-columns:1fr 1fr;}
  .nav-links,.nav-cta{display:none;}
  .menu-btn,.mobile-menu{display:flex;}
}
@media(max-width:600px){
  .values{grid-template-columns:1fr;}
  .hero-stats{grid-template-columns:1fr;gap:0;}
  .hero-stats div{border-left:none;border-top:1px solid var(--line);padding:14px 0 0;}
  .tl-item{grid-template-columns:1fr;gap:8px;}
  .tl-period{padding-top:0;}
  .contact-meta{border-left:none;border-top:1px solid var(--line);}
  .meta-email{text-align:left;}

  /* hero passend maken */
  .hero-title{font-size:clamp(30px,8.5vw,42px);}
  .hero-lead{font-size:15.5px;}
  .term-body{font-size:11.5px;white-space:pre-wrap;word-break:break-word;}
  .hero-actions .btn{flex:1 1 100%;justify-content:center;}
  .hero-stats dt{font-size:12px;}
  .hero-stats dd{font-size:17px;}
}

@media(prefers-reduced-motion:reduce){
  .bs-root *{animation:none !important;transition:none !important;}
  [data-reveal]{opacity:1;transform:none;}
  .load{opacity:1;transform:none;}
  .curve-line{stroke-dashoffset:0;}
  .curve-area,.curve-dot{opacity:1;}
}
    `}</style>
  );
}
