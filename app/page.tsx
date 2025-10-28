'use client';

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, InstagramIcon, GithubIcon, MapPin, ChevronsLeftRightEllipsis } from "lucide-react";


type Project = {
  title: string;
  year: string;
  description: string;
  focus: string[];
  links?: Link[];
};

type Link = {
  href: string;
  label: string;
  icon?: React.ReactNode;
};

const projects: Project[] = [
  {
    title: "dgtill.com - DGT Agency",
    year: "2025",
    description:
      "Launch einer Website und Automation Agency inklusive Branding, Webauftritt und automatisierten Sales- sowie Deliveryprozessen.",
    focus: ["Agency Launch", "Branding", "Automation"],
    links: [
      {
        href: "https://dgtill.com",
        label: "Website",
        icon: <ArrowUpRight size={16} />,
      },
      {
        href: "https://www.instagram.com/dgtill.agency",
        label: "Instagram",
        icon: <InstagramIcon size={16} />,
      },
    ],
  },
  {
    title: "AWT Finanz Automations",
    year: "2025",
    description:
      "n8n basierte Automationen für Finanzprozesse: Daten Sync, Reporting Pipelines und Compliance Checks, nahtlos an bestehende Systeme gekoppelt.",
    focus: ["n8n", "System Integration", "Finance Ops"],
    links: [
      {
        href: "https://www.awt-finanz.de",
        label: "Website",
        icon: <ArrowUpRight size={16} />,
      },
    ],
  },
  {
    title: "Notepilot.de",
    year: "2024",
    description:
      "Produktivitätsplattform für Teams mit Markdown Editor, KI Suche und Workflow Automationen - umgesetzt als SaaS mit Next.js.",
    focus: ["Product Design", "Full Stack", "Next.js"],
    links: [
      {
        href: "https://notepilot.de",
        label: "Website",
        icon: <ArrowUpRight size={16} />,
      },
      {
        href: "https://www.github.com/tillwad/notepilot",
        label: "GitHub",
        icon: <GithubIcon size={16} />,
      },
    ],
  },
  {
    title: "Autoshow 3D Configurator",
    year: "2023",
    description:
      "Interaktive Autoshow mit frei navigierbarer Three.js Szene, konfigurierbaren 3D Modellen und Realtime Lighting für Messe und Web.",
    focus: ["Three.js", "Realtime Configurator"],
    links: [
      {
        href: "https://www.github.com/tillwad/autoshow",
        label: "GitHub",
        icon: <GithubIcon size={16} />,
      },
    ],
  },
];

type ThemeMode = "dark" | "light";

const SOCIAL_LINKS = [
  { href: "https://www.instagram.com/till.wad", label: "Instagram" },
  { href: "https://github.com/tillwad", label: "GitHub" },
  { href: "https://www.linkedin.com/in/tillwad", label: "LinkedIn" },
];

