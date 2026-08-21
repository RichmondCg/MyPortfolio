import { useEffect, useRef } from "react";
import gsap from "gsap";
import { Link } from "react-router-dom";
import Navigation from "./Navigation.jsx";

const STACK = [
  {
    group: "Front-end",
    items: [
      "Javascript",
      "React",
      "Tailwind CSS",
      "Bootstrap",
      "GSAP",
      "Three.js",
      "WebGL",
      "Vite",
      "Prettier",
      "SEO",
    ],
  },
  {
    group: "Back-end",
    items: [
      "Node.js",
      "Express.js",
      "PHP",
      "Python",
      "MySQL",
      "MongoDB",
      "Supabase",
      "JWT",
      "REST",
    ],
  },
  {
    group: "AI & Automation",
    items: [
      "Claude Code",
      "Codex",
      "Open Code",
      "Llama",
      "Openrouter",
      "OpenAI",
      "LangChain",
      "AI Integration",
      "Zapier",
    ],
  },
  {
    group: "CMS & No-code",
    items: ["Wordpress"],
  },
  {
    group: "QA & Testing Tools",
    items: ["PostMan", "Playwright", "Manual Testing", "API Testing"],
  },
  {
    group: "Networking",
    items: [
      "Basic Networking",
      "Cloudflare",
      "DNS",
      "Active Directory",
      "Microsoft 365",
    ],
  },
  {
    group: "Developer Tools",
    items: ["Git", "GitHub", "VS Code", "JetBrains IntelliJ", "Notion", "JIRA"],
  },
];

function Stack() {
  const curtainRef = useRef(null);
  const headRef = useRef(null);
  const introRef = useRef(null);
  const listRef = useRef(null);
  const footRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      tl.set([headRef.current, introRef.current], { autoAlpha: 0, y: 30 })
        .set([listRef.current, footRef.current], { autoAlpha: 0, y: 40 })
        .to(
          curtainRef.current,
          { yPercent: -100, duration: 0.7, ease: "power4.inOut" },
          0,
        )
        .to(
          [headRef.current, introRef.current],
          { autoAlpha: 1, y: 0, duration: 0.9, stagger: 0.1 },
          "-=0.25",
        )
        .to(
          listRef.current,
          { autoAlpha: 1, y: 0, duration: 0.8, ease: "power3.out" },
          "-=0.4",
        )
        .to(footRef.current, { autoAlpha: 1, y: 0, duration: 0.6 }, "-=0.3");
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="relative min-h-screen w-full bg-white font-mono text-black select-none">
      <div
        ref={curtainRef}
        className="absolute inset-0 z-50 bg-white will-change-transform"
      />

      <Navigation />

      <main className="mx-auto max-w-5xl px-6 pt-32 md:px-12 md:pt-44">
        <p className="mb-4 text-[11px] tracking-[0.32em] uppercase opacity-60">
          02 · Stack
        </p>
        <h1
          ref={headRef}
          className="font-display text-[clamp(2.5rem,8vw,7rem)] leading-none tracking-tight"
        >
          Stack
        </h1>

        <div ref={introRef} className="mt-8 max-w-2xl">
          <p className="text-sm leading-relaxed md:text-base">
            The tools, frameworks, and platforms I reach for to turn ideas and
            business problems into useful products. - front end, back end,
            automation, and AI.
          </p>
        </div>

        <div ref={listRef} className="mt-16 grid gap-10 md:grid-cols-2">
          {STACK.map((group) => (
            <div key={group.group}>
              <p className="mb-4 text-[11px] tracking-[0.32em] uppercase opacity-60">
                {group.group}
              </p>
              <div className="flex flex-wrap gap-3">
                {group.items.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-full border border-black/20 px-5 py-2 text-xs tracking-[0.15em] uppercase transition-colors duration-300 hover:border-black hover:bg-black hover:text-white"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div ref={footRef} className="my-10 border-t border-black/10 py-10">
          <Link
            to="/me"
            className="group inline-flex items-center gap-4 rounded-full border border-black px-8 py-4 text-[11px] tracking-[0.25em] uppercase transition-colors duration-300 hover:bg-black hover:text-white"
          >
            Back to about
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              aria-hidden="true"
              className="transition-transform duration-300 group-hover:-translate-x-1 group-hover:translate-y-1"
            >
              <path
                d="M11 1L1 11M1 11H9M1 11V3"
                stroke="currentColor"
                strokeWidth="1.5"
              />
            </svg>
          </Link>
        </div>
      </main>
    </div>
  );
}

export default Stack;
