import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import workImage from "../../assets/whywork.png";

gsap.registerPlugin(ScrollTrigger);

const STACK_GROUPS = [
  {
    category: "Frontend",
    items: ["HTML", "CSS", "JavaScript", "React JS", "Tailwind"],
  },
  { category: "Backend", items: ["Node.js", "Express"] },
  { category: "Database", items: ["MySQL"] },
  { category: "IoT", items: ["Arduino, NodeMCU"] },
  { category: "CMS & Builder", items: ["WordPress", "Elementor"] },
  {
    category: "Other Skills",
    items: [
      "UI/UX Design",
      "Responsive Design",
      "System Thinking",
      "Database Design",
      "Business Analysis"
    ],
  },
];

const PILLARS = [
  {
    label: "Full Stack Development",
    desc: "End-to-end web solutions from UI to server.",
  },
  {
    label: "System Development",
    desc: "Blending IoT, Web, and Database for seamless automation."
  },
  {
    label: "Design-Driven Thinking",
    desc: "Aesthetic meets function in every decision.",
  },
  {
    label: "Modern Tools & Technologies",
    desc: "Current stack, best practices, clean code.",
  },
  {
    label: "Solution-Focused Approach",
    desc: "I solve problems, not just write features.",
  },
  
];

function Why() {
  const sectionRef = useRef(null);
  const glowRef = useRef(null);
  const leftRef = useRef(null);
  const rightRef = useRef(null);
  const pillarsRef = useRef(null);

  /* Cursor-tracked glow */
  const handleMouseMove = (e) => {
    const rect = sectionRef.current?.getBoundingClientRect();
    if (!rect || !glowRef.current) return;
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    glowRef.current.style.background = `radial-gradient(600px circle at ${x}px ${y}px, rgba(45,93,144,0.28) 0%, transparent 70%)`;
  };

  /* GSAP scroll entrance */
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(leftRef.current, {
        scrollTrigger: { trigger: sectionRef.current, start: "top 80%" },
        x: -60,
        opacity: 0,
        duration: 1,
        ease: "power4.out",
      });
      gsap.from(rightRef.current, {
        scrollTrigger: { trigger: sectionRef.current, start: "top 78%" },
        x: 60,
        opacity: 0,
        duration: 1,
        delay: 0.15,
        ease: "power4.out",
      });
      gsap.from("[data-pillar]", {
        scrollTrigger: { trigger: pillarsRef.current, start: "top 90%" },
        y: 40,
        opacity: 0,
        duration: 0.65,
        stagger: 0.12,
        ease: "power3.out",
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      className="relative overflow-hidden bg-gradient-to-br from-[#0D1B2A] via-[#152336] to-[#0D1B2A] text-white"
    >
      {/* Cursor glow layer */}
      <div
        ref={glowRef}
        className="pointer-events-none absolute inset-0 transition-all duration-75"
      />

      {/* ── Heading ── */}
      <div className="relative z-10 pt-10 sm:pt-20 pb-2 sm:pb-4 text-center px-6">
        <h1 className="text-5xl sm:text-6xl lg:text-8xl font-black leading-tight tracking-tight">
          Why work with me?
        </h1>
      </div>

      {/* ── Two-column: image + stack ── */}
      <div className="relative z-10 mx-auto max-w-7xl px-6 sm:px-8 py-6 sm:py-10 pb-16 sm:pb-24 grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-12 items-center">
        {/* LEFT — image */}
        <div ref={leftRef} className="flex justify-center lg:justify-start">
          <img
            src={workImage}
            alt="Sitting developer"
            className="w-52 sm:w-80 lg:w-[420px] h-auto object-contain drop-shadow-2xl"
          />
        </div>

        {/* RIGHT — tech stack + pillars */}
        <div ref={rightRef} className="flex flex-col gap-8">
          {/* Tech stack */}
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-blue-300 mb-4">
              Technologies &amp; Tools
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-5">
              {STACK_GROUPS.map((group) => (
                <div key={group.category}>
                  <p className="text-xs font-bold uppercase tracking-widest text-blue-400 mb-1.5">
                    {group.category}
                  </p>
                  <p className="text-slate-200 text-sm sm:text-base leading-relaxed">
                    {group.items.map((item, idx) => (
                      <span key={item} className="stack-item">
                        {item}
                        {idx < group.items.length - 1 && (
                          <span className="mx-1.5 text-slate-600">•</span>
                        )}
                      </span>
                    ))}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Pillars */}
          <div ref={pillarsRef}>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-blue-300">
              What I Bring
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {PILLARS.map((p) => (
                <div
                  key={p.label}
                  data-pillar
                  className="pillar-chip flex flex-col gap-1.5 rounded-xl border border-white/10 bg-white/[0.05] backdrop-blur-sm px-5 py-4"
                >
                  <span className="text-sm font-bold text-white leading-snug">
                    {p.label}
                  </span>
                  <span className="text-xs text-slate-400 leading-relaxed">
                    {p.desc}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Why;
