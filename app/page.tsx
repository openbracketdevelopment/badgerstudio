"use client";

import gsap from "gsap";
import {
  ArrowRight,
  Instagram,
  Linkedin,
  Menu,
  MoveUpRight,
  Play,
  Twitter,
} from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { AgencyScene, ModelDropzone } from "../components/agency-scene";
import { TestimonialSlider } from "../components/testimonial-slider";
import { StudioMark } from "./studio-mark";

const services = [
  {
    icon: "∞",
    title: "Branding",
    copy: "Strategy, identity, and visual systems.",
  },
  {
    icon: "▣",
    title: "Web Design",
    copy: "Modern, memorable web experiences.",
  },
  {
    icon: "⌘",
    title: "Web Applications",
    copy: "Custom tools that solve real problems.",
  },
  { icon: "⌁", title: "Ecommerce", copy: "Powerful stores that convert." },
];

const process = [
  [
    "01",
    "Discovery",
    "We learn about your goals, audience, and opportunities.",
  ],
  ["02", "Strategy", "A clear plan tailored to your brand and users."],
  ["03", "Design", "Thoughtful, modern, and conversion-focused."],
  ["04", "Development", "Clean, scalable, and built for performance."],
  ["05", "Launch", "Test, optimize, and get it live."],
];

const work = [
  { name: "Fidium", type: "Website / Platform", className: "work-fidium" },
  { name: "Nexora", type: "Branding / Website", className: "work-nexora" },
  { name: "Loom", type: "Web Application", className: "work-loom" },
];

