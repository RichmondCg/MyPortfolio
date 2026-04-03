import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const STEPS = [
  {
    number: 1,
    title: "Understand the problem first",
    description:
      "I go beyond surface-level requests to uncover the actual challenges, goals, and needs behind every project.",
  },
  {
    number: 2,
    title: "Map the right strategy",
    description:
      "Before writing code, I define a clear direction with technical choices that match your goals and timeline.",
  },
  {
    number: 3,
    title: "Design and build with focus",
    description:
      "I craft interfaces and features that are clean, responsive, and built for real users, not just for presentation.",
  },
  {
    number: 4,
    title: "Refine, test, and deliver",
    description:
      "I polish details, validate quality, and deliver a reliable product with room to scale and iterate.",
  },
];

function Approach() {
  const sectionRef = useRef(null);
  const wheelRef = useRef(null);
  const contentRef = useRef(null);
  const activeStepRef = useRef(0);
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    const section = sectionRef.current;
    const wheel = wheelRef.current;
    const content = contentRef.current;
    const wheelNumbers = wheel?.querySelectorAll("[data-wheel-number]");

    if (!section || !wheel || !content) return;

    const trigger = ScrollTrigger.create({
      trigger: section,
      start: "top top",
      end: "+=220%",
      pin: true,
      scrub: 1,
      onUpdate: (self) => {
        const progress = self.progress;
        const stepIndex = Math.min(
          STEPS.length - 1,
          Math.floor(progress * STEPS.length),
        );

        gsap.set(wheel, {
          rotation: -progress * 270,
        });

        if (wheelNumbers?.length) {
          gsap.set(wheelNumbers, {
            rotation: progress * 270,
            transformOrigin: "50% 50%",
          });
        }

        if (stepIndex !== activeStepRef.current) {
          activeStepRef.current = stepIndex;
          setCurrentStep(stepIndex);

          gsap.fromTo(
            content,
            { y: 36, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.45, ease: "power3.out" },
          );
        }
      },
    });

    gsap.set(wheel, { rotation: 0 });
    if (wheelNumbers?.length) {
      gsap.set(wheelNumbers, { rotation: 0, transformOrigin: "50% 50%" });
    }

    return () => {
      trigger.kill();
    };
  }, []);

  return (
    <section className="overflow-x-hidden">
      <div className="px-5 sm:px-10 lg:px-20">
        <h1 className="text-center text-4xl sm:text-6xl lg:text-8xl font-black mb-3 sm:mb-4">
          My approach.
        </h1>
        <p className="text-base sm:text-lg lg:text-xl text-center mb-6">
          I combine logic and creativity to deliver results
        </p>
      </div>
      <div ref={sectionRef} className="relative h-[100svh] w-full">
        <div className="relative w-full h-full overflow-hidden">
          {/* Rotating wheel with all numbers always visible */}
          <div className="absolute right-[-6rem] sm:right-[-7rem] lg:right-[-5rem] top-1/2 -translate-y-1/2 z-20 pointer-events-none">
            <div
              ref={wheelRef}
              className="relative w-[220px] h-[220px] sm:w-[320px] sm:h-[320px] lg:w-[460px] lg:h-[460px] rounded-full border-2 border-[#cfcfcf]"
            >
              <div className="absolute inset-[18%] rounded-full border border-[#d9d9d9]" />
              <span className="absolute left-0 top-1/2 -translate-x-1/2 -translate-y-1/2">
                <span
                  data-wheel-number
                  className={`inline-block text-[30px] sm:text-[52px] lg:text-[76px] font-black leading-none transition-all duration-300 ${
                    currentStep === 0
                      ? "text-[#071a33] scale-110"
                      : "text-[#c6c6c6]"
                  }`}
                >
                  01
                </span>
              </span>
              <span className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2">
                <span
                  data-wheel-number
                  className={`inline-block text-[30px] sm:text-[52px] lg:text-[76px] font-black leading-none transition-all duration-300 ${
                    currentStep === 1
                      ? "text-[#071a33] scale-110"
                      : "text-[#c6c6c6]"
                  }`}
                >
                  02
                </span>
              </span>
              <span className="absolute right-0 top-1/2 translate-x-1/2 -translate-y-1/2">
                <span
                  data-wheel-number
                  className={`inline-block text-[30px] sm:text-[52px] lg:text-[76px] font-black leading-none transition-all duration-300 ${
                    currentStep === 2
                      ? "text-[#071a33] scale-110"
                      : "text-[#c6c6c6]"
                  }`}
                >
                  03
                </span>
              </span>
              <span className="absolute left-1/2 bottom-0 -translate-x-1/2 translate-y-1/2">
                <span
                  data-wheel-number
                  className={`inline-block text-[30px] sm:text-[52px] lg:text-[76px] font-black leading-none transition-all duration-300 ${
                    currentStep === 3
                      ? "text-[#071a33] scale-110"
                      : "text-[#c6c6c6]"
                  }`}
                >
                  04
                </span>
              </span>
            </div>
          </div>

          {/* Content panel */}
          <div className="relative z-30 h-full w-full flex items-center px-5 sm:px-10 lg:px-20">
            <div
              ref={contentRef}
              className="w-full pr-[100px] sm:max-w-[480px] lg:max-w-[660px] sm:pr-0 text-[#111111]"
            >
              <h2 className="text-2xl sm:text-4xl lg:text-[52px] font-black leading-tight mb-3 sm:mb-6">
                {STEPS[currentStep].title}
              </h2>
              <p className="text-base sm:text-xl lg:text-[42px] leading-[1.2] text-[#111111]/80 max-w-[760px]">
                {STEPS[currentStep].description}
              </p>

              <div className="mt-8 flex items-center gap-2 sm:gap-3">
                {STEPS.map((step, index) => (
                  <span
                    key={step.number}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      index === currentStep
                        ? "w-8 bg-[#071a33]"
                        : "w-3 bg-[#bdbdbd]"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Approach;
