import { useEffect, useRef } from "react";
import gsap from "gsap";
import { Link } from "react-router-dom";
import Navigation from "./Navigation.jsx";
import PhotoStack from "./PhotoStack.jsx";
import FloatingNav from "./FloatingNav.jsx";

function AboutMe() {
  const curtainRef = useRef(null);
  const headRef = useRef(null);
  const copyRef = useRef(null);
  const listRef = useRef(null);
  const photosRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      tl.set([headRef.current, copyRef.current, ".me-fade"], {
        autoAlpha: 0,
        y: 30,
      })
        .set([listRef.current, photosRef.current], { autoAlpha: 0, y: 40 })
        .to(
          curtainRef.current,
          { yPercent: -100, duration: 0.7, ease: "power4.inOut" },
          0,
        )
        .to(
          [headRef.current, copyRef.current, ".me-fade"],
          { autoAlpha: 1, y: 0, duration: 0.9, stagger: 0.1 },
          "-=0.25",
        )
        .to(
          photosRef.current,
          { autoAlpha: 1, y: 0, duration: 0.9, ease: "power3.out" },
          "-=0.5",
        )
        .to(listRef.current, { autoAlpha: 1, y: 0, duration: 0.6 }, "-=0.4");
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="relative min-h-screen w-full bg-white font-mono text-black select-none">
      {/* Loading curtain */}
      <div
        ref={curtainRef}
        className="absolute inset-0 z-50 bg-white will-change-transform"
      />

      {/* Top bar + Menu */}
      <Navigation />

      {/* Content */}
      <main className="mx-auto max-w-5xl px-6 pt-32 md:px-12 md:pt-44">
        <p className="me-fade mb-4 text-[11px] tracking-[0.32em] uppercase">
          About me
        </p>
        <h1
          ref={headRef}
          className="font-display text-[clamp(2.5rem,8vw,7rem)] leading-none tracking-tight"
        >
          Richmond Gillaco
        </h1>

        {/* Portrait photo stack */}
        <div ref={photosRef} className="mt-16">
          <PhotoStack />
        </div>
        {/* description */}
        <div ref={copyRef} className="mt-8 max-w-2xl">
          <p className="text-sm leading-relaxed md:text-base">
            I build thoughtful, playful web experiences at the intersection of
            design and engineering. My work blends bold typography, motion, and
            clean systems to make interfaces feel alive.
          </p>
          <p className="mt-4 text-sm leading-relaxed md:text-base">
            Based in the Philippines, I focus on front-end development, creative
            direction, and interaction design — turning ideas into fast,
            accessible, and delightful products.
          </p>
          <p className="mt-4 text-sm leading-relaxed md:text-base">
            I am someone who leverage AI capabilities to build web systems or
            website not just secure and robust but as well thinking in terms of
            delivering a good user interface and user experience.
          </p>
        </div>

        {/* Know me more CTA */}
        <div className="me-fade mt-10">
          <Link
            to="/story"
            className="group inline-flex items-center gap-4 rounded-full border border-black px-8 py-4 text-[11px] tracking-[0.25em] uppercase transition-colors duration-300 hover:bg-black hover:text-white"
          >
            Know me more
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              aria-hidden="true"
              className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
            >
              <path
                d="M1 11L11 1M11 1H3M11 1V9"
                stroke="currentColor"
                strokeWidth="1.5"
              />
            </svg>
          </Link>
        </div>

        <div ref={listRef} className="mt-16 grid gap-10 md:grid-cols-3">
          <div>
            <p className="me-fade mb-3 text-[11px] tracking-[0.32em] uppercase opacity-60">
              What I do
            </p>
            <ul className="space-y-2 text-sm">
              <li>Full-stack Development</li>
              <li>AI Development</li>
              <li>Automation</li>
              <li>Web Development</li>
              <li>WordPress Development</li>
              <li>Creative Direction</li>
              <li>SEO and Website Optimization</li>
            </ul>
          </div>
          <div>
            <p className="me-fade mb-3 text-[11px] tracking-[0.32em] uppercase opacity-60">
              Toolbox
            </p>
            <ul className="space-y-2 text-sm">
              <li>React / Javascript / TypeScript</li>
              <li>WordPress / SEO</li>
              <li>Tailwind CSS / Bootstrap</li>
              <li>Node.js / Express.js</li>
              <li>MySQL / MongoDB / Supabase</li>
              <li>GSAP / WebGL</li>
              <li>Three.js</li>
            </ul>
          </div>
          <div>
            <p className="me-fade mb-3 text-[11px] tracking-[0.32em] uppercase opacity-60">
              Currently
            </p>
            <ul className="space-y-2 text-sm">
              <li>Looking for full-time job</li>
              <li>Agentic or AI-Assisted Development</li>
              <li></li>
              <li>Available for projects</li>
              <li>Learning 3D experiences</li>
            </ul>
          </div>
        </div>

        <div className="my-10 border-t border-black/10 py-10">
          <Link
            to="/"
            className="group inline-flex items-center gap-4 rounded-full border border-black px-8 py-4 text-[11px] tracking-[0.25em] uppercase transition-colors duration-300 hover:bg-black hover:text-white"
          >
            Back home
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

      {/* Floating section nav */}
      <FloatingNav />
    </div>
  );
}

export default AboutMe;
