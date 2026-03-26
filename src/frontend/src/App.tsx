import { AnimatePresence, motion } from "motion/react";
import { useCallback, useEffect, useState } from "react";
import { ParticleCanvas } from "./components/ParticleCanvas";

// ---------- THEME ----------
function useTheme() {
  const [dark, setDark] = useState<boolean>(() => {
    const saved = localStorage.getItem("theme");
    if (saved) return saved === "dark";
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  });

  useEffect(() => {
    if (dark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("theme", dark ? "dark" : "light");
  }, [dark]);

  const toggle = useCallback(() => setDark((d) => !d), []);
  return { dark, toggle };
}

// ---------- DATA ----------
const projects = [
  {
    title: "Customer Churn Analysis",
    period: "Mar '25 – Apr '25",
    desc: "End-to-end churn analysis pipeline: data cleaning, feature engineering, EDA, and ML classification. Delivered actionable retention insights through clear visualisations and predictive modelling.",
    tags: [
      "Python",
      "NumPy",
      "Pandas",
      "Matplotlib",
      "Seaborn",
      "Scikit-learn",
      "Logistic Regression",
      "Random Forest",
    ],
    github: "https://github.com/Hritikumar433",
  },
  {
    title: "Flight Delay Prediction",
    period: "Jun '24 – Aug '24",
    desc: "ML model predicting flight delays using historical and weather data. Analysed departure time, airline, and airport traffic factors to improve prediction accuracy with Logistic Regression and Random Forest.",
    tags: [
      "Python",
      "Pandas",
      "Scikit-learn",
      "Matplotlib",
      "Logistic Regression",
      "Random Forest",
    ],
    github: "https://github.com/Hritikumar433",
  },
];

const skills = [
  { category: "Languages", items: ["Python", "Java", "SQL", "JavaScript"] },
  {
    category: "ML / AI Tools",
    items: [
      "Pandas",
      "NumPy",
      "Matplotlib",
      "Seaborn",
      "OpenCV",
      "Scikit-learn",
    ],
  },
  {
    category: "Platforms",
    items: [
      "Git",
      "Jupyter Notebooks",
      "VSCode",
      "Google Colab",
      "Figma",
      "Kaggle",
    ],
  },
  {
    category: "Soft Skills",
    items: [
      "Problem-Solving",
      "Analytical Thinking",
      "Adaptability",
      "Time Management",
    ],
  },
];

type Certificate = {
  title: string;
  issuer: string;
  date: string;
  image?: string;
};
const certificates: Certificate[] = [
  {
    title: "Software Development Processes & Methodologies",
    issuer: "Infosys Springboard",
    date: "Nov '25",
    image:
      "/assets/uploads/screenshot_2025-12-12_003539-019d28bc-36b5-75c9-8470-548fde5d253c-1.png",
  },
  {
    title: "Prompt Engineering",
    issuer: "Infosys Springboard",
    date: "Jul '25",
    image:
      "/assets/uploads/screenshot_2025-12-12_003539_1-019d28cf-20ac-75cc-a90e-c6392e506cf5-1.png",
  },
  {
    title: "ChatGPT Prompt Engineering",
    issuer: "Infosys",
    date: "Sep '25",
    image:
      "/assets/uploads/screenshot_2025-12-12_003841-019d28b2-f105-72d9-8d7b-5c643d33c787-1.png",
  },
  {
    title: "Object Oriented Programming",
    issuer: "LPU",
    date: "Jun '25",
    image:
      "/assets/uploads/screenshot_2025-12-12_003346-019d28c0-6b71-74b0-a24b-07fbda475739-1.png",
  },
  { title: "DSA in C++", issuer: "Training", date: "May–Jun '25" },
];

// ---------- COMPONENTS ----------

function Logo() {
  return (
    <span
      style={{
        fontFamily: "'Courier New', monospace",
        fontWeight: 700,
        fontSize: "1.4rem",
        color: "var(--accent-gold)",
        letterSpacing: "0.04em",
        cursor: "pointer",
        display: "inline-block",
        transition: "transform 0.2s ease, text-shadow 0.2s ease",
      }}
      className="hover:scale-110"
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLSpanElement).style.textShadow =
          "0 0 16px rgba(37,99,235,0.7)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLSpanElement).style.textShadow = "none";
      }}
    >
      {"{ }"}
    </span>
  );
}