export default function Home() {
  const [theme, setTheme] = useState<ThemeMode>(() => {
    if (typeof document !== "undefined") {
      return document.documentElement.classList.contains("dark")
        ? "dark"
        : "light";
    }

    if (typeof window === "undefined") {
      return "dark";
    }

    const storedTheme = window.localStorage.getItem("tillwad-theme");
    if (storedTheme === "light" || storedTheme === "dark") {
      return storedTheme;
    }

    const prefersLight = window.matchMedia("(prefers-color-scheme: light)").matches;
    return prefersLight ? "light" : "dark";
  });
  const isDark = theme === "dark";
  const footerRef = useRef<HTMLElement | null>(null);
  const [footerVisible, setFooterVisible] = useState(false);

  useEffect(() => {
    if (typeof document === "undefined") {
      return;
    }

    const root = document.documentElement;
    const body = document.body;
    root.classList.toggle("dark", theme === "dark");
    if (body) {
      body.classList.toggle("dark", theme === "dark");
    }
    window.localStorage.setItem("tillwad-theme", theme);
  }, [theme]);

  useEffect(() => {
    if (typeof window === "undefined" || !footerRef.current) {
      return;
    }

    const target = footerRef.current;
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        setFooterVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    observer.observe(target);
    return () => observer.disconnect();
  }, []);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-zinc-50 text-zinc-900 dark:bg-[#050505] dark:text-zinc-100">
      <div className="dark-water" aria-hidden />

      <main className="relative z-10 mx-auto flex min-h-screen w-full max-w-5xl flex-col gap-24 px-6 pb-24 pt-24 sm:px-12 lg:gap-32">
        <header className="relative flex flex-col gap-12 lg:gap-16">
          <div className="pointer-events-none absolute -right-6 top-16 hidden h-72 w-px bg-gradient-to-b from-zinc-900/40 via-zinc-900/10 to-transparent dark:from-white/45 dark:via-white/15 dark:to-transparent lg:block" />

          <div className="flex flex-col items-center gap-8 text-center sm:items-start sm:text-left lg:grid lg:grid-cols-[minmax(0,200px)_1fr] lg:items-start lg:gap-12">
            <aside className="flex w-full sm:max-w-[200px] flex-col items-center gap-6 lg:w-auto lg:items-start">
              <div className="group relative flex aspect-square w-32 shrink-0 items-center justify-center overflow-hidden rounded-full border border-zinc-900/10 bg-white/60 p-1 shadow-lg shadow-zinc-900/5 transition hover:shadow-xl dark:border-white/10 dark:bg-white/5 dark:shadow-none dark:hover:shadow-white/10 sm:w-40 sm:aspect-square lg:w-44">
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-zinc-900/10 via-transparent to-transparent dark:from-white/15 dark:via-transparent dark:to-transparent" />
                <div className="absolute -inset-2 rounded-full border border-zinc-900/10 blur-sm dark:border-white/15" />
                <div className="relative h-full w-full overflow-hidden rounded-full">
                  <Image
                    src="/images/profile-picture.jpg"
                    alt="Portrait von Till Wadehn"
                    fill
                    className="object-cover"
                    priority
                    sizes="(max-width: 768px) 9rem, 11rem"
                  />
                </div>
                <div className="pointer-events-none absolute -bottom-6 left-1/2 h-12 w-40 -translate-x-1/2 rounded-full bg-zinc-900/15 opacity-80 blur-2xl transition-opacity duration-500 group-hover:opacity-100 dark:bg-white/10" />
              </div>

              <div className="flex w-full flex-col items-center gap-3 text-left text-xs uppercase tracking-[0.45em] text-zinc-500 dark:text-white/45 lg:items-start">
                <span className="text-sm font-semibold tracking-[0.4em] text-zinc-900 dark:text-white">
                  Till Wadehn
                </span>
                <ul className="flex w-full flex-col gap-2 text-[0.7rem] tracking-[0.4em] text-zinc-500 dark:text-white/40">
                  <li className="flex items-center gap-2">
                    <MapPin size={12} />
                    Berlin, Germany
                  </li>
                  <li className="flex items-center gap-2">
                    <ChevronsLeftRightEllipsis size={12} />
                    Software Engineer
                  </li>
                  <li className="flex items-center gap-2">
                    <ChevronsLeftRightEllipsis size={12} />
                    Full Stack & Automation
                  </li>
                </ul>
              </div>
            </aside>

            <div className="flex flex-1 flex-col items-center gap-6 text-left sm:items-start lg:pl-10">
              <span className="text-xs uppercase tracking-[0.45em] text-zinc-500 dark:text-white/40">
                Portfolio
              </span>

              <div className="h-px w-full max-w-3xl bg-gradient-to-r from-transparent via-zinc-900/30 to-transparent dark:via-white/20" />

              <h1 className="w-full max-w-3xl text-left text-4xl font-semibold leading-tight text-zinc-900 dark:text-white sm:text-5xl lg:text-6xl">
                Websites und Automationen, die Prozesse antreiben.
              </h1>

              <p className="max-w-2xl text-lg leading-relaxed text-zinc-600 dark:text-zinc-400">
                Ich bin Till Wadehn - Full Stack Developer aus Berlin. Ich baue Websites, Dashboards
                und Automatisierungen mit modernen Stacks wie Next.js, Node und n8n, damit Teams
                schneller liefern und skalieren können.
              </p>

              <div className="flex flex-wrap items-center justify-center gap-4 sm:justify-start">
                <Link
                  href="#work"
                  className="group inline-flex items-center gap-3 rounded-full border border-zinc-900/10 px-6 py-3 text-sm font-medium uppercase tracking-[0.25em] text-zinc-900 transition-all duration-500 ease-out hover:-translate-y-1 hover:border-zinc-900/40 hover:text-zinc-900 hover:shadow-lg dark:border-white/20 dark:text-white dark:hover:-translate-y-1 dark:hover:border-white/50 dark:hover:text-white dark:hover:shadow-xl"
                >
                  <span className="h-8 w-8 rounded-full border border-zinc-900/10 bg-zinc-900/5 transition-all duration-500 group-hover:border-zinc-900/40 group-hover:bg-zinc-900/10 group-hover:rotate-3 dark:border-white/20 dark:bg-white/5 dark:group-hover:border-white/50 dark:group-hover:bg-white/10 dark:group-hover:rotate-6" />
                  Recent Work
                </Link>

                <a
                  href="mailto:hello@tillwad.com"
                  className="inline-flex items-center gap-3 rounded-full bg-zinc-900 px-6 py-4 text-sm font-medium uppercase tracking-[0.25em] text-white transition-all duration-500 ease-out hover:-translate-y-1 hover:bg-zinc-800 hover:shadow-lg dark:bg-white/10 dark:text-white dark:hover:-translate-y-1 dark:hover:bg-white/20 dark:hover:shadow-xl"
                >
                  Kontakt
                </a>
              </div>
            </div>
          </div>
        </header>
        <section id="work" className="flex flex-col gap-10">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <h2 className="text-sm uppercase tracking-[0.4em] text-zinc-500 dark:text-white/40">
                Recent Work
              </h2>
              <p className="mt-3 text-3xl font-semibold text-zinc-900 dark:text-white">
                Ausgewählte Projekte und Systeme
              </p>
            </div>
            <p className="max-w-md text-sm uppercase tracking-[0.3em] text-zinc-500 dark:text-white/35">
              Von 3D Konfiguratoren bis Automationen - Full Stack Projekte mit klaren Outcomes.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {projects.map((project) => (
              <article key={project.title} className="project-card group">
                <div className="project-card__glare" aria-hidden />
                <div className="project-card__lines" aria-hidden />

                <div className="relative z-10 flex items-center justify-between text-xs uppercase tracking-[0.35em] text-zinc-500 transition-colors duration-500 group-hover:text-zinc-900/60 dark:text-white/40 dark:group-hover:text-white/55">
                  <span className="transition-transform duration-500 group-hover:translate-x-1">
                    {project.year}
                  </span>
                  <span className="flex items-center gap-2 transition-all duration-500 group-hover:gap-3">
                    <span className="h-[3px] w-12 bg-zinc-900/40 transition-all duration-500 group-hover:w-16 dark:bg-white/30" />
                    Case Study
                  </span>
                </div>

                <h3 className="relative z-10 mt-6 text-2xl font-semibold text-zinc-900 transition-colors duration-500 group-hover:text-zinc-950 dark:text-white dark:group-hover:text-white">
                  {project.title}
                </h3>
                <p className="relative z-10 mt-4 text-sm leading-relaxed text-zinc-700 transition-colors duration-500 group-hover:text-zinc-600 dark:text-zinc-300 dark:group-hover:text-zinc-200">
                  {project.description}
                </p>

                <ul className="relative z-10 mt-6 flex flex-wrap gap-3 text-xs uppercase tracking-[0.25em] text-zinc-500 transition-colors duration-500 group-hover:text-zinc-600 dark:text-white/40 dark:group-hover:text-white/60">
                  {project.focus.map((item) => (
                    <li
                      key={item}
                      className="inline-flex items-center gap-2 transition-all duration-500 hover:underline"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
                <div className="relative z-10 mt-6 flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-zinc-500 transition-colors duration-500 group-hover:text-zinc-600 dark:text-white/40 dark:group-hover:text-white/60">
                  {project.links?.map((link) => (
                    <a
                      key={link.href}
                      href={link.href}
                      target="_blank"
                      rel="noreferrer"
                      className="flex gap-4  border border-zinc-900/20 px-3 py-2 transition-all duration-500 hover:-translate-y-0.5 hover:border-zinc-900/40 dark:border-white/20 dark:hover:-translate-y-0.5 dark:hover:border-white/40"
                    >
                      {link.icon}
                      {link.label}
                    </a>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>

        <footer
          ref={footerRef}
          className="flex flex-col gap-4 border-t border-zinc-900/10 pt-10 text-sm uppercase tracking-[0.25em] text-zinc-500 dark:border-white/10 dark:text-white/35 sm:flex-row sm:items-center sm:justify-between"
        >
          <span>© {new Date().getFullYear()} Till Wadehn</span>
          <div className="flex gap-6">
            <a
              href="mailto:hello@tillwad.com"
              className="transition hover:text-zinc-900 dark:hover:text-white"
            >
              Mail
            </a>
            <a
              href="https://www.instagram.com/tillwadehn"
              className="transition hover:text-zinc-900 dark:hover:text-white"
            >
              Instagram
            </a>
            <a
              href="https://github.com/tillwadehn"
              className="transition hover:text-zinc-900 dark:hover:text-white"
            >
              GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/tillwadehn"
              className="transition hover:text-zinc-900 dark:hover:text-white"
            >
              LinkedIn
            </a>
          </div>
        </footer>
      </main>

      <div className={`floating-dock ${footerVisible ? "floating-dock--hidden" : ""}`}>
        <div className="floating-dock__links" role="group" aria-label="Social Links">
          {SOCIAL_LINKS.map((social) => (
            <a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noreferrer"
              className="floating-dock__link text-zinc-600 transition hover:text-zinc-900 dark:text-white/50 dark:hover:text-white"
            >
              {social.label}
            </a>
          ))}
        </div>

        <button
          type="button"
          className="floating-dock__switch"
          onClick={toggleTheme}
          aria-label={`Switch to ${isDark ? "light" : "dark"} theme`}
        >
          <span className="floating-dock__indicator">
            <span className={`indicator-dot ${isDark ? "indicator-dot--right" : ""}`} />
          </span>
          <span className="floating-dock__label text-zinc-600 dark:text-white/60">
            {isDark ? "Dark" : "Light"}
          </span>
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            aria-hidden
            className="floating-dock__icon text-zinc-700 dark:text-white"
          >
            {isDark ? (
              <path
                d="M12 3a1 1 0 0 1 1 1v1.268a7.5 7.5 0 1 0 6.732 6.732H21a1 1 0 0 1 1 1A10 10 0 1 1 11 3a1 1 0 0 1 1-1Z"
                fill="currentColor"
              />
            ) : (
              <path
                d="M12 5.5a6.5 6.5 0 1 0 6.5 6.5A6.508 6.508 0 0 0 12 5.5Zm0-3.5a1 1 0 0 1 1 1v1a1 1 0 0 1-2 0V3a1 1 0 0 1 1-1Zm0 17a1 1 0 0 1 1 1v1a1 1 0 1 1-2 0v-1a1 1 0 0 1 1-1Zm10-6a1 1 0 0 1-1 1h-1a1 1 0 0 1 0-2h1a1 1 0 0 1 1 1Zm-17 0a1 1 0 0 1-1 1H3a1 1 0 1 1 0-2h1a1 1 0 0 1 1 1Zm12.728-7.071a1 1 0 0 1 0 1.414l-.707.707a1 1 0 0 1-1.414-1.414l.707-.707a1 1 0 0 1 1.414 0ZM7.393 16.97a1 1 0 0 1 0 1.414l-.707.707a1 1 0 0 1-1.414-1.414l.707-.707a1 1 0 0 1 1.414 0Zm0-11.314-.707-.707A1 1 0 1 1 8.1 3.535l.707.707A1 1 0 0 1 7.393 5.656Zm9.9 9.9-.707-.707a1 1 0 1 1 1.414-1.414l.707.707a1 1 0 0 1-1.414 1.414Z"
                fill="currentColor"
              />
            )}
          </svg>
        </button>
      </div>
    </div>
  );
}

