import React from "react";

function ProjectsCaseStudies({ caseStudies }) {
  return (
    <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {caseStudies.map((study) => (
        <article
          key={study.title}
          className="group overflow-hidden border border-white/15 bg-white/5 backdrop-blur animate-slideInUp"
        >
          <div className="relative h-60 overflow-hidden">
            <img
              src={study.image}
              alt={study.title}
              className="h-full w-full object-cover object-top transition duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0D1B2A]/80 via-transparent to-transparent" />
          </div>
          <div className="space-y-3 px-6 pb-7 pt-6">
            <p className="text-xs uppercase tracking-[0.3em] text-white/60">
              {study.type}
            </p>
            <h2 className="text-2xl font-bold">{study.title}</h2>
            <p className="text-sm text-white/70">{study.summary}</p>
          </div>
        </article>
      ))}
    </div>
  );
}

export default ProjectsCaseStudies;
