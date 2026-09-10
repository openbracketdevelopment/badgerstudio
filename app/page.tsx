"use client";

import gsap from "gsap";
import { ArrowDownRight, ArrowUpRight, Menu } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { AgencyScene, ModelDropzone } from "../components/agency-scene";
import { StudioMark } from "./studio-mark";

const services = [
  {
    number: "01",
    title: "Brand worlds",
    copy: "Positioning, identity systems, and the visual language that gives a good idea a point of view.",
    tag: "Strategy + identity",
  },
  {
    number: "02",
    title: "Digital experiences",
    copy: "Websites and products that feel considered in every interaction, from the first scroll to the last click.",
    tag: "UX + development",
  },
  {
    number: "03",
    title: "Motion + 3D",
    copy: "Living identities, cinematic launches, and dimensional moments that make your work hard to forget.",
    tag: "Animation + 3D",
  },
];

const projects = [
  {
    client: "Morrow Health",
    title: "A new ritual for everyday care",
    type: "Brand + digital",
    color: "project-saffron",
  },
  {
    client: "Northstar Coffee",
    title: "A place to slow down",
    type: "Identity + packaging",
    color: "project-sage",
  },
  {
    client: "Good Ground Farms",
    title: "Grown with intention",
    type: "Packaging + campaign",
    color: "project-coral",
  },
];