function ThemeToggle({ dark, toggle }: { dark: boolean; toggle: () => void }) {
  return (
    <button
      type="button"
      data-ocid="nav.toggle"
      onClick={toggle}
      aria-label="Toggle theme"
      style={{
        width: 44,
        height: 44,
        borderRadius: "50%",
        border: "1.5px solid var(--border-color)",
        background: "var(--bg-sand)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
        fontSize: "1.2rem",
        transition: "background 0.25s, border-color 0.25s, transform 0.2s",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLButtonElement).style.transform = "scale(1.1)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLButtonElement).style.transform = "scale(1)";
      }}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={dark ? "moon" : "sun"}
          initial={{ opacity: 0, rotate: -90, scale: 0.5 }}
          animate={{ opacity: 1, rotate: 0, scale: 1 }}
          exit={{ opacity: 0, rotate: 90, scale: 0.5 }}
          transition={{ duration: 0.3 }}
        >
          {dark ? "🌙" : "☀️"}
        </motion.span>
      </AnimatePresence>
    </button>
  );
}

function NavBar({
  dark,
  toggleTheme,
}: { dark: boolean; toggleTheme: () => void }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navLinks = [
    { label: "About", href: "#about" },
    { label: "Projects", href: "#projects" },
    { label: "Skills", href: "#skills" },
    { label: "Education", href: "#education" },
    { label: "Contact", href: "#contact" },
    {
      label: "Resume",
      href: "/assets/uploads/iiiiiiiii_1-019d26c9-105b-77cb-a980-4cf28b774258-1.pdf",
      external: true,
    },
  ];

  return (
    <header
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        background: scrolled
          ? dark
            ? "rgba(12,18,33,0.90)"
            : "rgba(244,247,252,0.90)"
          : "transparent",
        borderBottom: scrolled
          ? "1px solid var(--border-color)"
          : "1px solid transparent",
        transition: "background 0.3s, border-color 0.3s",
      }}
    >
      <nav
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "0 1.5rem",
          height: 68,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {/* Logo */}
        <a
          href="#hero"
          style={{
            textDecoration: "none",
            display: "flex",
            alignItems: "center",
            gap: 8,
          }}
        >
          <Logo />
          <span
            style={{
              fontSize: "0.78rem",
              color: "var(--text-sub)",
              fontWeight: 500,
              letterSpacing: "0.06em",
              marginTop: 2,
            }}
          >
            AI/ML Engineer
          </span>
        </a>

        {/* Desktop nav */}
        <div
          style={{ display: "flex", alignItems: "center", gap: 6 }}
          className="hidden md:flex"
        >
          {navLinks.map((l) => (
            <a
              key={l.href}
              data-ocid={"nav.link"}
              href={l.href}
              target={l.external ? "_blank" : undefined}
              rel={l.external ? "noopener noreferrer" : undefined}
              style={{
                padding: "6px 14px",
                fontSize: "0.85rem",
                fontWeight: 500,
                letterSpacing: "0.05em",
                color: "var(--text-sub)",
                textDecoration: "none",
                borderRadius: 999,
                transition: "color 0.2s, background 0.2s",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.color =
                  "var(--accent-gold)";
                (e.currentTarget as HTMLAnchorElement).style.background =
                  "var(--bg-sand)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.color =
                  "var(--text-sub)";
                (e.currentTarget as HTMLAnchorElement).style.background =
                  "transparent";
              }}
            >
              {l.label}
            </a>
          ))}

          <a
            data-ocid="nav.primary_button"
            href="#contact"
            style={{
              marginLeft: 8,
              padding: "8px 20px",
              background: "var(--accent-gold)",
              color: "#fff",
              borderRadius: 999,
              fontSize: "0.85rem",
              fontWeight: 600,
              letterSpacing: "0.04em",
              textDecoration: "none",
              transition: "opacity 0.2s, transform 0.2s",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.opacity = "0.85";
              (e.currentTarget as HTMLAnchorElement).style.transform =
                "scale(1.04)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.opacity = "1";
              (e.currentTarget as HTMLAnchorElement).style.transform =
                "scale(1)";
            }}
          >
            Get in Touch
          </a>
        </div>

        {/* Mobile right */}
        <div
          style={{ display: "flex", alignItems: "center", gap: 10 }}
          className="flex md:hidden"
        >
          <button
            type="button"
            data-ocid="nav.toggle"
            onClick={() => setMenuOpen((o) => !o)}
            aria-label="Toggle menu"
            style={{
              width: 40,
              height: 40,
              borderRadius: 8,
              border: "1.5px solid var(--border-color)",
              background: "var(--bg-sand)",
              cursor: "pointer",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: 5,
            }}
          >
            <span
              style={{
                width: 18,
                height: 2,
                background: "var(--text-main)",
                borderRadius: 2,
                transition: "all 0.2s",
                transform: menuOpen
                  ? "rotate(45deg) translate(5px,5px)"
                  : "none",
              }}
            />
            <span
              style={{
                width: 18,
                height: 2,
                background: "var(--text-main)",
                borderRadius: 2,
                transition: "all 0.2s",
                opacity: menuOpen ? 0 : 1,
              }}
            />
            <span
              style={{
                width: 18,
                height: 2,
                background: "var(--text-main)",
                borderRadius: 2,
                transition: "all 0.2s",
                transform: menuOpen
                  ? "rotate(-45deg) translate(5px,-5px)"
                  : "none",
              }}
            />
          </button>
        </div>
        <ThemeToggle dark={dark} toggle={toggleTheme} />
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            style={{
              background: dark
                ? "rgba(12,18,33,0.97)"
                : "rgba(244,247,252,0.97)",
              borderBottom: "1px solid var(--border-color)",
              padding: "1rem 1.5rem 1.5rem",
            }}
          >
            {navLinks.map((l) => (
              <a
                key={l.href}
                href={l.href}
                target={l.external ? "_blank" : undefined}
                rel={l.external ? "noopener noreferrer" : undefined}
                onClick={() => setMenuOpen(false)}
                style={{
                  display: "block",
                  padding: "10px 0",
                  color: "var(--text-main)",
                  fontWeight: 500,
                  fontSize: "1rem",
                  textDecoration: "none",
                  borderBottom: "1px solid var(--border-color)",
                  letterSpacing: "0.04em",
                }}
              >
                {l.label}
              </a>
            ))}
            <button
              type="button"
              onClick={() => {
                setMenuOpen(false);
                window.location.hash = "#contact";
              }}
              style={{
                display: "inline-block",
                marginTop: 16,
                padding: "10px 24px",
                background: "var(--accent-gold)",
                color: "#fff",
                borderRadius: 999,
                fontWeight: 600,
                border: "none",
                cursor: "pointer",
              }}
            >
              Get in Touch
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

