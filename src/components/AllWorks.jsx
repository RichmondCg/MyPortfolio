import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Navigation from "./Navigation.jsx";
import { WorkCard } from "./Works.jsx";
import { projects } from "../data/projects.js";
import { Link } from "react-router-dom";

gsap.registerPlugin(ScrollTrigger);

const GRID_AREAS =
  '"nueva paps" "preparado preparado" "clinic smartfit" "irri sfads"';

function AllWorks() {
  const curtainRef = useRef(null);
  const headRef = useRef(null);
  const subRef = useRef(null);
  const gridRef = useRef(null);
  const cursorRef = useRef(null);
  const [isHoverDevice, setIsHoverDevice] = useState(false);

  useEffect(() => {
    const checkHover = () => {
      const hasHover = window.matchMedia(
        "(hover: hover) and (pointer: fine)",
      ).matches;
      setIsHoverDevice(hasHover);
    };
    checkHover();
    window.addEventListener("resize", checkHover);
    return () => window.removeEventListener("resize", checkHover);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      tl.set([headRef.current, subRef.current, gridRef.current], {
        autoAlpha: 0,
        y: 40,
      })
        .to(
          curtainRef.current,
          { yPercent: -100, duration: 0.7, ease: "power4.inOut" },
          0,
        )
        .to(
          [headRef.current, subRef.current],
          { autoAlpha: 1, y: 0, duration: 0.9, stagger: 0.1 },
          "-=0.25",
        )
        .to(gridRef.current, { autoAlpha: 1, y: 0, duration: 0.8 }, "-=0.3");
    }, gridRef);

    return () => ctx.revert();
  }, []);

  // Recalculate ScrollTrigger positions once everything has loaded
  useEffect(() => {
    const onLoad = () => ScrollTrigger.refresh();
    window.addEventListener("load", onLoad);
    const timer = setTimeout(() => ScrollTrigger.refresh(), 1500);
    return () => {
      window.removeEventListener("load", onLoad);
      clearTimeout(timer);
    };
  }, []);

  return (
    <div className="relative min-h-screen w-full bg-white font-mono text-black select-none">
      {/* Loading curtain */}
      <div
        ref={curtainRef}
        className="absolute inset-0 z-50 bg-white will-change-transform"
      />

      <Navigation />

      <main className="mx-auto max-w-[1200px] px-6 pt-32 md:px-12 md:pt-44">
        <div className="flex items-end justify-between mb-10 md:mb-16">
          <div ref={headRef}>
            <h1 className="font-display text-[clamp(2rem,8vw,12rem)] leading-[0.8] tracking-tight text-black">
              Works
            </h1>
          </div>
          <p
            ref={subRef}
            className="text-[12px] tracking-[0.2em] uppercase text-neutral-400 font-mono pb-2"
          >
            All Projects
          </p>
        </div>

        <div
          ref={gridRef}
          className="works-grid relative mb-10"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gridTemplateRows: "auto auto auto auto",
            gridTemplateAreas: GRID_AREAS,
            gap: "10rem 5rem",
            willChange: "transform",
          }}
        >
          {projects.map((project, index) => (
            <WorkCard
              key={project.id}
              project={project}
              index={index}
              cursorRef={cursorRef}
              isHoverDevice={isHoverDevice}
            />
          ))}
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

      {isHoverDevice && (
        <div
          ref={cursorRef}
          className="cursor-work fixed top-0 left-0 z-[100] pointer-events-none"
          style={{
            transform: "translate(-50%, -50%) scale(0, 0)",
            willChange: "transform, opacity",
          }}
          aria-hidden="true"
        >
          <div className="flex items-center gap-2 bg-black px-5 py-3 rounded-full">
            <span className="text-white text-[12px] font-mono tracking-[0.15em] uppercase">
              explore
            </span>
            <svg
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
              className="text-white"
              aria-hidden="true"
            >
              <path
                d="M1 13L13 1M13 1H4M13 1V10"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </div>
        </div>
      )}
    </div>
  );
}

export default AllWorks;
