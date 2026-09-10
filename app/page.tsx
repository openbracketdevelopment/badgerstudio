"use client";

import { useMemo, useState } from "react";
import { StudioMark } from "./studio-mark";

type Project = {
  title: string;
  client: string;
  type: string;
  status: "In review" | "In progress" | "Planning";
  progress: number;
  accent: string;
  shape: string;
  updated: string;
};

const projects: Project[] = [
  { title: "Field Notes", client: "Northstar Coffee", type: "Brand system", status: "In review", progress: 82, accent: "sage", shape: "arch", updated: "2h ago" },
  { title: "Good Ground", client: "Good Ground Farms", type: "Packaging", status: "In progress", progress: 54, accent: "coral", shape: "circle", updated: "Yesterday" },
  { title: "New Rituals", client: "Morrow Health", type: "Campaign", status: "In progress", progress: 38, accent: "blue", shape: "bars", updated: "2 days ago" },
  { title: "Sunroom", client: "Internal project", type: "Editorial", status: "Planning", progress: 16, accent: "yellow", shape: "square", updated: "3 days ago" },
];

const filters = ["All projects", "In progress", "In review", "Planning"];

export default function Home() {
  const [activeFilter, setActiveFilter] = useState("All projects");
  const [showBrief, setShowBrief] = useState(false);
  const [query, setQuery] = useState("");

  const visibleProjects = useMemo(() => projects.filter((project) => {
    const matchesFilter = activeFilter === "All projects" || project.status === activeFilter;
    const search = query.trim().toLowerCase();
    return matchesFilter && (!search || `${project.title} ${project.client}`.toLowerCase().includes(search));
  }), [activeFilter, query]);

  return (
    <main className="app-shell">
      <aside className="sidebar">
        <div className="brand"><StudioMark /><span>badger<span className="brand-muted">studio</span></span></div>
        <div className="workspace-switcher"><div className="workspace-icon">N</div><div><strong>Northstar</strong><span>Personal workspace</span></div><span className="chevron">⌄</span></div>
        <nav className="main-nav" aria-label="Main navigation">
          <a className="nav-item active" href="#overview"><span>◈</span> Overview</a>
          <a className="nav-item" href="#projects"><span>▦</span> Projects <b>4</b></a>
          <a className="nav-item" href="#calendar"><span>□</span> Calendar</a>
          <a className="nav-item" href="#notes"><span>✧</span> Notes</a>
        </nav>
        <div className="sidebar-bottom"><a className="nav-item" href="#settings"><span>⚙</span> Settings</a><div className="profile"><div className="avatar">TM</div><div><strong>Taylor Morgan</strong><span>Admin</span></div><span className="more">•••</span></div></div>
      </aside>

      <section className="content" id="overview">
        <header className="topbar"><div className="breadcrumb"><span>Workspace</span><i>/</i><strong>Overview</strong></div><div className="top-actions"><label className="search"><span>⌕</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search" aria-label="Search projects" /><kbd>⌘ K</kbd></label><button className="icon-button" aria-label="Notifications">♧<span className="notification-dot" /></button><button className="new-button" onClick={() => setShowBrief(true)}><span>＋</span> New brief</button></div></header>

        <div className="page-heading"><div><p className="eyebrow">THURSDAY, SEPTEMBER 10, 2026</p><h1>Good morning, Taylor<span className="sun">✳</span></h1><p className="subheading">Here&apos;s what&apos;s moving across your studio.</p></div><div className="heading-note"><span className="note-pin">✦</span><div><strong>One thing at a time.</strong><p>Small progress is still progress.</p></div></div></div>

        <div className="metrics"><div className="metric"><span className="metric-label">Active projects</span><strong>04</strong><span className="metric-trend up">↗ 2 this month</span></div><div className="metric"><span className="metric-label">Hours this week</span><strong>28<span className="metric-unit">h</span></strong><span className="metric-trend">↗ 12% from last week</span></div><div className="metric"><span className="metric-label">Next deadline</span><strong className="deadline">Sep 14</strong><span className="metric-trend">Field Notes · 4 days</span></div></div>

        <section className="projects-section" id="projects"><div className="section-header"><div><h2>Your projects</h2><p>Keep the good work moving.</p></div><button className="text-button">View all <span>→</span></button></div><div className="filter-row" role="tablist">{filters.map((filter) => <button key={filter} role="tab" aria-selected={activeFilter === filter} className={`filter ${activeFilter === filter ? "selected" : ""}`} onClick={() => setActiveFilter(filter)}>{filter}</button>)}</div><div className="project-grid">{visibleProjects.map((project) => <article className="project-card" key={project.title}><div className={`project-art ${project.accent}`}><div className={`art-shape ${project.shape}`} /><span className="art-label">{project.type}</span><button className="card-menu" aria-label={`More options for ${project.title}`}>•••</button></div><div className="project-info"><div><h3>{project.title}</h3><p>{project.client}</p></div><span className={`status ${project.status.toLowerCase().replace(" ", "-")}`}>{project.status}</span></div><div className="progress-row"><div className="progress-track"><div className="progress-bar" style={{ width: `${project.progress}%` }} /></div><span>{project.progress}%</span><time>{project.updated}</time></div></article>)}</div>{visibleProjects.length === 0 && <div className="empty-state">No projects match this view.</div>}</section>

        <section className="bottom-grid"><div className="activity-panel" id="notes"><div className="section-header"><div><h2>Recent activity</h2><p>The latest from your workspace.</p></div><button className="text-button">See all <span>→</span></button></div><div className="activity-list"><div className="activity-item"><div className="activity-avatar coral-bg">JB</div><p><strong>Jamie Bell</strong> commented on <b>Field Notes</b><span>“The warmer direction feels right. Let&apos;s push that forward.”</span></p><time>24 min ago</time></div><div className="activity-item"><div className="activity-avatar yellow-bg">TM</div><p>You moved <b>Good Ground</b> to <strong>In progress</strong><span>Packaging exploration is underway.</span></p><time>Yesterday</time></div><div className="activity-item"><div className="activity-avatar blue-bg">AR</div><p><strong>Alex Rivera</strong> shared a new file in <b>New Rituals</b><span>rituals_campaign_v04.fig</span></p><time>2 days ago</time></div></div></div><div className="focus-panel"><div className="focus-kicker">A SMALL MOMENT</div><div className="focus-quote">“The details are not the details. They make the design.”</div><div className="focus-author">— Charles Eames</div><div className="focus-doodle">✺</div></div></section>
      </section>

      {showBrief && <div className="modal-backdrop" onClick={() => setShowBrief(false)}><div className="brief-modal" role="dialog" aria-modal="true" aria-labelledby="brief-title" onClick={(event) => event.stopPropagation()}><button className="modal-close" onClick={() => setShowBrief(false)} aria-label="Close">×</button><span className="eyebrow">START SOMETHING NEW</span><h2 id="brief-title">What are we making?</h2><p>Give your next piece of work a name and we&apos;ll make space for it.</p><input autoFocus placeholder="Project name" /><div className="modal-actions"><button className="text-button" onClick={() => setShowBrief(false)}>Cancel</button><button className="new-button" onClick={() => setShowBrief(false)}>Create project <span>→</span></button></div></div></div>}
    </main>
  );
}
