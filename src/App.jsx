import React, { useEffect, useRef, useState } from "react";
import CursorTrail from "./components/CursorTrail";
import FloatingCode from "./components/FloatingCode";

const PROFILE_IMAGE =
  "https://res.cloudinary.com/duaysox2a/image/upload/v1780739570/pfp_professional_uio3r3.png";

const navLinks = [
  { href: "#about", label: "About" },
  { href: "#projects", label: "Projects" },
  { href: "#skills", label: "Skills" },
  { href: "#contact", label: "Contact" },
];

const projects = [
  {
    title: "Briddhi - Mutual Fund Investment Platform",
    desc: "Investment platform with mutual fund discovery, fund information, investor education, and account registration.",
    tags: ["FinTech", "Mutual Funds", "Investor Education", "Responsive UI"],
    live: "https://briddhi.net/",
    preview: "/projects/briddhi.jpg",
  },
  {
    title: "Bornil Vibes - Jewelry Storefront",
    desc: "Handcrafted jewelry storefront with product categories, collection browsing, cart, and checkout for customers across Bangladesh.",
    tags: ["E-commerce", "Jewelry", "Product Catalog", "Checkout"],
    live: "https://bornilvibes.com/",
    preview: "/projects/bornil-vibes.jpg",
  },
  {
    title: "Pro Property Care Solutions - Service Website",
    desc: "Property maintenance and repair website presenting residential and commercial services with clear navigation and quote requests.",
    tags: ["Business Website", "Property Services", "Lead Generation", "Responsive"],
    live: "https://www.propropertycaresolutions.com/",
    preview: "/projects/pro-property-care.jpg",
  },
  {
    title: "Learn With Hemel - EdTech Platform",
    desc: "Production EdTech platform with role-based dashboards, video learning system, quizzes, analytics, and admin management.",
    tags: ["React", "Node.js", "Express", "MongoDB", "JWT", "Analytics"],
    live: "https://learnwithhemel.com/",
    preview: "/projects/learn-with-hemel.jpg",
  },
  {
    title: "Insomnia Fuel - Cafe / Restaurant Website",
    desc: "Restaurant website featuring menu presentation, responsive layout, and customer-focused branding.",
    tags: ["Restaurant", "Responsive UI", "Branding", "Menu"],
    live: "https://insomniafuel.com.au/",
    preview: "/projects/insomnia-fuel.jpg",
  },
  {
    title: "Bangladesh Physiotherapy Society (BPS)",
    desc: "Official membership registration and management system with authentication and document handling.",
    tags: ["Membership", "Auth", "Documents", "Admin System"],
    live: "https://bps.org.bd/",
    previewStatus: "Homepage preview unavailable",
  },
  {
    title: "Energion E-Mobility - E-bike Selling Website",
    desc: "E-bike showcase and product presentation platform with modern responsive design.",
    tags: ["Product Showcase", "E-commerce UI", "Responsive", "Netlify"],
    live: "https://energion-emobility.netlify.app/",
    previewStatus: "Site under maintenance",
  },
  {
    title: "John Belvedere Menu - Digital Menu",
    desc: "Digital restaurant menu system optimized for mobile users and customer accessibility.",
    tags: ["Digital Menu", "Mobile UX", "Restaurant", "Accessibility"],
    live: "https://johnbelvederemenu.netlify.app/menu",
    preview: "/projects/john-belvedere.jpg",
  },
  {
    title: "Alif Restaurant - Restaurant Website",
    desc: "Restaurant website with menu presentation and responsive customer-facing design.",
    tags: ["Restaurant", "Menu", "Responsive Design", "Customer UX"],
    live: "https://alifrestaurant.netlify.app/",
    preview: "/projects/alif-restaurant.jpg",
  },
];

