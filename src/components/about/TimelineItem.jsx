import React, { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function TimelineItem({ item, index }) {
  const ref = useRef(null);
  const isLeft = index % 2 === 0;

  useLayoutEffect(() => {
    const el = ref.current;

    gsap.fromTo(
      el,
      { opacity: 0, y: 80 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: el,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      },
    );

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.trigger === el) trigger.kill();
      });
    };
  }, []);

  return (
    <div
      ref={ref}
      className="relative flex items-center justify-between w-full opacity-0"
    >
      <div className="hidden w-5/12 text-right md:block">
        {isLeft && (
          <div className="space-y-3 pr-8">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#93c5fd]">
              {item.year}
            </p>
            <h3 className="text-2xl font-bold text-white shadow-sm">
              {item.title}
            </h3>
            {item.description && (
              <p className="leading-relaxed text-white/75">
                {item.description}
              </p>
            )}
            {item.lists && item.lists.length > 0 && (
              <ul className="flex flex-col gap-2 text-white/75 md:items-end mt-2">
                {item.lists.map((listItem, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-3 md:flex-row-reverse md:text-right text-left"
                  >
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#93c5fd]/60" />
                    <span className="leading-relaxed">{listItem}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </div>

      <div className="absolute left-[20px] top-0 z-10 mt-[6px] -translate-x-1/2 flex items-center justify-center md:left-1/2 md:top-1/2 md:mt-0 md:-translate-y-1/2">
        <div className="h-5 w-5 rounded-full border-[4px] border-[#0D1B2A] bg-[#93c5fd] shadow-[0_0_15px_rgba(147,197,253,0.4)] transition-transform duration-500 hover:scale-125 hover:shadow-[0_0_20px_rgba(147,197,253,0.8)]" />
      </div>

      <div className="w-full pl-[60px] md:w-5/12 md:pl-0 md:text-left">
        <div className={`space-y-3 ${isLeft ? "md:hidden" : "pl-0 md:pl-8"}`}>
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#93c5fd]">
            {item.year}
          </p>
          <h3 className="text-2xl font-bold text-white shadow-sm">
            {item.title}
          </h3>
          {item.description && (
            <p className="leading-relaxed text-white/75">{item.description}</p>
          )}
          {item.lists && item.lists.length > 0 && (
            <ul className="flex flex-col gap-2 text-white/75 items-start mt-2">
              {item.lists.map((listItem, i) => (
                <li key={i} className="flex items-start gap-3 text-left">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#93c5fd]/60" />
                  <span className="leading-relaxed">{listItem}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

export default TimelineItem;
