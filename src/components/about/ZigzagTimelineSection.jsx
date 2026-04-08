import React, { useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function ZigzagTimelineSection({ title, eyebrow, items }) {
  const sectionRef = useRef(null);
  const wrapperRef = useRef(null);

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      // The timeline precisely translates a 100vw x 100vh viewport wrapper
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=200%", // 3 screens total (2 transitions + 1 solid hold buffer)
          pin: true,
          pinSpacing: true,
          scrub: true,
          refreshPriority: 10, // Calculates this giant pin FIRST
          snap: {
            snapTo: [0, 0.333, 0.666, 1], // mathematically rigorous snapping for the 3 bounds
            duration: { min: 0.2, max: 0.6 },
            ease: "power2.inOut",
          },
          anticipatePin: 1,
        },
      });

      // Pan diagonally down-right to Card 2
      tl.to(wrapperRef.current, {
        xPercent: -100,
        yPercent: -100,
        ease: "none",
        duration: 2,
      })
        // Pan diagonally down-left to Card 3
        .to(wrapperRef.current, {
          xPercent: 0,
          yPercent: -200,
          ease: "none",
          duration: 2,
        })
        // HOLD Card 3 firmly in the exact center of the screen
        // This prevents the "rushed" feeling and stops the Education section
        // from overflowing/appearing prematurely until the user fully completes the Zigzag section!
        .to(
          {},
          {
            duration: 2,
          },
        );

      // Force completely refreshing triggers globally so Education/Awards
      // accurately map their start bounds against this component's new 300% pin spacer padding
      gsap.delayedCall(0.1, () => ScrollTrigger.refresh());
    }, sectionRef);

    return () => ctx.revert();
  }, [items]);

  // Positional logic strictly in percentages off the boundaries of the 100x100 box perfectly anchoring cards
  const getCardPos = (index) => {
    if (index === 0) return { left: "50%", top: "50%" };
    if (index === 1) return { left: "150%", top: "150%" };
    if (index === 2) return { left: "50%", top: "250%" };
    return { left: "50%", top: "50%" }; // fallback
  };

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-[100vh] overflow-hidden bg-transparent"
    >
      {/* Fixed Sticky Header */}
      <div className="absolute top-6 sm:top-10 left-6 sm:left-10 lg:left-14 flex flex-col gap-2 z-[100] pointer-events-none">
        <div className="flex items-center gap-3">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-white pointer-events-auto shadow-sm">
            {title}
          </h2>
        </div>
        <p className="text-xs uppercase tracking-[0.3em] text-[#93c5fd] pointer-events-auto">
          {eyebrow}
        </p>
      </div>

      {/* 
        Virtual Viewport Wrapper
        This is exactly 100% width and height of the screen. 
        We map elements precisely OUTSIDE of it using percentages, and translate it to bring them dead-center. 
      */}
      <div
        ref={wrapperRef}
        className="absolute top-0 left-0 w-full h-full will-change-transform"
      >
        {/* SVG Drawing Continuous Diagonal Lines precisely connecting percentage axes irrespective of browser math */}
        <svg
          className="absolute top-0 left-0 w-full h-full overflow-visible pointer-events-none"
          style={{ zIndex: 0 }}
        >
          {/* Card 1 to Card 2 */}
          <line
            x1="50%"
            y1="50%"
            x2="150%"
            y2="150%"
            stroke="rgba(147, 197, 253, 0.15)"
            strokeWidth="2"
            strokeDasharray="4, 4"
          />
          {/* Card 2 to Card 3 */}
          <line
            x1="150%"
            y1="150%"
            x2="50%"
            y2="250%"
            stroke="rgba(147, 197, 253, 0.15)"
            strokeWidth="2"
            strokeDasharray="4, 4"
          />
        </svg>

        {items.map((item, index) => {
          const pos = getCardPos(index);
          return (
            <div
              key={`${item.year}-${index}`}
              className="absolute w-[90vw] max-w-[500px] lg:max-w-[600px] p-6 md:p-12 rounded-3xl bg-[#ffffff0d] border border-white/10 backdrop-blur-md shadow-[0_0_40px_rgba(0,0,0,0.5)] flex flex-col gap-3 md:gap-4 text-center transform-gpu -translate-x-1/2 -translate-y-1/2 z-10 mt-12 md:mt-0"
              style={{ left: pos.left, top: pos.top }}
            >
              <span className="text-[#93c5fd] font-black text-2xl md:text-3xl tracking-wider">
                {item.year}
              </span>
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-black text-white leading-tight">
                {item.title}
              </h3>
              <p className="text-base md:text-lg text-[#93c5fd] font-semibold">
                {item.company}
              </p>
              {item.lists && (
                <ul className="text-slate-200 mt-2 md:mt-4 text-left text-sm md:text-lg">
                  {item.lists.map((list, i) => (
                    <li key={i} className="flex items-start gap-2 mb-2">
                      <span className="text-[#93c5fd]">✦</span>
                      <span className="text-left leading-relaxed">{list}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default ZigzagTimelineSection;
