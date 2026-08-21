import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Footer() {
  const footerRef = useRef(null);
  const headingRef = useRef(null);
  const bigTextRef = useRef(null);
  const ctaRef = useRef(null);
  const linksRef = useRef(null);
  const bottomRef = useRef(null);

  const runAnimations = () => {
    gsap.set(".footer-line-inner", { yPercent: 110, autoAlpha: 0 });
    gsap.set(".footer-big-text", { yPercent: 15, autoAlpha: 0 });
    gsap.set(".cta-item", { autoAlpha: 0, y: 30 });
    gsap.set(".social-item", { autoAlpha: 0, y: 20 });
    gsap.set(".bottom-item", { autoAlpha: 0, y: 16 });
    gsap.set(".divider-line", { scaleX: 0, transformOrigin: "left center" });

    gsap.to(".footer-line-inner", {
      yPercent: 0,
      autoAlpha: 1,
      duration: 1.1,
      ease: "power3.out",
      stagger: 0.13,
    });

    gsap.to(".footer-big-text", {
      yPercent: 0,
      autoAlpha: 1,
      duration: 1.4,
      ease: "power3.out",
      delay: 0.2,
    });

    gsap.to(".cta-item", {
      autoAlpha: 1,
      y: 0,
      duration: 0.8,
      ease: "power3.out",
      stagger: 0.15,
      delay: 0.25,
    });

    gsap.to(".social-item", {
      autoAlpha: 1,
      y: 0,
      duration: 0.7,
      ease: "power3.out",
      stagger: 0.1,
      delay: 0.35,
    });

    gsap.to(".divider-line", {
      scaleX: 1,
      duration: 1,
      ease: "power3.out",
      stagger: 0.1,
      delay: 0.15,
    });

    gsap.to(".bottom-item", {
      autoAlpha: 1,
      y: 0,
      duration: 0.7,
      ease: "power3.out",
      stagger: 0.08,
      delay: 0.45,
    });
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Set initial hidden state
      gsap.set(".footer-line-inner", { yPercent: 110, autoAlpha: 0 });
      gsap.set(".footer-big-text", { yPercent: 15, autoAlpha: 0 });
      gsap.set(".cta-item", { autoAlpha: 0, y: 30 });
      gsap.set(".social-item", { autoAlpha: 0, y: 20 });
      gsap.set(".bottom-item", { autoAlpha: 0, y: 16 });
      gsap.set(".divider-line", { scaleX: 0, transformOrigin: "left center" });

      // Runs every time footer enters viewport (no once: true)
      ScrollTrigger.create({
        trigger: footerRef.current,
        start: "top 85%",
        onEnter: runAnimations,
        onEnterBack: runAnimations, // ⬅️ re-runs when scrolling back up into footer
      });
    }, footerRef);

    return () => ctx.revert();
  }, []);

  return (
    <footer
      ref={footerRef}
      id="footer"
      className="relative bg-black text-white overflow-hidden"
    >
      <div className="mx-auto px-6 md:px-12">
        {/* Top section: heading + CTA */}
        <div className="pt-20 md:pt-28 pb-16 md:pb-20 flex flex-col md:flex-row md:items-end md:justify-between gap-12">
          {/* Left: heading */}
          <div ref={headingRef} className="flex-1">
            <p className="overflow-hidden mb-4">
              <span className="footer-line-inner block text-sm tracking-[0.35em] uppercase font-mono text-white/30">
                Let's work together
              </span>
            </p>
            <h2 className="font-display text-[clamp(2.8rem,6vw,5.5rem)] leading-[0.92] tracking-tight">
              {["Let's built it!", "Together."].map((line, i) => (
                <span key={i} className="block overflow-hidden">
                  <span className="footer-line-inner block">{line}</span>
                </span>
              ))}
            </h2>
          </div>

          {/* Right: CTAs */}
          <div ref={ctaRef} className="flex flex-col gap-3 md:items-end">
            <a
              href="mailto:richmondcamusgillaco@gmail.com"
              className="cta-item group inline-flex items-center gap-4 border border-white rounded-full px-7 py-3.5 text-[11px] tracking-[0.25em] uppercase font-mono hover:bg-white hover:text-black transition-colors duration-300 w-fit"
            >
              Drop me an email
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
        </div>

        {/* Divider */}
        <div className="divider-line h-px bg-white/10 w-full" />

        {/* Big RCHMND text */}
        <div
          ref={bigTextRef}
          className="overflow-hidden py-6 md:py-8 -mx-6 md:-mx-12"
        >
          <h1 className="footer-big-text font-display text-[clamp(5rem,18vw,18rem)] leading-[0.82] tracking-tighter text-white/8 text-center select-none will-change-transform px-6 md:px-12 transition-colors duration-500 hover:text-white cursor-default">
            RCHMND.
          </h1>
        </div>

        {/* Divider */}
        <div className="divider-line h-px bg-white/10 w-full" />

        {/* Bottom bar */}
        <div
          ref={bottomRef}
          className="py-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative"
        >
          {/* Social links */}
          <div ref={linksRef} className="flex items-center gap-6">
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
                className="social-item relative text-[11px] tracking-[0.2em] uppercase font-mono text-white/40 hover:text-white transition-colors duration-300 group"
              >
                {label}
                <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-white transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </div>

          {/* Center: copyright */}
          <p className="bottom-item text-[11px] tracking-[0.2em] uppercase font-mono text-white/25 md:absolute md:left-1/2 md:-translate-x-1/2">
            ©2026 — Richmond Gillaco
          </p>

          {/* Right: back to top */}
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="bottom-item group flex items-center gap-2 text-[11px] tracking-[0.2em] uppercase font-mono text-white/40 hover:text-white transition-colors duration-300"
          >
            Back to top
            <svg
              width="10"
              height="10"
              viewBox="0 0 10 10"
              fill="none"
              aria-hidden="true"
              className="transition-transform duration-300 group-hover:-translate-y-1"
            >
              <path
                d="M5 9V1M1 5l4-4 4 4"
                stroke="currentColor"
                strokeWidth="1.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>
    </footer>
  );
}
