import React, { useEffect, useRef, useState } from "react";
import { ArrowRight } from "lucide-react";
import paps from "../../assets/images/projects/website/paps.webp";
import nueva from "../../assets/images/projects//website/nueva.webp";
import clinic from "../../assets/images/projects//website/clinic.webp";
// import pos from "../assets/images/projects//website/pos.png";
import smartfit from "../../assets/images/projects/website/smartfit.webp";
function About() {
  const sectionRef = useRef(null);
  const [animKey, setAnimKey] = useState(0);

  useEffect(() => {
    const sectionEl = sectionRef.current;
    if (!sectionEl) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setAnimKey((prev) => prev + 1);
        }
      },
      { threshold: 0.4 },
    );

    observer.observe(sectionEl);
    return () => observer.disconnect();
  }, []);

  const websites = [
    {
      name: paps,
    },
    {
      name: nueva,
    },
    {
      name: clinic,
    },
    {
      name: smartfit,
    },
  ];
  return (
    <section
      id="about"
      ref={sectionRef}
      className="mx-4 my-2 sm:my-10 sm:mx-10 lg:m-20"
    >
      <div
        key={animKey}
        className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 sm:gap-8 lg:gap-40"
      >
        <div className="space-y-4 animate-slideInLeft">
          <h1 className="text-4xl sm:text-6xl lg:text-8xl font-black">
            About me.
          </h1>
          <p className="text-base sm:text-lg lg:text-xl opacity-80">
            Blending frontend, backend, WordPress, UI/UX, and IoT. I create
            solutions that are clean, scalable, and built to perform.
          </p>
        </div>
        <div
          className="space-y-4 animate-slideInUp"
          style={{ animationDelay: "0.1s" }}
        >
          <p className="text-base sm:text-lg lg:text-xl font-bold opacity-80">
            I’m a web developer who builds purpose-driven websites and systems.
          </p>
          <p className="text-base sm:text-lg lg:text-xl font-bold">
            LET’S BUILD SOMETHING WITH IMPACT TOGETHER
          </p>
          <a href="#cta">
            <button className="px-2 py-2 bg-[#1B263B] cursor-pointer rounded-full flex items-center gap-2">
              <p className="text-white font-medium text-sm lg:text-base">
                Send a message
              </p>

              <div className="bg-white p-2 rounded-full flex items-center justify-center">
                <ArrowRight size={18} className="text-[#1B263B]" />
              </div>
            </button>
          </a>
        </div>
      </div>

      <div
        className="mt-6 sm:mt-10 animate-fadeIn"
        style={{ animationDelay: "0.2s" }}
      >
        <a href="/projects">
          <p className="underline font-bold mb-4 hover:opacity-80">View all</p>
        </a>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 h-100">
          {websites.map((website) => {
            return (
              <div className="rounded-2xl overflow-hidden">
                <img
                  src={website.name}
                  alt="paps website"
                  className="object-top"
                />
              </div>
            );
          })}
        </div>
      </div>
      <div className="h-1 w-full bg-gray-800 mt-6 sm:mt-16 lg:mt-20"></div>
    </section>
  );
}

export default About;
