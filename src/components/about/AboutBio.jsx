import React from "react";

function AboutBio({ highlights }) {
  return (
    <section className="relative pb-20">
      <div className="relative z-10 w-full px-6 sm:px-10 lg:px-14">
        <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-6">
            <h2 className="text-3xl font-black sm:text-4xl">Biography</h2>
            <p className="text-lg text-white/75">
              I blend frontend craftsmanship with system-level thinking to
              create products that are both beautiful and reliable. My work
              spans from polished marketing sites to full-stack platforms and
              IoT experiences that connect people, data, and devices.
            </p>
            <p className="text-lg text-white/75">
              I care about clarity, performance, and usability. Every build
              starts with understanding the problem and ends with a product
              ready to scale.
            </p>
          </div>

          <div className="rounded-3xl border border-white/15 bg-white/5 px-6 py-8 backdrop-blur">
            <h3 className="text-xl font-bold">What I focus on</h3>
            <ul className="mt-6 space-y-4 text-white/75">
              {highlights.map((item, index) => (
                <li key={index} className="flex items-start gap-4">
                  <div className="mt-0.5 shrink-0 rounded-xl border border-white/10 bg-white/5 p-2">
                    {item.icon}
                  </div>
                  <span className="leading-relaxed">{item.text}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutBio;