export default function Home() {
  const pageRef = useRef<HTMLElement>(null);
  const [isDark, setIsDark] = useState(true);
  const [modelUrl, setModelUrl] = useState<string | null>(null);

  const handleModelChange = useCallback((url: string | null) => {
    setModelUrl((previousUrl) => {
      if (previousUrl) URL.revokeObjectURL(previousUrl);
      return url;
    });
  }, []);

  useEffect(() => {
    const context = gsap.context(() => {
      gsap.from(
        ".landing-nav, .hero-eyebrow, .hero-title, .hero-description, .hero-actions",
        { y: 22, duration: 0.8, stagger: 0.08, ease: "power3.out" },
      );
      gsap.utils.toArray<HTMLElement>(".landing-reveal").forEach((element) => {
        gsap.from(element, {
          y: 36,
          opacity: 0,
          duration: 0.75,
          ease: "power3.out",
          scrollTrigger: { trigger: element, start: "top 86%", once: true },
        });
      });
    }, pageRef);
    return () => context.revert();
  }, []);

  return (
    <main
      ref={pageRef}
      className={`landing-page ${isDark ? "theme-dark" : "theme-light"}`}
    >
      <header className="landing-nav">
        <a className="landing-logo" href="#top" aria-label="Badger Studio home">
          <StudioMark />
          <span>
            BADGER
            <br />
            STUDIO
          </span>
        </a>
        <nav className="landing-menu" aria-label="Primary navigation">
          <a href="#services">Work</a>
          <a href="#services">Services</a>
          <a href="#about">About</a>
          <a href="#process">Process</a>
          <a href="#work">Journal</a>
          <a href="#contact">Contact</a>
        </nav>
        <div className="nav-tools">
          <button
            className="theme-toggle"
            type="button"
            onClick={() => setIsDark((value) => !value)}
            aria-label={`Switch to ${isDark ? "light" : "dark"} theme`}
          >
            <span>{isDark ? "Light" : "Dark"}</span>
            <i className={isDark ? "toggle-knob on" : "toggle-knob"} />
          </button>
          <a className="pink-button nav-cta" href="#contact">
            Let&apos;s build <MoveUpRight size={13} />
          </a>
          <button
            className="landing-mobile-menu"
            type="button"
            aria-label="Open menu"
          >
            <Menu size={19} />
          </button>
        </div>
      </header>

      <section className="landing-hero" id="top">
        <div className="hero-copy-wrap">
          <p className="hero-eyebrow">WEB. APPS. BRANDS.</p>
          <h1 className="hero-title">
            Ideas
            <br />
            into <em>Reality.</em>
          </h1>
          <p className="hero-description">
            Badger Studio designs, develops, and builds brands from soup to
            nuts. Strategy, design, code, content — all under one roof.
          </p>
          <div className="hero-actions">
            <a className="pink-button" href="#contact">
              Let&apos;s build <MoveUpRight size={14} />
            </a>
            <a className="watch-link" href="#work">
              <span className="play-circle">
                <Play size={10} fill="currentColor" />
              </span>{" "}
              Watch video
            </a>
          </div>
        </div>
        <div className="hero-visual">
          <div className="paint-swipe swipe-cyan" />
          <div className="paint-swipe swipe-pink" />
          <AgencyScene modelUrl={modelUrl} isDark={isDark} />
          <div className="hero-quote">
            GOOD
            <br />
            THINGS
            <br />
            <em>
              BUILD
              <br />
              HERE.
            </em>
          </div>
        </div>
        <ModelDropzone onModelChange={handleModelChange} />
        <div className="trusted">
          <span>TRUSTED BY 600+ COMPANIES</span>
          <div>
            <b>◒ Next.js</b>
            <b>▲ Vercel</b>
            <b>⬡ Payload</b>
            <b>▣ Shopify</b>
            <b>Fidium</b>
            <b>+ OTHERS</b>
          </div>
        </div>
      </section>

      <section className="landing-section services-block" id="services">
        <div className="section-kicker landing-reveal">WHAT WE DO</div>
        <div className="services-layout">
          <div className="section-intro landing-reveal">
            <h2>
              More than
              <br />
              <em>websites.</em>
            </h2>
            <p>
              We help ambitious brands turn ideas into real, working products.
              From strategy to launch — we handle it all.
            </p>
            <a className="under-link" href="#contact">
              All services <ArrowRight size={14} />
            </a>
          </div>
          <div className="service-grid">
            {services.map((service) => (
              <article
                className="service-tile landing-reveal"
                key={service.title}
              >
                <span className="service-icon">{service.icon}</span>
                <h3>{service.title}</h3>
                <p>{service.copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="landing-section process-block" id="process">
        <div className="section-kicker landing-reveal">OUR PROCESS</div>
        <div className="process-layout">
          <div className="section-intro landing-reveal">
            <h2>
              A clear path
              <br />
              from idea to <em>impact.</em>
            </h2>
            <p>
              We keep things simple, collaborative, and focused — so you get
              results without the runaround.
            </p>
            <a className="under-link" href="#contact">
              Our process <ArrowRight size={14} />
            </a>
          </div>
          <div className="process-list">
            {process.map(([number, title, copy]) => (
              <div className="process-item landing-reveal" key={number}>
                <span>{number}</span>
                <div>
                  <h3>{title}</h3>
                  <p>{copy}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="landing-section work-block" id="work">
        <div className="section-kicker landing-reveal">
          FEATURED WORK{" "}
          <a href="#contact">
            VIEW ALL WORK <ArrowRight size={14} />
          </a>
        </div>
        <div className="work-grid">
          {work.map((item) => (
            <article className="work-card landing-reveal" key={item.name}>
              <div className={`work-art ${item.className}`}>
                <span>{item.name}</span>
              </div>
              <h3>{item.name}</h3>
              <p>{item.type}</p>
            </article>
          ))}
        </div>
      </section>

      <TestimonialSlider />

      <section className="mountain-block">
        <div className="mountain-sky" />
        <div className="mountain-range range-back" />
        <div className="mountain-range range-front" />
        <span className="mountain-script script-one">
          KEEP
          <br />
          BUILDING.
        </span>
        <span className="mountain-script script-two">
          A SMALL STUDIO
          <br />
          FOR BIG IDEAS.
        </span>
        <div className="final-card landing-reveal">
          <div>
            <h2>Ready to build something different?</h2>
            <p>
              Let&apos;s create something bold, useful, and built to last.
              Whether you need a brand, a website, or a full-scale application —
              we&apos;re ready when you are.
            </p>
            <a className="pink-button" href="mailto:hello@badger.studio">
              Let&apos;s talk <MoveUpRight size={14} />
            </a>
          </div>
          <strong>
            IDEAS
            <br />
            APPS
            <br />
            BRANDS
            <br />
            <em>IMPACT</em>
          </strong>
        </div>
      </section>

      <footer className="landing-footer" id="contact">
        <div className="footer-brand">
          <StudioMark />
          <span>
            BADGER
            <br />
            STUDIO
          </span>
        </div>
        <div className="footer-columns">
          <div>
            <b>Work</b>
            <a href="#work">Fidium</a>
            <a href="#work">Nexora</a>
            <a href="#work">Loom</a>
          </div>
          <div>
            <b>Studio</b>
            <a href="#services">Services</a>
            <a href="#about">About</a>
            <a href="#process">Process</a>
            <a href="#contact">Contact</a>
          </div>
          <div>
            <b>Stay in the loop</b>
            <p>
              Get occasional updates, insights,
              <br />
              and things we&apos;re building.
            </p>
            <label>
              <input
                placeholder="Enter your email"
                aria-label="Email address"
              />
              <ArrowRight size={14} />
            </label>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© 2026 Badger Studio. All rights reserved.</span>
          <span>Good things build here.</span>
          <div>
            <Instagram size={14} />
            <Twitter size={14} />
            <Linkedin size={14} />
          </div>
        </div>
      </footer>
    </main>
  );
}