export default function Home() {
  const pageRef = useRef<HTMLElement>(null);
  const [modelUrl, setModelUrl] = useState<string | null>(null);

  const handleModelChange = useCallback((url: string | null) => {
    setModelUrl((previousUrl) => {
      if (previousUrl) URL.revokeObjectURL(previousUrl);
      return url;
    });
  }, []);

  useEffect(() => {
    const context = gsap.context(() => {
      gsap.from(".hero-kicker, .hero-title-line, .hero-copy, .hero-actions", {
        y: 26,
        opacity: 0,
        duration: 0.9,
        stagger: 0.08,
        ease: "power3.out",
        delay: 0.15,
      });

      gsap.from(".hero-art", {
        scale: 0.92,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out",
        delay: 0.15,
      });

      gsap.utils.toArray<HTMLElement>(".reveal").forEach((element) => {
        gsap.from(element, {
          y: 44,
          opacity: 0,
          duration: 0.85,
          ease: "power3.out",
          scrollTrigger: {
            trigger: element,
            start: "top 84%",
            once: true,
          },
        });
      });

      gsap.to(".hero-orbit", {
        rotation: 360,
        duration: 26,
        repeat: -1,
        ease: "none",
      });
    }, pageRef);

    return () => context.revert();
  }, []);

  return (
    <main ref={pageRef} className="agency-page">
      <header className="agency-nav">
        <a className="agency-brand" href="#top" aria-label="Badger Studio home">
          <StudioMark />
          <span>
            badger<span className="brand-muted">studio</span>
          </span>
        </a>
        <nav className="agency-links" aria-label="Primary navigation">
          <a href="#services">Services</a>
          <a href="#work">Work</a>
          <a href="#about">About</a>
        </nav>
        <a className="nav-contact" href="#contact">
          Start a project <ArrowUpRight size={15} aria-hidden="true" />
        </a>
        <button className="mobile-menu" type="button" aria-label="Open menu">
          <Menu size={20} />
        </button>
      </header>

      <section className="agency-hero" id="top">
        <div className="hero-content">
          <p className="hero-kicker">
            <span className="status-dot" /> Independent brand + digital studio ·
            Est. 2024
          </p>
          <h1 className="hero-title">
            <span className="hero-title-line">Make your</span>
            <span className="hero-title-line hero-title-accent">
              mark <em>matter.</em>
            </span>
          </h1>
          <p className="hero-copy">
            Badger Studio builds brave identities and expressive digital
            experiences for people making the next good thing.
          </p>
          <div className="hero-actions">
            <a className="button button-dark" href="#work">
              See our work <ArrowDownRight size={17} aria-hidden="true" />
            </a>
            <a className="button button-quiet" href="#services">
              What we do <ArrowDownRight size={17} aria-hidden="true" />
            </a>
          </div>
        </div>
        <div className="hero-art">
          <div className="hero-orbit orbit-one" />
          <div className="hero-orbit orbit-two" />
          <AgencyScene modelUrl={modelUrl} />
          <div className="hero-art-label">
            <span>Current mood</span>
            <strong>Curious / precise</strong>
          </div>
        </div>
        <div className="hero-scroll">
          <ArrowDownRight size={17} aria-hidden="true" />
          <span>Scroll to explore</span>
        </div>
        <ModelDropzone onModelChange={handleModelChange} />
      </section>

      <section className="intro-band reveal" id="about">
        <p className="section-index">/ 00 — The short version</p>
        <div className="intro-statement">
          We turn <span>ambition</span> into brands people want to spend time
          with.
        </div>
        <div className="intro-detail">
          <p>
            We work with founders, teams, and kindred spirits at the moment an
            idea needs to become real.
          </p>
          <a
            className="circle-link"
            href="#contact"
            aria-label="Start a conversation"
          >
            <ArrowUpRight size={21} />
          </a>
        </div>
      </section>

      <section className="services-section" id="services">
        <div className="section-heading reveal">
          <div>
            <p className="section-index">/ 01 — What we do</p>
            <h2>
              Useful, beautiful,
              <br />
              <em>built to last.</em>
            </h2>
          </div>
          <p className="heading-note">
            A small studio for big swings.
            <br />
            Strategy through shipped product.
          </p>
        </div>
        <div className="service-list">
          {services.map((service) => (
            <article className="service-card reveal" key={service.number}>
              <span className="service-number">{service.number}</span>
              <div className="service-main">
                <h3>{service.title}</h3>
                <p>{service.copy}</p>
              </div>
              <div className="service-meta">
                <span>{service.tag}</span>
                <ArrowUpRight size={18} aria-hidden="true" />
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="work-section" id="work">
        <div className="section-heading reveal">
          <div>
            <p className="section-index">/ 02 — Selected work</p>
            <h2>
              Made with
              <br />
              <em>good people.</em>
            </h2>
          </div>
          <a className="text-link" href="#contact">
            All projects <ArrowUpRight size={15} />
          </a>
        </div>
        <div className="project-list">
          {projects.map((project, index) => (
            <article className="project-row reveal" key={project.client}>
              <div className={`project-visual ${project.color}`}>
                <span className={`project-shape project-shape-${index + 1}`} />
              </div>
              <div className="project-info">
                <span className="project-client">{project.client}</span>
                <h3>{project.title}</h3>
                <span className="project-type">{project.type}</span>
              </div>
              <ArrowUpRight
                className="project-arrow"
                size={22}
                aria-hidden="true"
              />
            </article>
          ))}
        </div>
      </section>

      <section className="belief-section reveal">
        <div className="belief-mark">B</div>
        <p>Good work should feel like a door opening.</p>
        <span>Not a performance. An invitation.</span>
      </section>

      <footer className="agency-footer" id="contact">
        <div className="footer-top">
          <div>
            <p className="section-index">/ 03 — Let&apos;s make something</p>
            <h2>
              Have a good
              <br />
              <em>one in mind?</em>
            </h2>
          </div>
          <a className="footer-cta" href="mailto:hello@badger.studio">
            hello@badger.studio <ArrowUpRight size={19} />
          </a>
        </div>
        <div className="footer-bottom">
          <a className="agency-brand" href="#top">
            <StudioMark />
            <span>
              badger<span className="brand-muted">studio</span>
            </span>
          </a>
          <span>© 2026 Badger Studio</span>
          <span>Brooklyn · Everywhere</span>
        </div>
      </footer>
    </main>
  );
}
