import React, { useEffect, useRef, useState } from "react";
import image from "../../assets/hero.webp";
import { heroCards } from "../../data/landingHero";
import Navigation from "../navigation";

function Hero() {
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
      { threshold: 0.55 },
    );

    observer.observe(sectionEl);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen bg-gradient-to-tr from-[#2D5D90] to-[#0D1B2A] overflow-hidden"
    >
      <Navigation />

      {/* Hero Image locked to screen bottom */}
      <div className="absolute inset-x-0 bottom-0 z-20 flex justify-center pointer-events-none animate-fadeIn">
        <img
          src={image}
          alt="hero"
          className="h-[68vh] sm:h-[78vh] md:h-[88vh] lg:h-[100vh] w-auto object-contain drop-shadow-2xl"
        />
      </div>

      {/* Main Container */}
      <div
        key={animKey}
        className="relative z-30 h-screen flex flex-col px-4 sm:px-8 lg:px-12 pb-6 sm:pb-12"
      >
        {/* Middle Section */}
        <div className="relative flex-1 flex items-start lg:items-center pt-12 lg:pt-0 px-0 sm:px-4 lg:px-8">
          {/* Background Big Text */}
          <div className="absolute left-0 z-10 flex flex-col leading-[0.9] pointer-events-none text-[#E0E1DD] animate-slideInLeft">
            <div className="flex items-center justify-between">
              <h1 className="uppercase -z-10 text-white text-[56px] sm:text-[88px] md:text-[140px] lg:text-[200px] xl:text-[240px] font-black tracking-tighter">
                WEB
              </h1>
              {/* Tagline */}
              <div
                className="hidden sm:block absolute top-20 sm:top-24 right-1 z-40 text-right animate-slideInUp"
                style={{ animationDelay: "0.2s" }}
              >
                <h2 className="text-white text-sm sm:text-lg lg:text-2xl font-black tracking-wide sm:tracking-widest">
                  I don't just build
                </h2>
                <h2 className="text-white text-sm sm:text-lg lg:text-2xl font-light tracking-wide sm:tracking-widest">
                  I create with intention.
                </h2>
              </div>
            </div>
            <h1 className="uppercase text-white text-[56px] sm:text-[88px] md:text-[140px] lg:text-[200px] xl:text-[240px] font-black tracking-tighter">
              DEVELOPER
            </h1>
            <div
              className="mt-3 sm:hidden text-left animate-slideInUp"
              style={{ animationDelay: "0.2s" }}
            >
              <h2 className="text-white text-sm font-black tracking-wide">
                I don't just build
              </h2>
              <h2 className="text-white text-sm font-light tracking-wide">
                I create with intention.
              </h2>
            </div>
          </div>
        </div>

        {/* Bottom Cards */}
        <div className="mt-auto grid grid-cols-2 sm:grid-cols-3 lg:flex lg:justify-between gap-x-6 gap-y-4 sm:gap-8 lg:gap-12 px-1 sm:px-4 lg:px-6 z-50">
          {heroCards.map((card, index) => (
            <div
              key={index}
              className={`flex flex-col cursor-pointer group transition-all duration-300 animate-slideInUp`}
              style={{ animationDelay: `${0.6 + index * 0.1}s` }}
            >
              <div className="text-white text-lg sm:text-xl lg:text-2xl font-bold mb-1 sm:mb-2 group-hover:scale-110 transition-transform">
                #{card.number}
              </div>
              <p className="text-white text-xs sm:text-sm lg:text-base font-medium leading-tight group-hover:scale-110 max-w-[130px] sm:max-w-[150px] lg:max-w-none">
                {card.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Hero;
