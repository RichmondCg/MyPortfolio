import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import PeelText from "./PeelText.jsx";
import Navigation from "./Navigation.jsx";

function Hero() {
  const curtainRef = useRef(null);
  const tagWrapRef = useRef(null);
  const bottomRef = useRef(null);
  const navRef = useRef(null);
  const footRef = useRef(null);
  const btnRef = useRef(null);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 2 });

      tl.set(".peel-text-wrap", { autoAlpha: 0 })
        .set(".line-inner", { autoAlpha: 0, yPercent: 110 })
        .set(".fade-up", { autoAlpha: 0, y: 24 })
        .set([navRef.current, footRef.current], { autoAlpha: 0 })
        .to(
          curtainRef.current,
          { yPercent: -100, duration: 0.7, ease: "power4.inOut" },
          0,
        )
        .to(
          ".peel-text-wrap",
          { autoAlpha: 1, duration: 0.6, ease: "power2.out" },
          "-=0.25",
        )
        .to(
          ".line-inner",
          { autoAlpha: 1, yPercent: 0, duration: 0.85, stagger: 0.12 },
          "+=0.15",
        )
        .to(
          ".fade-up",
          { autoAlpha: 1, y: 0, duration: 0.7, stagger: 0.08 },
          "-=0.35",
        )
        .to(
          [navRef.current, footRef.current],
          { autoAlpha: 1, duration: 0.6, stagger: 0.08 },
          "-=0.3",
        );
    });

    return () => ctx.revert();
  }, []);

  // Idle attention pulse
  useEffect(() => {
    const btn = btnRef.current;
    if (!btn) return;

    const pulse = gsap.to(btn, {
      scale: 1.03,
      duration: 1.4,
      ease: "sine.inOut",
      yoyo: true,
      repeat: -1,
      delay: 4,
      paused: true,
    });

    const timeout = setTimeout(() => pulse.play(), 4000);

    return () => {
      clearTimeout(timeout);
      pulse.kill();
    };
  }, []);

  // Magnetic hover effect
  useEffect(() => {
    const btn = btnRef.current;
    if (!btn) return;

    const onMove = (e) => {
      if (!hovered) return;
      const rect = btn.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = (e.clientX - cx) * 0.35;
      const dy = (e.clientY - cy) * 0.35;
      gsap.to(btn, {
        x: dx,
        y: dy,
        duration: 0.4,
        ease: "power2.out",
      });
    };

    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [hovered]);

  const handleMouseEnter = () => {
    setHovered(true);
    gsap.to(btnRef.current, {
      scale: 1.08,
      duration: 0.4,
      ease: "power2.out",
    });
  };

  const handleMouseLeave = () => {
    setHovered(false);
    gsap.to(btnRef.current, {
      scale: 1,
      x: 0,
      y: 0,
      duration: 0.6,
      ease: "elastic.out(1, 0.5)",
    });
  };

  // Parallax effect
  useEffect(() => {
    const isHoverDevice = window.matchMedia(
      "(hover: hover) and (pointer: fine)",
    ).matches;
    if (!isHoverDevice) return;

    const mouse = { x: -9999, y: -9999 };
    const lerp = { x: -9999, y: -9999 };

    const onMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };
    window.addEventListener("mousemove", onMove);

    let raf;
    const loop = () => {
      lerp.x += (mouse.x - lerp.x) * 0.1;
      lerp.y += (mouse.y - lerp.y) * 0.1;

      const nx = (lerp.x / window.innerWidth) * 2 - 1;
      const ny = (lerp.y / window.innerHeight) * 2 - 1;

      if (tagWrapRef.current) {
        tagWrapRef.current.style.transform = `translate3d(${(nx * -6).toFixed(2)}px, ${(ny * -4).toFixed(2)}px, 0)`;
      }
      if (bottomRef.current) {
        bottomRef.current.style.transform = `translate3d(${(nx * 4).toFixed(2)}px, ${(ny * 3).toFixed(2)}px, 0)`;
      }

      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
    };
  }, []);

  // Cycling words for button
  const words = ["the human", "the story", "the mind", "the person"];
  const [wordIndex, setWordIndex] = useState(0);
  const wordRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      if (wordRef.current) {
        gsap.to(wordRef.current, {
          yPercent: -110,
          autoAlpha: 0,
          duration: 0.3,
          ease: "power2.in",
          onComplete: () => {
            setWordIndex((prev) => (prev + 1) % words.length);
            gsap.fromTo(
              wordRef.current,
              { yPercent: 110, autoAlpha: 0 },
              { yPercent: 0, autoAlpha: 1, duration: 0.35, ease: "power2.out" },
            );
          },
        });
      }
    }, 1800);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative h-screen w-full overflow-hidden bg-white font-mono text-black select-none">
      {/* Loading curtain */}
      <div
        ref={curtainRef}
        className="absolute inset-0 z-50 bg-white will-change-transform"
      />

      {/* Top bar + Menu */}
      <Navigation navRef={navRef} />

      {/* Hero content */}
      <main className="relative z-10 flex h-full flex-col justify-center px-4 sm:px-6 md:px-12">
        {/* Tagline */}
        <div
          ref={tagWrapRef}
          className="mb-6 sm:mb-8 max-w-2xl will-change-transform md:mb-10"
        >
          <p className="overflow-hidden">
            <span className="line-inner block text-[10px] sm:text-[11px] tracking-[0.32em] uppercase md:text-xs">
              Welcome to my Portfolio
            </span>
          </p>
          <p className="mt-1.5 sm:mt-2 overflow-hidden">
            <span className="line-inner block text-[10px] sm:text-[11px] tracking-[0.32em] uppercase md:text-xs">
              Feel free to see everything.
            </span>
          </p>
        </div>

        {/* Headline */}
        <div
          style={{ height: "clamp(3rem, 15vw, 16rem)" }}
          className="mb-8 sm:mb-10"
        >
          <PeelText
            text="RCHMND."
            revealDelay={2400}
            className="font-display text-[clamp(2.5rem,16vw,16rem)] leading-none tracking-widest"
          />
        </div>

        {/* The Button */}
        <div className="fade-up flex flex-col items-center gap-2 mb-8 sm:mb-10">
          {/* Hint text above */}
          <p className="text-[9px] sm:text-[10px] tracking-[0.3em] uppercase text-black/70 animate-pulse">
            curious?
          </p>

          <a
            ref={btnRef}
            href="/me"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            style={{ willChange: "transform" }}
            className="relative group inline-flex items-center gap-2 sm:gap-3 rounded-full border border-black bg-black text-white px-6 sm:px-8 py-3 sm:py-4 text-[10px] sm:text-[11px] tracking-[0.25em] uppercase overflow-hidden"
          >
            {/* Shine sweep on hover */}
            <span
              className="pointer-events-none absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out"
              style={{
                background:
                  "linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.15) 50%, transparent 60%)",
              }}
            />

            {/* Static prefix */}
            <span className="relative z-10 shrink-0">Meet</span>

            {/* Cycling word */}
            <span
              className="relative z-10 overflow-hidden inline-block"
              style={{ minWidth: "clamp(3.5rem, 8vw, 5.5rem)" }}
            >
              <span ref={wordRef} className="block text-left">
                {words[wordIndex]}
              </span>
            </span>

            {/* Arrow */}
            <svg
              width="11"
              height="11"
              viewBox="0 0 12 12"
              fill="none"
              aria-hidden="true"
              className="relative z-10 shrink-0 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
            >
              <path
                d="M1 11L11 1M11 1H3M11 1V9"
                stroke="currentColor"
                strokeWidth="1.5"
              />
            </svg>
          </a>

          {/* Hint text below */}
          <p className="text-[9px] sm:text-[10px] tracking-[0.3em] uppercase text-black/70 animate-pulse">
            it's worth it
          </p>
        </div>

        {/* Subtext + CTAs */}
        <div
          ref={bottomRef}
          className="flex flex-col items-start justify-between gap-6 sm:gap-8 md:flex-row md:items-end will-change-transform"
        >
          <p className="fade-up text-[10px] sm:text-[11px] tracking-[0.32em] uppercase md:text-xs">
            Created by Richmond Gillaco
          </p>

          {/* Send email */}
          <a
            href="mailto:richmondcamusgillaco@gmail.com"
            className="fade-up group inline-flex items-center gap-3 sm:gap-4 rounded-full border border-black px-6 sm:px-8 py-3 sm:py-4 text-[10px] sm:text-[11px] tracking-[0.25em] uppercase transition-colors duration-300 hover:bg-black hover:text-white"
          >
            Send email
            <svg
              width="11"
              height="11"
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
          </a>
        </div>
      </main>

      {/* Footer */}
      <footer
        ref={footRef}
        className="absolute inset-x-0 bottom-0 z-20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-6 px-4 sm:px-6 py-5 sm:py-6 text-[10px] sm:text-[11px] tracking-[0.25em] uppercase md:px-10"
      >
        <div className="flex items-center gap-4 sm:gap-6 flex-wrap">
          {[
            {
              label: "LinkedIn",
              href: "https://linkedin.com/in/richmond-gillaco-9892812a5",
            },
            { label: "GitHub", href: "https://github.com/RichmondCg" },
            {
              label: "Instagram",
              href: "https://www.instagram.com/richmond_gillaco?igsh=cDJheHhxemx6ODhw",
            },
          ].map(({ label, href }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noreferrer"
              className="transition-opacity hover:opacity-50"
            >
              {label}
              <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-white transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </div>
        <button type="button" className="flex items-center gap-2 uppercase">
          Scroll Down
          <svg
            width="8"
            height="8"
            viewBox="0 0 8 8"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M1 2.5L4 5.5L7 2.5"
              stroke="currentColor"
              strokeWidth="1"
            />
          </svg>
        </button>
      </footer>
    </div>
  );
}

export default Hero;
