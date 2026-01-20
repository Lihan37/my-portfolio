import React, { useEffect, useRef } from "react";
import CursorTrail from "./components/CursorTrail";
import FloatingCode from "./components/FloatingCode";

export default function App() {
  // ---- Mouse parallax for background blobs ----
  const parallaxRef = useRef(null);
  useEffect(() => {
    const el = parallaxRef.current;
    const root = document.documentElement;
    if (!el) return;
    const handle = (e) => {
      const { innerWidth: w, innerHeight: h } = window;
      const x = (e.clientX - w / 2) / (w / 2); // -1..1
      const y = (e.clientY - h / 2) / (h / 2);
      el.style.setProperty("--mx", String(x));
      el.style.setProperty("--my", String(y));
      // make global so other components (FloatingCode) can read
      root.style.setProperty("--mx", String(x));
      root.style.setProperty("--my", String(y));
    };
    window.addEventListener("mousemove", handle);
    return () => window.removeEventListener("mousemove", handle);
  }, []);

  const projects = [
    {
      title: "Learn with Hemel — EdTech Platform",
      desc: "MERN stack • YouTube-style playlist (Plyr-ready) • 600+ videos • Admin uploads (edit/delete with Swal) • Grouping by subject/paper/chapter • Route-based playback /videos/:playlistTitle • SEO via Helmet.",
      tags: ["React", "Tailwind", "Express", "MongoDB", "Plyr", "JWT"],
      link: "#",
    },
    {
      title: "LifeShare Blood Donation Platform",
      desc: "Donor–recipient connect • request feed • donation history • funding section • responsive, accessible UI.",
      tags: ["React", "Express", "MongoDB", "Tailwind", "Firebase"],
      link: "#",
    },
    {
      title: "Poll Management App",
      desc: "Image contest • admin uploads • live leaderboard • auth & protected routes • clean voting UX.",
      tags: ["React", "Firebase", "MongoDB", "Express"],
      link: "#",
    },
    {
      title: "Inn-Sight Room Booking",
      desc: "Room booking • cancelation • date picker • user accounts • review system (stars/comments).",
      tags: ["React", "Express", "MongoDB", "Tailwind"],
      link: "#",
    },
  ];

  const skills = {
    "Frontend Development": [
      "HTML5",
      "CSS5 (Tailwind)",
      "JavaScript",
      "Typescript",
      "React.js",
      "Next.js (Learning)",
    ],
    "Backend Development": [
      "Node.js",
      "Express.js",
      "MongoDB",
      "Firebase Auth",
    ],
    "Other Skills": [
      "Communication (Bangla/English)",
      "Problem Solving",
      "Team Collaboration",
      "Git & GitHub",
    ],
    "Programming Languages": ["C++", "Java"],
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 selection:bg-cyan-300/40">
      {/* ========== local styles (keyframes) ========== */}
      <style>{`
        @keyframes gradientShift { 0%{background-position:0% 50%} 50%{background-position:100% 50%} 100%{background-position:0% 50%} }
        @keyframes glow { 0%{opacity:.35;filter:blur(40px)} 50%{opacity:.6;filter:blur(55px)} 100%{opacity:.35;filter:blur(40px)} }
        @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-18px)} }
      `}</style>

      {/* ========== Animated Background (gradient + blobs + parallax) ========== */}
      <div
        ref={parallaxRef}
        className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
      >
        {/* moving gradient */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(120deg, #0b1220, #1e3a8a, #0ea5e9, #1e40af)",
            backgroundSize: "300% 300%",
            animation: "gradientShift 20s ease infinite",
            opacity: 0.35,
          }}
        />
        {/* soft glowing blobs that react to mouse */}
        <div
          className="absolute top-16 left-10 w-[32rem] h-[32rem] rounded-full bg-cyan-400/25 mix-blend-screen"
          style={{
            transform:
              "translate(calc(var(--mx,0) * 25px), calc(var(--my,0) * 20px))",
            animation: "glow 9s ease-in-out infinite",
          }}
        />
        <div
          className="absolute bottom-24 right-6 w-[28rem] h-[28rem] rounded-full bg-blue-500/25 mix-blend-screen"
          style={{
            transform:
              "translate(calc(var(--mx,0) * -30px), calc(var(--my,0) * -15px))",
            animation: "glow 11s ease-in-out infinite",
          }}
        />
        <div
          className="absolute -top-24 right-1/3 w-[22rem] h-[22rem] rounded-full bg-indigo-500/20 mix-blend-screen"
          style={{
            transform:
              "translate(calc(var(--mx,0) * 15px), calc(var(--my,0) * 35px))",
            animation: "glow 10s ease-in-out infinite",
          }}
        />
      </div>

      {/* NEW: subtle particle trail + floating code glyphs */}
      <CursorTrail />
      <FloatingCode />

      {/* ========== Navbar ========== */}
      <header className="sticky top-0 z-40 backdrop-blur bg-slate-950/60 border-b border-white/5">
        <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
          <a
            href="#home"
            className="font-semibold tracking-wide inline-flex items-center gap-2 reveal"
          >
            <img src="/er-logo.svg" alt="Eanur Rahman logo" className="h-5 w-5 rounded-sm" />
            <span>Eanur Rahman</span>
          </a>
          <nav className="hidden md:flex items-center gap-6 text-sm">
            <a href="#about" className="text-slate-300 hover:text-white nav-link">
              About
            </a>
            <a href="#projects" className="text-slate-300 hover:text-white nav-link">
              Projects
            </a>
            <a href="#skills" className="text-slate-300 hover:text-white nav-link">
              Skills
            </a>
            <a href="#contact" className="text-slate-300 hover:text-white nav-link">
              Contact
            </a>
          </nav>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black font-medium px-4 py-2 transition btn-glow"
          >
            Contact
            <svg
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path d="M7 12h10M13 6l6 6-6 6" />
            </svg>
          </a>
        </div>
      </header>

      {/* ========== Hero (Professional) ========== */}
      <section
        id="home"
        className="relative mx-auto max-w-6xl px-4 pt-16 pb-20"
      >
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs reveal delay-1">
              <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 animate-pulse" />
              Available for Collaboration
            </span>

            <h1 className="mt-4 text-3xl md:text-2xl font-extrabold leading-tight reveal delay-2 text-hero">
              <span className="text-cyan-400">FULL</span> Stack Developer
              <br /> building scalable, high-impact products
            </h1>

            <p className="mt-4 text-slate-300 max-w-xl reveal delay-3">
              I architect and ship clean, performant web applications with
              React, Node, Express, and MongoDB. I care about UX, accessibility,
              and meaningful micro-interactions—always aiming for reliability
              and speed in production.
            </p>

            <div className="mt-6 flex flex-wrap gap-3 reveal delay-4">
              <a
                href="#projects"
                className="rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black font-medium px-5 py-2.5 transition inline-flex items-center gap-2 btn-glow"
              >
                View Projects
                <svg
                  className="h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path d="M9 5l7 7-7 7" />
                </svg>
              </a>
              <a
                href="#contact"
                className="rounded-xl border border-white/15 hover:border-white/30 px-5 py-2.5 inline-flex items-center gap-2 btn-glow"
              >
                Contact Me
              </a>
            </div>
          </div>

          {/* Profile card */}
          <div className="relative">
            <div className="absolute -inset-8 -z-10 rounded-[2rem] bg-gradient-to-tr from-cyan-400/10 to-blue-400/0 blur-2xl" />
            <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6 shadow-2xl animate-[float_6s_ease-in-out_infinite] pulse-border reveal delay-3">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <img
                    src="https://i.ibb.co.com/MkXkHfVW/536287528-2817799345096227-1746189801431656410-n.jpg"
                    alt="Eanur Rahman"
                    className="h-28 w-28 rounded-2xl object-cover border border-white/10"
                  />
                  <span className="absolute -bottom-1 -right-1 h-5 w-5 rounded-full bg-cyan-400 ring-2 ring-slate-900" />
                </div>
                <div>
                  <div className="text-sm text-slate-300">Hello, I’m</div>
                  <div className="text-xl font-semibold text-cyan-300">
                    Eanur Rahman
                  </div>
                  <div className="text-slate-400 text-sm">
                    Full-Stack Developer • Dhaka, Bangladesh
                  </div>
                </div>
              </div>

              <p className="mt-4 text-slate-300">
                I design and deliver end-to-end features—from data models and
                APIs to polished UIs. Strong bias for simplicity, performance
                and maintainability.
              </p>

              <div className="mt-4 flex flex-wrap gap-2">
                {["React", "Node", "Express", "MongoDB", "Tailwind"].map(
                  (t) => (
                    <span
                      key={t}
                      className="text-xs px-2.5 py-1 rounded-full bg-white/5 border border-white/10"
                    >
                      {t}
                    </span>
                  )
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========== About ========== */}
      <section id="about" className="mx-auto max-w-6xl px-4 py-12">
        <h2 className="text-3xl md:text-4xl font-bold text-cyan-300 reveal">
          About Me
        </h2>
        <div className="mt-6 grid md:grid-cols-2 gap-8">
          {/* Left Column */}
          <div className="space-y-4 leading-relaxed text-slate-300 reveal delay-1">
            <p className="text-slate-200 font-semibold">
              Full-Stack MERN Developer
            </p>
            <p>
              I’m{" "}
              <span className="text-cyan-300 font-semibold">Eanur Rahman</span>,
              a passionate software developer specializing in the MERN stack. I
              graduated in Computer Science & Engineering from{" "}
              <span className="font-medium">
                Daffodil International University
              </span>{" "}
              and have since been building impactful, production-ready
              applications.
            </p>
            <p>
              With a strong focus on{" "}
              <span className="font-medium text-slate-200">
                scalable design, performance, and clean code
              </span>
              , I have delivered multiple projects ranging from EdTech platforms
              to management systems.
            </p>
            <p>
              <span className="font-semibold text-slate-200">
                Core Expertise:
              </span>{" "}
              React.js, Node.js, Express.js, MongoDB, TailwindCSS. I also work
              with Firebase Authentication, API integration, and cloud
              deployments.
            </p>
            <p>
              <span className="font-semibold text-slate-200">Mindset:</span> I
              believe in continuous learning, collaboration, and solving complex
              problems through simple, elegant solutions. Beyond coding, I’m a
              tech enthusiast who enjoys gaming and staying inspired by
              innovative communities.
            </p>
          </div>

          {/* Right Column - Quick Stats */}
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6 card-hover reveal delay-2">
            <h3 className="font-semibold text-slate-200 mb-3">Quick Stats</h3>
            <ul className="grid grid-cols-2 gap-3 text-sm">
              <li className="rounded-xl bg-white/5 border border-white/10 p-3 stat-chip">
                ⚙️ 5+ Full-Stack Projects
              </li>
              <li className="rounded-xl bg-white/5 border border-white/10 p-3 stat-chip">
                🎯 Primary Focus: EdTech Solutions
              </li>
              <li className="rounded-xl bg-white/5 border border-white/10 p-3 stat-chip">
                🧪 Strong Foundation in JS & React
              </li>
              <li className="rounded-xl bg-white/5 border border-white/10 p-3 stat-chip">
                🎓 CSE Graduate — Daffodil International University
              </li>
              <li className="rounded-xl bg-white/5 border border-white/10 p-3 stat-chip">
                🌍 Based in Dhaka, Bangladesh
              </li>
              <li className="rounded-xl bg-white/5 border border-white/10 p-3 stat-chip">
                🤝 Open to Collaboration & Opportunities
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* ========== Projects ========== */}
      <section id="projects" className="mx-auto max-w-6xl px-4 py-12">
        <h2 className="text-3xl md:text-4xl font-bold text-cyan-300 reveal">
          Projects
        </h2>

        {(() => {
          const projects = [
            {
              title: "Learn with Hemel — EdTech Platform",
              desc: "YouTube-style playlist UI (Plyr-ready), ~600 videos plan, admin upload/edit/delete with Swal, grouping by subject/paper/chapter, route-based playback (/videos/:playlistTitle), SEO with Helmet.",
              tags: ["React", "Tailwind", "Express", "MongoDB", "Plyr", "JWT"],
              live: "https://learnwithhemel.com/",
            },
            {
              title: "Insomnia Fuel - Cafe in Sydney CBD",
              desc: "Late-night cafe in Sydney CBD serving smash burgers, specialty coffee, and comfort food. Focus on clear menu messaging and brand-first presentation.",
              tags: ["Branding", "Landing Page", "SEO", "Responsive"],
              live: "https://insomniafuel.com.au/",
            },
            {
              title: "ResumeCraft — Resume/CV Builder",
              desc: "ATS-friendly resume builder with clean templates, instant preview and export (PDF/Word). Planned: template gallery, no-signup builder flow, analytics.",
              tags: ["React", "Tailwind", "Builder UX", "PDF/Doc"],
              live: "https://resumecraft01.netlify.app/",
            },
            {
              title: "LifeShare — Blood Donation Platform",
              desc: "Donor–recipient connect, request feed, donation history, responsive UX. Focus on clarity, mobile-first flow and secure form handling.",
              tags: ["React", "Express", "MongoDB", "Tailwind", "Firebase"],
              live: "https://life-share-70cc5.web.app/",
            },
          ];

          return (
            <div className="mt-6 grid md:grid-cols-2 gap-6">
              {projects.map((p) => (
                <article
                  key={p.title}
                  className="group rounded-2xl border border-white/10 bg-white/5 p-6 hover:border-cyan-400/40 transition card-hover reveal"
                >
                  <h3 className="text-xl font-semibold text-slate-100 group-hover:text-white">
                    {p.title}
                  </h3>
                  <p className="mt-2 text-slate-300">{p.desc}</p>

                  <div className="mt-3 flex flex-wrap gap-2">
                    {p.tags.map((t) => (
                      <span
                        key={t}
                        className="text-xs px-2.5 py-1 rounded-full bg-white/5 border border-white/10"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  <div className="mt-4 flex items-center gap-3">
                    <a
                      href={p.live}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black font-medium px-4 py-2 transition btn-glow"
                    >
                      Live
                      <svg
                        className="h-4 w-4"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                      >
                        <path d="M9 5l7 7-7 7" />
                      </svg>
                    </a>
                  </div>
                </article>
              ))}
            </div>
          );
        })()}
      </section>

      {/* ========== Skills ========== */}
      <section id="skills" className="mx-auto max-w-6xl px-4 py-12">
        <h2 className="text-3xl md:text-4xl font-bold text-cyan-300 reveal">Skills</h2>
        <div className="mt-6 grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {Object.entries(skills).map(([group, list]) => (
            <div
              key={group}
              className="rounded-2xl border border-white/10 bg-white/5 p-6 card-hover reveal"
            >
              <h3 className="font-semibold text-slate-200">{group}</h3>
              <ul className="mt-3 space-y-2 text-slate-300">
                {list.map((s) => (
                  <li key={s} className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-cyan-400" />{" "}
                    {s}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* ========== Contact ========== */}
      <section id="contact" className="mx-auto max-w-3xl px-4 py-16">
        <h2 className="text-3xl md:text-4xl font-bold text-cyan-300 text-center reveal">
          Contact Me
        </h2>

        <p className="text-center text-slate-300 mt-3 reveal delay-1">
          You can also email me directly at{" "}
          <a
            className="text-cyan-300 hover:underline"
            href="mailto:eanurlihan10@gmail.com"
          >
            eanurlihan10@gmail.com
          </a>
        </p>

        <form
          action="https://formspree.io/f/mqkvrwaz"
          method="POST"
          className="mt-8 space-y-4 reveal delay-2"
          onSubmit={(e) => {
            e.preventDefault();
            const form = e.target;

            fetch(form.action, {
              method: form.method,
              body: new FormData(form),
              headers: { Accept: "application/json" },
            })
              .then((response) => {
                if (response.ok) {
                  alert("✅ Message sent successfully!");
                  form.reset();
                } else {
                  alert("❌ Oops! Something went wrong. Please try again.");
                }
              })
              .catch(() =>
                alert(
                  "❌ Network error. Please check your connection and try again."
                )
              );
          }}
        >
          <div>
            <label htmlFor="name" className="sr-only">
              Name
            </label>
            <input
              id="name"
              type="text"
              name="name"
              placeholder="Your Name"
              required
              className="w-full rounded-xl bg-white/5 border border-white/10 p-3 outline-none focus:border-cyan-400 input-glow"
            />
          </div>

          <div>
            <label htmlFor="email" className="sr-only">
              Email
            </label>
            <input
              id="email"
              type="email"
              name="email"
              placeholder="Your Email"
              required
              className="w-full rounded-xl bg-white/5 border border-white/10 p-3 outline-none focus:border-cyan-400 input-glow"
            />
          </div>

          <div>
            <label htmlFor="message" className="sr-only">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              rows="5"
              placeholder="Your Message"
              required
              className="w-full rounded-xl bg-white/5 border border-white/10 p-3 outline-none focus:border-cyan-400 input-glow"
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black font-medium px-5 py-3 transition btn-glow"
          >
            Send Message
          </button>
        </form>
      </section>

      {/* ========== Footer ========== */}
      <footer className="border-t border-white/10 py-8">
        <div className="mx-auto max-w-6xl px-4 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-slate-400">
            © {new Date().getFullYear()} Eanur Rahman — All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <a
              href="https://github.com/Lihan37"
              target="_blank"
              rel="noreferrer"
              className="text-slate-300 hover:text-white"
            >
              GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/eanurlihan/"
              target="_blank"
              rel="noreferrer"
              className="text-slate-300 hover:text-white"
            >
              LinkedIn
            </a>
            <a
              href="https://www.facebook.com/eanur.rahman.9/"
              target="_blank"
              rel="noreferrer"
              className="text-slate-300 hover:text-white"
            >
              Facebook
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