const skills = {
  "Frontend Development": [
    "HTML5",
    "CSS3",
    "Tailwind CSS",
    "JavaScript",
    "TypeScript",
    "React.js",
    "Responsive UI",
  ],
  "Backend Development": [
    "Node.js",
    "Express.js",
    "MongoDB",
    "Firebase Auth",
    "REST APIs",
    "Authentication",
  ],
  "Product Delivery": [
    "Role-based Dashboards",
    "Admin Panels",
    "Document Handling",
    "Analytics Views",
    "Deployment",
    "SEO Basics",
  ],
  "Professional Skills": [
    "Problem Solving",
    "Clean Code",
    "Team Collaboration",
    "Git & GitHub",
    "Client Communication",
  ],
};

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const parallaxRef = useRef(null);

  useEffect(() => {
    const el = parallaxRef.current;
    const root = document.documentElement;
    if (!el) return;

    const handle = (e) => {
      const { innerWidth: w, innerHeight: h } = window;
      const x = (e.clientX - w / 2) / (w / 2);
      const y = (e.clientY - h / 2) / (h / 2);
      el.style.setProperty("--mx", String(x));
      el.style.setProperty("--my", String(y));
      root.style.setProperty("--mx", String(x));
      root.style.setProperty("--my", String(y));
    };

    window.addEventListener("mousemove", handle);
    return () => window.removeEventListener("mousemove", handle);
  }, []);

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 selection:bg-cyan-300/40">
      <style>{`
        @keyframes gradientShift { 0%{background-position:0% 50%} 50%{background-position:100% 50%} 100%{background-position:0% 50%} }
        @keyframes glow { 0%{opacity:.35;filter:blur(40px)} 50%{opacity:.6;filter:blur(55px)} 100%{opacity:.35;filter:blur(40px)} }
        @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-18px)} }
      `}</style>

      <div
        ref={parallaxRef}
        className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
      >
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
        <div
          className="absolute top-16 left-10 h-[32rem] w-[32rem] rounded-full bg-cyan-400/25 mix-blend-screen"
          style={{
            transform:
              "translate(calc(var(--mx,0) * 25px), calc(var(--my,0) * 20px))",
            animation: "glow 9s ease-in-out infinite",
          }}
        />
        <div
          className="absolute bottom-24 right-6 h-[28rem] w-[28rem] rounded-full bg-blue-500/25 mix-blend-screen"
          style={{
            transform:
              "translate(calc(var(--mx,0) * -30px), calc(var(--my,0) * -15px))",
            animation: "glow 11s ease-in-out infinite",
          }}
        />
        <div
          className="absolute -top-24 right-1/3 h-[22rem] w-[22rem] rounded-full bg-indigo-500/20 mix-blend-screen"
          style={{
            transform:
              "translate(calc(var(--mx,0) * 15px), calc(var(--my,0) * 35px))",
            animation: "glow 10s ease-in-out infinite",
          }}
        />
      </div>

      <CursorTrail />
      <FloatingCode />

      <header className="sticky top-0 z-[100] border-b border-white/5 bg-slate-950/75 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
          <a
            href="#home"
            onClick={closeMenu}
            className="inline-flex items-center gap-2 font-semibold tracking-wide reveal"
          >
            <img
              src="/er-logo.svg"
              alt="Eanur Rahman logo"
              className="h-5 w-5 rounded-sm"
            />
            <span>Eanur Rahman</span>
          </a>

          <nav className="hidden items-center gap-6 text-sm md:flex">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-slate-300 hover:text-white nav-link"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="hidden md:block">
            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-xl bg-cyan-500 px-4 py-2 font-medium text-black transition hover:bg-cyan-400 btn-glow"
            >
              Contact
              <svg
                className="h-4 w-4"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path d="M7 12h10M13 6l6 6-6 6" />
              </svg>
            </a>
          </div>

          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-slate-100 transition hover:border-cyan-400/50 hover:text-cyan-300 md:hidden"
            aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={isMenuOpen}
            onClick={() => setIsMenuOpen((open) => !open)}
          >
            <svg
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              {isMenuOpen ? (
                <path d="M6 18 18 6M6 6l12 12" />
              ) : (
                <path d="M4 7h16M4 12h16M4 17h16" />
              )}
            </svg>
          </button>
        </div>

        {isMenuOpen && (
          <nav className="absolute left-0 right-0 top-full z-[110] border-t border-white/5 bg-slate-950/95 px-4 py-4 shadow-xl backdrop-blur md:hidden">
            <div className="mx-auto flex max-w-6xl flex-col gap-2">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={closeMenu}
                  className="rounded-xl px-3 py-2 text-slate-300 transition hover:bg-white/5 hover:text-white"
                >
                  {link.label}
                </a>
              ))}
              <a
                href="#contact"
                onClick={closeMenu}
                className="mt-2 inline-flex items-center justify-center rounded-xl bg-cyan-500 px-4 py-2 font-medium text-black transition hover:bg-cyan-400"
              >
                Contact Me
              </a>
            </div>
          </nav>
        )}
      </header>

      <section id="home" className="relative mx-auto max-w-6xl px-4 pb-20 pt-14 sm:pt-16">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs reveal delay-1">
              <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 animate-pulse" />
              Full-stack web developer for production-ready platforms
            </span>

            <h1 className="mt-4 text-3xl font-extrabold leading-tight sm:text-4xl lg:text-5xl reveal delay-2 text-hero">
              Building fast, scalable web products for real users.
            </h1>

            <p className="mt-4 max-w-xl text-slate-300 reveal delay-3">
              I am Eanur Rahman, a full-stack developer focused on React,
              Node.js, Express, MongoDB, and responsive product experiences. I
              build EdTech platforms, business websites, management systems,
              and digital menu products with clean, maintainable code.
            </p>

            <div className="mt-6 flex flex-wrap gap-3 reveal delay-4">
              <a
                href="#projects"
                className="inline-flex items-center gap-2 rounded-xl bg-cyan-500 px-5 py-2.5 font-medium text-black transition hover:bg-cyan-400 btn-glow"
              >
                View Projects
                <svg
                  className="h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M9 5l7 7-7 7" />
                </svg>
              </a>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 rounded-xl border border-white/15 px-5 py-2.5 transition hover:border-white/30 btn-glow"
              >
                Contact Me
              </a>
            </div>
          </div>

          <div className="relative">
            <div className="absolute inset-x-0 -inset-y-8 -z-10 rounded-[2rem] bg-gradient-to-tr from-cyan-400/10 to-blue-400/0 blur-2xl" />
            <div className="rounded-[2rem] border border-white/10 bg-white/5 p-5 shadow-2xl pulse-border reveal delay-3 sm:p-6 lg:animate-[float_6s_ease-in-out_infinite]">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                <div className="relative shrink-0">
                  <img
                    src={PROFILE_IMAGE}
                    alt="Eanur Rahman"
                    className="h-28 w-28 rounded-2xl border border-white/10 object-cover"
                  />
                  <span className="absolute -bottom-1 -right-1 h-5 w-5 rounded-full bg-cyan-400 ring-2 ring-slate-900" />
                </div>
                <div>
                  <div className="text-sm text-slate-300">Hello, I am</div>
                  <div className="text-xl font-semibold text-cyan-300">
                    Eanur Rahman
                  </div>
                  <div className="text-sm text-slate-400">
                    Full-Stack Developer - Dhaka, Bangladesh
                  </div>
                </div>
              </div>

              <p className="mt-4 text-slate-300">
                I deliver end-to-end features from database design and APIs to
                polished frontends. My recent work includes EdTech, restaurant,
                membership, and product presentation platforms.
              </p>

              <div className="mt-4 flex flex-wrap gap-2">
                {["React", "Node.js", "Express", "MongoDB", "Tailwind", "Firebase"].map(
                  (tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-xs"
                    >
                      {tag}
                    </span>
                  )
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="about" className="mx-auto max-w-6xl px-4 py-12">
        <h2 className="text-3xl font-bold text-cyan-300 reveal md:text-4xl">
          About Me
        </h2>
        <div className="mt-6 grid gap-8 md:grid-cols-2">
          <div className="space-y-4 leading-relaxed text-slate-300 reveal delay-1">
            <p className="font-semibold text-slate-200">
              Full-stack MERN developer building practical web products.
            </p>
            <p>
              I specialize in turning business requirements into fast,
              responsive, and maintainable applications. My work spans
              production EdTech systems, membership platforms, restaurant
              websites, digital menus, and product showcase websites.
            </p>
            <p>
              I focus on clean UI structure, reliable backend flows,
              authentication, admin management, document handling, and content
              experiences that work smoothly across mobile, tablet, and desktop.
            </p>
            <p>
              My core stack includes React.js, Tailwind CSS, Node.js,
              Express.js, MongoDB, Firebase, REST APIs, and deployment workflows.
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-6 card-hover reveal delay-2">
            <h3 className="mb-3 font-semibold text-slate-200">Quick Stats</h3>
            <ul className="grid gap-3 text-sm sm:grid-cols-2">
              {[
                `${projects.length} featured live projects`,
                "Primary focus: EdTech and business websites",
                "Production dashboard and admin experience",
                "Responsive UI for mobile, tablet, and desktop",
                "Based in Dhaka, Bangladesh",
                "Open to collaboration and opportunities",
              ].map((item) => (
                <li
                  key={item}
                  className="rounded-xl border border-white/10 bg-white/5 p-3 stat-chip"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section id="projects" className="mx-auto max-w-6xl px-4 py-12">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="text-3xl font-bold text-cyan-300 reveal md:text-4xl">
              Projects
            </h2>
            <p className="mt-2 max-w-2xl text-slate-300 reveal delay-1">
              Selected live work across investment platforms, e-commerce,
              business websites, EdTech, membership systems, and digital menus.
            </p>
          </div>
        </div>

        <div className="mt-6 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {projects.map((project) => (
            <article
              key={project.title}
              className="group flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/5 transition hover:border-cyan-400/40 card-hover reveal"
            >
              <a
                href={project.live}
                target="_blank"
                rel="noreferrer"
                aria-label={`Visit ${project.title}`}
                className="block aspect-[8/5] shrink-0 overflow-hidden border-b border-white/10 bg-slate-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-cyan-400"
              >
                {project.preview ? <img
                  src={project.preview}
                  alt={`Homepage preview of ${project.title}`}
                  width="1440"
                  height="900"
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover object-top transition-transform duration-300 motion-safe:group-hover:scale-[1.02]"
                /> : (
                  <div className="flex h-full flex-col items-center justify-center gap-2 px-6 text-center">
                    <span className="text-lg font-semibold text-cyan-300">
                      {new URL(project.live).hostname}
                    </span>
                    <span className="text-sm text-slate-400">{project.previewStatus}</span>
                  </div>
                )}
              </a>
              <div className="flex flex-1 flex-col p-6">
              <h3 className="text-xl font-semibold text-slate-100 group-hover:text-white">
                {project.title}
              </h3>
              <p className="mt-2 flex-1 text-slate-300">{project.desc}</p>

              <div className="mt-4 flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-xs"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="mt-5">
                <a
                  href={project.live}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl bg-cyan-500 px-4 py-2 font-medium text-black transition hover:bg-cyan-400 btn-glow"
                >
                  Live
                  <svg
                    className="h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path d="M7 17 17 7M9 7h8v8" />
                  </svg>
                </a>
              </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="skills" className="mx-auto max-w-6xl px-4 py-12">
        <h2 className="text-3xl font-bold text-cyan-300 reveal md:text-4xl">
          Skills
        </h2>
        <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {Object.entries(skills).map(([group, list]) => (
            <div
              key={group}
              className="rounded-2xl border border-white/10 bg-white/5 p-6 card-hover reveal"
            >
              <h3 className="font-semibold text-slate-200">{group}</h3>
              <ul className="mt-3 space-y-2 text-slate-300">
                {list.map((skill) => (
                  <li key={skill} className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-cyan-400" />
                    {skill}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section id="contact" className="mx-auto max-w-3xl px-4 py-16">
        <h2 className="text-center text-3xl font-bold text-cyan-300 reveal md:text-4xl">
          Contact Me
        </h2>

        <p className="mt-3 text-center text-slate-300 reveal delay-1">
          You can email me directly at{" "}
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
                  alert("Message sent successfully!");
                  form.reset();
                } else {
                  alert("Something went wrong. Please try again.");
                }
              })
              .catch(() =>
                alert("Network error. Please check your connection and try again.")
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
              className="w-full rounded-xl border border-white/10 bg-white/5 p-3 outline-none focus:border-cyan-400 input-glow"
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
              className="w-full rounded-xl border border-white/10 bg-white/5 p-3 outline-none focus:border-cyan-400 input-glow"
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
              className="w-full rounded-xl border border-white/10 bg-white/5 p-3 outline-none focus:border-cyan-400 input-glow"
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-xl bg-cyan-500 px-5 py-3 font-medium text-black transition hover:bg-cyan-400 btn-glow"
          >
            Send Message
          </button>
        </form>
      </section>

      <footer className="border-t border-white/10 py-8">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 md:flex-row">
          <p className="text-sm text-slate-400">
            (c) {new Date().getFullYear()} Eanur Rahman - All rights reserved.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
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