function HeroSection() {
  return (
    <section
      id="hero"
      style={{
        display: "flex",
        alignItems: "center",
        position: "relative",
        zIndex: 2,
        padding: "80px 1.5rem 0px",
      }}
    >
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          width: "100%",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "3rem",
          alignItems: "center",
        }}
        className="grid-cols-1 md:grid-cols-2"
      >
        {/* Left content */}
        <div>
          <p className="section-label fade-up-1" style={{ marginBottom: 16 }}>
            Welcome to my portfolio
          </p>

          <h1
            className="fade-up-2"
            style={{
              fontSize: "clamp(2.4rem, 5vw, 4rem)",
              fontWeight: 800,
              lineHeight: 1.1,
              letterSpacing: "0.02em",
              color: "var(--text-main)",
              marginBottom: 12,
            }}
          >
            Hi, I'm{" "}
            <span style={{ color: "var(--accent-gold)" }}>Hritik Kumar</span>
          </h1>

          <div
            className="fade-up-3"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              background: "var(--bg-sand)",
              border: "1px solid var(--border-color)",
              borderRadius: 999,
              padding: "6px 18px",
              marginBottom: 20,
            }}
          >
            <span
              style={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                background: "var(--accent-gold)",
                boxShadow: "0 0 8px var(--accent-gold)",
                display: "inline-block",
              }}
            />
            <span
              style={{
                fontSize: "0.9rem",
                fontWeight: 600,
                color: "var(--text-sub)",
                letterSpacing: "0.06em",
              }}
            >
              AI / ML Engineer
            </span>
          </div>

          <p
            className="fade-up-3"
            style={{
              fontSize: "1.1rem",
              lineHeight: 1.7,
              color: "var(--text-sub)",
              marginBottom: 32,
              maxWidth: 480,
            }}
          >
            Building intelligent systems that solve real-world problems.
            Passionate about data, machine learning, and turning complex
            analysis into clear insights.
          </p>

          <div
            className="fade-up-4"
            style={{ display: "flex", gap: 14, flexWrap: "wrap" }}
          >
            <a
              data-ocid="hero.primary_button"
              href="#projects"
              style={{
                padding: "12px 28px",
                background: "var(--accent-gold)",
                color: "#fff",
                borderRadius: 999,
                fontWeight: 600,
                fontSize: "0.95rem",
                textDecoration: "none",
                transition: "opacity 0.2s, transform 0.2s",
                letterSpacing: "0.04em",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.opacity = "0.85";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.opacity = "1";
              }}
            >
              View My Work
            </a>
            <a
              data-ocid="hero.secondary_button"
              href="#contact"
              style={{
                padding: "12px 28px",
                background: "transparent",
                color: "var(--accent-gold)",
                border: "1.5px solid var(--accent-gold)",
                borderRadius: 999,
                fontWeight: 600,
                fontSize: "0.95rem",
                textDecoration: "none",
                transition: "background 0.2s, color 0.2s",
                letterSpacing: "0.04em",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.background =
                  "var(--accent-gold)";
                (e.currentTarget as HTMLAnchorElement).style.color = "#fff";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.background =
                  "transparent";
                (e.currentTarget as HTMLAnchorElement).style.color =
                  "var(--accent-gold)";
              }}
            >
              Contact Me
            </a>
            <a
              href="/assets/uploads/iiiiiiiii_1-019d26c9-105b-77cb-a980-4cf28b774258-1.pdf"
              download="Hritik_Kumar_Resume.pdf"
              style={{
                padding: "12px 28px",
                background: "var(--bg-sand)",
                color: "var(--text-main)",
                border: "1.5px solid var(--border-color)",
                borderRadius: 999,
                fontWeight: 600,
                fontSize: "0.95rem",
                textDecoration: "none",
                transition: "background 0.2s, color 0.2s, border-color 0.2s",
                letterSpacing: "0.04em",
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.background =
                  "var(--accent-gold)";
                (e.currentTarget as HTMLAnchorElement).style.color = "#fff";
                (e.currentTarget as HTMLAnchorElement).style.borderColor =
                  "var(--accent-gold)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.background =
                  "var(--bg-sand)";
                (e.currentTarget as HTMLAnchorElement).style.color =
                  "var(--text-main)";
                (e.currentTarget as HTMLAnchorElement).style.borderColor =
                  "var(--border-color)";
              }}
            >
              ↓ Download Resume
            </a>
          </div>

          {/* Stats */}
          <div
            className="fade-up-5"
            style={{
              display: "flex",
              gap: 32,
              marginTop: 40,
              flexWrap: "wrap",
            }}
          >
            {[
              { num: "2+", label: "ML Projects" },
              { num: "5+", label: "Certificates" },
              { num: "B.Tech", label: "CSE at LPU" },
            ].map((s) => (
              <div key={s.label}>
                <div
                  style={{
                    fontSize: "1.6rem",
                    fontWeight: 800,
                    color: "var(--accent-gold)",
                    lineHeight: 1,
                  }}
                >
                  {s.num}
                </div>
                <div
                  style={{
                    fontSize: "0.78rem",
                    color: "var(--text-sub)",
                    marginTop: 4,
                    letterSpacing: "0.06em",
                    fontWeight: 500,
                  }}
                >
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: laptop illustration */}
        <div
          className="fade-up-3 hidden md:flex"
          style={{
            justifyContent: "center",
            alignItems: "center",
            position: "relative",
          }}
        >
          {/* Glow behind laptop */}
          <div
            style={{
              position: "absolute",
              width: 300,
              height: 300,
              borderRadius: "50%",
              background: "var(--accent-gold)",
              opacity: 0.12,
              filter: "blur(60px)",
              zIndex: 0,
            }}
          />

          <div
            className="float-anim"
            style={{ position: "relative", zIndex: 1 }}
          >
            <img
              src="/assets/generated/laptop-illustration-transparent.dim_600x500.png"
              alt="Developer workspace illustration"
              style={{
                width: "100%",
                maxWidth: 480,
                filter: "drop-shadow(0 24px 48px rgba(139,111,71,0.25))",
              }}
            />

            {/* Floating code symbols */}
            <span
              className="code-float-1"
              style={{
                position: "absolute",
                top: "15%",
                right: "-20px",
                fontFamily: "'Courier New', monospace",
                fontSize: "1.2rem",
                fontWeight: 700,
                color: "var(--accent-gold)",
                opacity: 0.7,
                background: "var(--bg-card)",
                border: "1px solid var(--border-color)",
                borderRadius: 8,
                padding: "4px 10px",
                boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
              }}
            >
              {"{ }"}
            </span>
            <span
              className="code-float-2"
              style={{
                position: "absolute",
                bottom: "22%",
                left: "-15px",
                fontFamily: "'Courier New', monospace",
                fontSize: "1rem",
                fontWeight: 700,
                color: "var(--accent-brown)",
                opacity: 0.65,
                background: "var(--bg-card)",
                border: "1px solid var(--border-color)",
                borderRadius: 8,
                padding: "4px 10px",
                boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
              }}
            >
              {"</>"}
            </span>
            <span
              className="code-float-3"
              style={{
                position: "absolute",
                top: "5%",
                left: "20%",
                width: 10,
                height: 10,
                borderRadius: "50%",
                background: "var(--accent-gold)",
                opacity: 0.5,
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function AboutSection() {
  return (
    <section
      id="about"
      style={{
        position: "relative",
        zIndex: 2,
        padding: "20px 1.5rem",
      }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div
          style={{
            background: "var(--bg-card)",
            border: "1px solid var(--border-color)",
            borderRadius: 20,
            padding: "clamp(2rem,4vw,3.5rem)",
            boxShadow: "0 4px 24px rgba(0,0,0,0.06)",
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "3rem",
            alignItems: "center",
          }}
          className="grid-cols-1 md:grid-cols-2"
        >
          <div>
            <p className="section-label" style={{ marginBottom: 12 }}>
              Who I Am
            </p>
            <h2
              style={{
                fontSize: "clamp(1.8rem,3vw,2.6rem)",
                fontWeight: 800,
                color: "var(--text-main)",
                letterSpacing: "0.02em",
                marginBottom: 20,
                lineHeight: 1.2,
              }}
            >
              Curious mind,{" "}
              <span style={{ color: "var(--accent-gold)" }}>data-driven</span>{" "}
              thinker
            </h2>
            <p
              style={{
                color: "var(--text-sub)",
                lineHeight: 1.8,
                fontSize: "0.97rem",
                marginBottom: 16,
              }}
            >
              I'm Hritik Kumar, a B.Tech CSE student at Lovely Professional
              University with a deep passion for Artificial Intelligence and
              Machine Learning. My journey into data science began with a simple
              question:{" "}
              <em>how can patterns in data solve real human problems?</em>
            </p>
            <p
              style={{
                color: "var(--text-sub)",
                lineHeight: 1.8,
                fontSize: "0.97rem",
                marginBottom: 16,
              }}
            >
              I specialise in end-to-end ML pipelines — from raw data wrangling
              and exploratory analysis to building and evaluating predictive
              models. I believe good data science is equal parts rigorous
              engineering and clear storytelling.
            </p>
            <p
              style={{
                color: "var(--text-sub)",
                lineHeight: 1.8,
                fontSize: "0.97rem",
              }}
            >
              Outside of code, I invest in DSA, certifications, and staying
              current with the evolving AI landscape.
            </p>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {[
              {
                icon: "🧠",
                title: "Machine Learning",
                desc: "Building predictive models and classification systems with Scikit-learn",
              },
              {
                icon: "📊",
                title: "Data Analytics",
                desc: "EDA, feature engineering, and insight-driven visualisation",
              },
              {
                icon: "🔧",
                title: "Problem Solving",
                desc: "DSA fundamentals in C++ and algorithmic thinking",
              },
              {
                icon: "📈",
                title: "Business Impact",
                desc: "Translating ML outputs into actionable retention and optimisation strategies",
              },
            ].map((item) => (
              <div
                key={item.title}
                style={{
                  display: "flex",
                  gap: 14,
                  alignItems: "flex-start",
                  background: "var(--bg-sand)",
                  border: "1px solid var(--border-color)",
                  borderRadius: 14,
                  padding: "14px 18px",
                  transition: "transform 0.2s",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLDivElement).style.transform =
                    "translateX(4px)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLDivElement).style.transform =
                    "translateX(0)";
                }}
              >
                <span style={{ fontSize: "1.4rem" }}>{item.icon}</span>
                <div>
                  <div
                    style={{
                      fontWeight: 700,
                      fontSize: "0.9rem",
                      color: "var(--text-main)",
                      marginBottom: 3,
                    }}
                  >
                    {item.title}
                  </div>
                  <div
                    style={{
                      fontSize: "0.82rem",
                      color: "var(--text-sub)",
                      lineHeight: 1.5,
                    }}
                  >
                    {item.desc}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function ProjectsSection() {
  return (
    <section
      id="projects"
      style={{ position: "relative", zIndex: 2, padding: "80px 1.5rem" }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <p className="section-label" style={{ marginBottom: 12 }}>
            What I've Built
          </p>
          <h2
            style={{
              fontSize: "clamp(1.8rem,3vw,2.6rem)",
              fontWeight: 800,
              color: "var(--text-main)",
              letterSpacing: "0.02em",
            }}
          >
            Featured{" "}
            <span style={{ color: "var(--accent-gold)" }}>Projects</span>
          </h2>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(320px,1fr))",
            gap: 24,
          }}
        >
          {projects.map((p, i) => (
            <motion.div
              key={p.title}
              data-ocid={`projects.item.${i + 1}`}
              className="project-card"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              style={{
                background: "var(--bg-card)",
                border: "1px solid var(--border-color)",
                borderRadius: 20,
                padding: "2rem",
                boxShadow: "0 4px 20px rgba(0,0,0,0.06)",
                display: "flex",
                flexDirection: "column",
                gap: 14,
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                  gap: 8,
                }}
              >
                <h3
                  style={{
                    fontWeight: 800,
                    fontSize: "1.1rem",
                    color: "var(--text-main)",
                    lineHeight: 1.3,
                  }}
                >
                  {p.title}
                </h3>
                <span
                  style={{
                    fontSize: "0.72rem",
                    color: "var(--text-sub)",
                    background: "var(--bg-sand)",
                    border: "1px solid var(--border-color)",
                    borderRadius: 999,
                    padding: "3px 10px",
                    whiteSpace: "nowrap",
                    flexShrink: 0,
                  }}
                >
                  {p.period}
                </span>
              </div>

              <p
                style={{
                  fontSize: "0.88rem",
                  color: "var(--text-sub)",
                  lineHeight: 1.7,
                  flexGrow: 1,
                }}
              >
                {p.desc}
              </p>

              <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                {p.tags.map((tag) => (
                  <span key={tag} className="skill-pill">
                    {tag}
                  </span>
                ))}
              </div>

              <a
                data-ocid={`projects.button.${i + 1}`}
                href={p.github}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  padding: "9px 20px",
                  background: "transparent",
                  color: "var(--accent-gold)",
                  border: "1.5px solid var(--accent-gold)",
                  borderRadius: 999,
                  fontWeight: 600,
                  fontSize: "0.83rem",
                  textDecoration: "none",
                  transition: "background 0.2s, color 0.2s",
                  marginTop: 4,
                  width: "fit-content",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.background =
                    "var(--accent-gold)";
                  (e.currentTarget as HTMLAnchorElement).style.color = "#fff";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.background =
                    "transparent";
                  (e.currentTarget as HTMLAnchorElement).style.color =
                    "var(--accent-gold)";
                }}
              >
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                  role="img"
                >
                  <title>GitHub</title>
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                </svg>
                View on GitHub
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function SkillsSection() {
  return (
    <section
      id="skills"
      style={{ position: "relative", zIndex: 2, padding: "80px 1.5rem" }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <p className="section-label" style={{ marginBottom: 12 }}>
            What I Know
          </p>
          <h2
            style={{
              fontSize: "clamp(1.8rem,3vw,2.6rem)",
              fontWeight: 800,
              color: "var(--text-main)",
              letterSpacing: "0.02em",
            }}
          >
            Skills &{" "}
            <span style={{ color: "var(--accent-gold)" }}>Expertise</span>
          </h2>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))",
            gap: 24,
          }}
        >
          {skills.map((group, gi) => (
            <motion.div
              key={group.category}
              data-ocid={`skills.item.${gi + 1}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: gi * 0.1 }}
              style={{
                background: "var(--bg-card)",
                border: "1px solid var(--border-color)",
                borderRadius: 18,
                padding: "1.5rem",
                boxShadow: "0 4px 16px rgba(0,0,0,0.05)",
              }}
            >
              <h3
                style={{
                  fontWeight: 700,
                  fontSize: "0.88rem",
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  color: "var(--accent-gold)",
                  marginBottom: 16,
                }}
              >
                {group.category}
              </h3>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {group.items.map((item) => (
                  <span key={item} className="skill-pill">
                    {item}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function EducationSection() {
  return (
    <section
      id="education"
      style={{ position: "relative", zIndex: 2, padding: "80px 1.5rem" }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <p className="section-label" style={{ marginBottom: 12 }}>
            Background
          </p>
          <h2
            style={{
              fontSize: "clamp(1.8rem,3vw,2.6rem)",
              fontWeight: 800,
              color: "var(--text-main)",
              letterSpacing: "0.02em",
            }}
          >
            Education &{" "}
            <span style={{ color: "var(--accent-gold)" }}>Certificates</span>
          </h2>
        </div>

        <div
          style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 32 }}
          className="grid-cols-1 md:grid-cols-2"
        >
          {/* Education */}
          <div>
            <h3
              style={{
                fontWeight: 700,
                fontSize: "1rem",
                color: "var(--text-sub)",
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                marginBottom: 20,
              }}
            >
              Education
            </h3>
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {[
                {
                  institution: "Lovely Professional University",
                  degree: "B.Tech CSE",
                  detail: "CGPA: 6.42",
                  period: "Aug '23 – Present",
                  location: "Phagwara, Punjab",
                },
                {
                  institution: "Delhi Public School",
                  degree: "Intermediate – PCM",
                  detail: "73.2%",
                  period: "Apr '22 – Mar '23",
                  location: "Delhi",
                },
                {
                  institution: "Delhi Public School",
                  degree: "Matriculation",
                  detail: "94.2%",
                  period: "Apr '20 – May '21",
                  location: "Delhi",
                },
              ].map((e, i) => (
                <motion.div
                  key={e.institution + e.degree}
                  data-ocid={`education.item.${i + 1}`}
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  style={{
                    background: "var(--bg-card)",
                    border: "1px solid var(--border-color)",
                    borderRadius: 16,
                    padding: "1.2rem 1.5rem",
                    borderLeft: "3px solid var(--accent-gold)",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "flex-start",
                    }}
                  >
                    <div>
                      <div
                        style={{
                          fontWeight: 700,
                          fontSize: "0.95rem",
                          color: "var(--text-main)",
                        }}
                      >
                        {e.institution}
                      </div>
                      <div
                        style={{
                          fontSize: "0.85rem",
                          color: "var(--text-sub)",
                          marginTop: 3,
                        }}
                      >
                        {e.degree} · {e.detail}
                      </div>
                      <div
                        style={{
                          fontSize: "0.78rem",
                          color: "var(--text-sub)",
                          marginTop: 4,
                          opacity: 0.7,
                        }}
                      >
                        {e.location}
                      </div>
                    </div>
                    <span
                      style={{
                        fontSize: "0.72rem",
                        color: "var(--accent-gold)",
                        background: "var(--bg-sand)",
                        border: "1px solid var(--border-color)",
                        borderRadius: 999,
                        padding: "3px 10px",
                        whiteSpace: "nowrap",
                        flexShrink: 0,
                      }}
                    >
                      {e.period}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Certificates */}
          <div>
            <h3
              style={{
                fontWeight: 700,
                fontSize: "1rem",
                color: "var(--text-sub)",
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                marginBottom: 20,
              }}
            >
              Certificates
            </h3>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {certificates.map((c, i) => (
                <motion.div
                  key={c.title}
                  data-ocid={`certificates.item.${i + 1}`}
                  initial={{ opacity: 0, x: 16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                  style={{
                    background: "var(--bg-card)",
                    border: "1px solid var(--border-color)",
                    borderRadius: 14,
                    padding: "1rem 1.3rem",
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                  }}
                >
                  <span style={{ fontSize: "1.1rem" }}>🏅</span>
                  <div style={{ flexGrow: 1 }}>
                    <div
                      style={{
                        fontWeight: 600,
                        fontSize: "0.88rem",
                        color: "var(--text-main)",
                      }}
                    >
                      {c.title}
                    </div>
                    {c.issuer && (
                      <div
                        style={{
                          fontSize: "0.78rem",
                          color: "var(--text-sub)",
                          marginTop: 2,
                        }}
                      >
                        {c.issuer}
                      </div>
                    )}
                  </div>
                  <span
                    style={{
                      fontSize: "0.72rem",
                      color: "var(--accent-gold)",
                      fontWeight: 600,
                      flexShrink: 0,
                    }}
                  >
                    {c.date}
                  </span>
                  {c.image && (
                    <button
                      type="button"
                      onClick={() => window.open(c.image, "_blank")}
                      style={{
                        background:
                          "linear-gradient(135deg, #C2A878 0%, #8B6F47 100%)",
                        border: "none",
                        padding: "5px 12px",
                        cursor: "pointer",
                        flexShrink: 0,
                        borderRadius: 20,
                        display: "flex",
                        alignItems: "center",
                        gap: 5,
                        color: "#FAF3E0",
                        fontSize: "0.7rem",
                        fontWeight: 700,
                        letterSpacing: "0.05em",
                        transition: "all 0.25s ease",
                        boxShadow: "0 2px 8px rgba(139,111,71,0.3)",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.boxShadow =
                          "0 0 12px rgba(194,168,120,0.5)";
                        e.currentTarget.style.transform = "scale(1.05)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.boxShadow =
                          "0 2px 8px rgba(139,111,71,0.3)";
                        e.currentTarget.style.transform = "scale(1)";
                      }}
                    >
                      <svg
                        width="11"
                        height="11"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-label="View Certificate"
                        role="img"
                      >
                        <title>View Certificate</title>
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                        <polyline points="14 2 14 8 20 8" />
                        <line x1="16" y1="13" x2="8" y2="13" />
                        <line x1="16" y1="17" x2="8" y2="17" />
                        <polyline points="10 9 9 9 8 9" />
                      </svg>
                      View Certificate
                    </button>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ContactSection() {
  return (
    <section
      id="contact"
      style={{ position: "relative", zIndex: 2, padding: "80px 1.5rem" }}
    >
      <div style={{ maxWidth: 800, margin: "0 auto" }}>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          style={{
            background: "var(--bg-sand)",
            border: "1px solid var(--border-color)",
            borderRadius: 24,
            padding: "clamp(2rem,4vw,3.5rem)",
            boxShadow: "0 8px 40px rgba(0,0,0,0.08)",
            textAlign: "center",
          }}
        >
          <p className="section-label" style={{ marginBottom: 12 }}>
            Get In Touch
          </p>
          <h2
            style={{
              fontSize: "clamp(2rem,4vw,3rem)",
              fontWeight: 800,
              color: "var(--text-main)",
              letterSpacing: "0.02em",
              marginBottom: 12,
            }}
          >
            Let's <span style={{ color: "var(--accent-gold)" }}>Connect.</span>
          </h2>
          <p
            style={{
              color: "var(--text-sub)",
              fontSize: "0.97rem",
              lineHeight: 1.7,
              marginBottom: 40,
              maxWidth: 500,
              margin: "0 auto 40px",
            }}
          >
            Whether you have a project in mind, want to collaborate, or just
            want to say hello — I'd love to hear from you.
          </p>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit,minmax(180px,1fr))",
              gap: 16,
              marginBottom: 32,
            }}
          >
            {[
              {
                icon: "💼",
                label: "LinkedIn",
                value: "hritikkumar433",
                href: "https://linkedin.com/in/hritikkumar433",
              },
              {
                icon: "🐙",
                label: "GitHub",
                value: "Hritikumar433",
                href: "https://github.com/Hritikumar433",
              },
              {
                icon: "✉️",
                label: "Email",
                value: "hritiksingh433@gmail.com",
                href: "mailto:hritiksingh433@gmail.com",
              },
              {
                icon: "📱",
                label: "Mobile",
                value: "+91 8630579501",
                href: "tel:+918630579501",
              },
            ].map((contact) => (
              <a
                key={contact.label}
                data-ocid={"contact.link"}
                href={contact.href}
                target={contact.href.startsWith("http") ? "_blank" : undefined}
                rel={
                  contact.href.startsWith("http")
                    ? "noopener noreferrer"
                    : undefined
                }
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 8,
                  padding: "1.2rem 1rem",
                  background: "var(--bg-card)",
                  border: "1.5px solid var(--border-color)",
                  borderRadius: 16,
                  textDecoration: "none",
                  transition:
                    "transform 0.2s, border-color 0.2s, box-shadow 0.2s",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.transform =
                    "translateY(-4px)";
                  (e.currentTarget as HTMLAnchorElement).style.borderColor =
                    "var(--accent-gold)";
                  (e.currentTarget as HTMLAnchorElement).style.boxShadow =
                    "0 8px 24px rgba(0,0,0,0.10)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.transform =
                    "translateY(0)";
                  (e.currentTarget as HTMLAnchorElement).style.borderColor =
                    "var(--border-color)";
                  (e.currentTarget as HTMLAnchorElement).style.boxShadow =
                    "none";
                }}
              >
                <span style={{ fontSize: "1.6rem" }}>{contact.icon}</span>
                <span
                  style={{
                    fontSize: "0.72rem",
                    fontWeight: 600,
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    color: "var(--text-sub)",
                  }}
                >
                  {contact.label}
                </span>
                <span
                  style={{
                    fontSize: "0.82rem",
                    color: "var(--accent-brown)",
                    fontWeight: 500,
                    wordBreak: "break-all",
                    textAlign: "center",
                  }}
                >
                  {contact.value}
                </span>
              </a>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ---------- APP ----------
export default function App() {
  const { dark, toggle } = useTheme();

  return (
    <div
      style={{
        background: "var(--bg-main)",
        position: "relative",
      }}
    >
      {/* Background layers */}
      <div className="blob blob-1" />
      <div className="blob blob-2" />
      <div className="blob blob-3" />
      <div className="blob blob-4" />
      <ParticleCanvas />
      <div className="grain-overlay" />

      {/* Content */}
      <NavBar dark={dark} toggleTheme={toggle} />
      <main style={{ position: "relative", zIndex: 2 }}>
        <HeroSection />
        <AboutSection />
        <ProjectsSection />
        <SkillsSection />
        <EducationSection />
        <ContactSection />
      </main>
    </div>
  );
}
