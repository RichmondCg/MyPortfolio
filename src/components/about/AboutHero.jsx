import React from "react";

function AboutHero() {
  return (
    <div className="relative z-10 w-full px-6 pt-16 sm:px-10 lg:px-14">
      <div className="max-w-3xl animate-fadeIn">
        <p className="text-4xl font-black uppercase text-white sm:text-6xl lg:text-8xl">
          About me
        </p>
        <p className="mt-6 text-lg text-white/80">
          I am a web developer focused on turning complex ideas into clean,
          scalable, and high-performing digital products.
        </p>
      </div>
    </div>
  );
}

export default AboutHero;
