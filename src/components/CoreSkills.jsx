import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const SKILLS = [
  {
    number: "01",
    title: "Product thinking",
  },
  {
    number: "02",
    title: "UI / UX design",
  },
  {
    number: "03",
    title: "Front-end development",
  },
  {
    number: "04",
    title: "Full-stack systems",
  },
  {
    number: "05",
    title: "Automation & IoT",
  },
];

export default function CoreSkills() {
  const sectionRef = useRef(null);
  const stageRef = useRef(null);
  const leftIntroRef = useRef(null);
  const rightIntroRef = useRef(null);
  const rowsRef = useRef(null);
  const rowRefs = useRef([]);
  const [activeSkill, setActiveSkill] = useState(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const isMobile = window.matchMedia("(max-width: 767px)").matches;
      const rowHeight = () =>
        rowRefs.current[0]?.getBoundingClientRect().height || 112;

      gsap.set(rowsRef.current, {
        y: () => -(rowHeight() / 2),
      });

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: stageRef.current,
          start: "top top",
          end: `+=${SKILLS.length * 420}`,
          scrub: true,
          pin: true,
          anticipatePin: 1,
          onUpdate: (self) => {
            setActiveSkill(
              Math.min(
                SKILLS.length - 1,
                Math.round(self.progress * (SKILLS.length - 1)),
              ),
            );
          },
        },
      });

      if (!isMobile) {
        timeline.to([leftIntroRef.current, rightIntroRef.current], {
          y: () => Math.max(0, window.innerHeight * 0.25),
          ease: "none",
        });
      }

      timeline.to(
        rowsRef.current,
        {
          y: () => -(rowHeight() / 2) - rowHeight() * (SKILLS.length - 1),
          ease: "none",
        },
        0,
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="skills"
      className="bg-black py-24 text-white md:py-26"
    >
      <h2 className="font-display text-[clamp(2.5rem,7vw,8rem)] leading-[0.82] tracking-tight text-center">
        Core Skills
      </h2>

      <div
        ref={stageRef}
        className="mx-auto mt-20 grid min-h-screen max-w-full grid-cols-1 items-start gap-12 px-6 md:grid-cols-[1fr_1.4fr_1fr] md:gap-24 md:px-12"
      >
        <div ref={leftIntroRef} className="max-w-sm pt-2 md:pt-8">
          <p className="text-sm leading-relaxed text-white/55 md:text-base">
            A solution-first approach to building digital products that feel
            clear before they feel clever.
          </p>
        </div>

        <div className="relative h-[22rem] self-center overflow-hidden md:h-[34rem]">
          <div className="absolute inset-x-0 top-1/2">
            <div ref={rowsRef}>
              {SKILLS.map((skill, index) => (
                <article
                  key={skill.number}
                  ref={(element) => {
                    rowRefs.current[index] = element;
                  }}
                  className={`core-skill-row flex h-20 items-center px-0 transition-colors duration-500 md:h-32 md:px-8 ${activeSkill === index ? "text-white" : "text-white/20"}`}
                >
                  <span className="mr-4 font-mono text-[10px] text-white/30 md:mr-8 md:text-[11px]">
                    {skill.number}
                  </span>
                  <h3 className="font-secondhead text-xl font-bold sm:text-2xl md:text-5xl">
                    {skill.title}
                  </h3>
                </article>
              ))}
            </div>
          </div>
        </div>

        <div ref={rightIntroRef} className="max-w-sm pt-2 md:pt-8">
          <p className="text-sm leading-relaxed text-white/55 md:text-base">
            System designed and engineered not just for aesthetics but blending
            with modern approach and technologies.
          </p>
        </div>
      </div>
    </section>
  );
}
