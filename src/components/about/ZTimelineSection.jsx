import React, { useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function ZTimelineSection({ title, eyebrow, icon, items }) {
  const sectionRef = useRef(null);
  const containerRef = useRef(null);

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      const cards = gsap.utils.toArray(".z-card");

      // Set all cards to be initialized identically tiny and invisible.
      gsap.set(cards, {
        scale: 0,
        opacity: 0,
        zIndex: (i) => cards.length - i,
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: `+=${cards.length * 150}%`, // Generous scroll distance depending on card count
          pin: true,
          scrub: 1, // Smooth scrolling effect
          anticipatePin: 1,
        },
      });

      // Sequential zigzag animation (cards pull left/right completely off screen)
      cards.forEach((card, i) => {
        const arrivalTime = i * 1.5;
        const exitTime = arrivalTime + 1.5;

        // Define alternating exit direction (zigzag)
        // Even index goes left (-150vw), Odd index goes right (+150vw)
        const exitX = i % 2 === 0 ? "-150vw" : "150vw";
        const exitRotation = i % 2 === 0 ? -10 : 10;

        tl.to(
          card,
          {
            scale: 1,
            opacity: 1,
            ease: "power2.out",
            duration: 1.5,
          },
          arrivalTime,
        ).to(
          card,
          {
            x: exitX, // Slides out of the screen zigzag style
            rotation: exitRotation, // Slight tilt as it slides away
            opacity: 0,
            ease: "power2.in",
            duration: 1.5,
          },
          exitTime,
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [items]);

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-screen overflow-hidden bg-transparent"
    >
      {/* Fixed Sticky Header for the section */}
      <div className="absolute top-10 left-6 sm:left-10 lg:left-14 flex flex-col gap-2 z-[100]">
        <div className="flex items-center gap-3">
          {icon}
          <h2 className="text-3xl font-black sm:text-4xl text-white">
            {title}
          </h2>
        </div>
        <p className="text-xs uppercase tracking-[0.3em] text-[#93c5fd]">
          {eyebrow}
        </p>
      </div>

      {/* 3D Container where cards fly towards user */}
      <div
        ref={containerRef}
        className="relative flex h-full w-full items-center justify-center pt-20 px-6 perspective-1000"
      >
        {items.map((item, index) => (
          <div
            key={`${item.year}-${index}`}
            className="z-card absolute w-full max-w-[600px] p-8 md:p-12 rounded-3xl bg-white/[0.05] border border-white/10 backdrop-blur-md shadow-[0_0_40px_rgba(0,0,0,0.5)] flex flex-col gap-4 text-center transform-gpu"
            style={{ willChange: "transform, opacity" }}
          >
            <span className="text-[#93c5fd] font-black text-3xl tracking-wider">
              {item.year}
            </span>
            <h3 className="text-3xl sm:text-4xl font-black text-white">
              {item.title}
            </h3>
            {item.lists && (
              <ul className="text-slate-200 space-y-3 mt-4 text-lg">
                {item.lists.map((list, i) => (
                  <li key={i} className="flex justify-center gap-2">
                    <span className="text-[#93c5fd]">✦</span>
                    <span className="text-left leading-relaxed">{list}</span>
                  </li>
                ))}
              </ul>
            )}
            {item.description && (
              <p className="text-slate-300 mt-4 leading-relaxed text-lg">
                {item.description}
              </p>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

export default ZTimelineSection;
