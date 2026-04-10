import React, { useEffect, useLayoutEffect, useMemo, useRef } from "react";
import { Link, useParams } from "react-router-dom";
import Navigation from "../components/navigation";
import Footer from "../components/footer";
import { projects } from "../data/projects";
import Cta from "../components/cta";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function SingleProject() {
  const { slug } = useParams();
  const project = projects.find((item) => item.slug === slug);
  const mainRef = useRef(null);

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      const sections = gsap.utils.toArray(".recede");

      sections.forEach((section) => {
        gsap.fromTo(
          section,
          { scale: 1 },
          {
            scale: 0.84,
            ease: "none",
            scrollTrigger: {
              trigger: section,
              start: "top top",
              end: "bottom top",
              scrub: true,
              invalidateOnRefresh: true,
            },
          },
        );
      });
    }, mainRef);

    return () => ctx.revert();
  }, []);

  if (!project) {
    return (
      <>
        <main className="min-h-screen">
          <Navigation />
          <section className="flex flex-col items-center py-24 text-center">
            <p className="text-xs uppercase tracking-[0.3em] text-white/60">
              Project not found
            </p>
            <h1 className="mt-4 text-4xl font-black sm:text-6xl">
              This case study does not exist
            </h1>
            <p className="mt-4 text-sm text-white/70">
              Try heading back to the projects list to explore other work.
            </p>
            <Link
              to="/projects"
              className="mt-8 rounded-full border border-white/30 px-6 py-3 text-xs font-semibold uppercase tracking-[0.25em] transition duration-300 hover:border-white hover:text-white"
            >
              View all projects
            </Link>
          </section>
        </main>
        <Footer />
      </>
    );
  }

  const gallery = project.gallery?.length ? project.gallery : [project.image];
  const tools = project.tools ?? [];
  const approach = project.approach ?? [];
  const moreProjects = useMemo(() => {
    const currentIndex = projects.findIndex((item) => item.slug === slug);
    if (currentIndex === -1) return projects.slice(0, 3);

    const nextItems = [];
    for (let offset = 1; offset <= 3; offset += 1) {
      const nextIndex = (currentIndex + offset) % projects.length;
      nextItems.push(projects[nextIndex]);
    }

    return nextItems;
  }, [slug]);

  useEffect(() => {
    moreProjects.forEach((item) => {
      if (!item.image) return;
      const img = new Image();
      img.src = item.image;
    });
  }, [moreProjects]);

  return (
    <>
      <main ref={mainRef} className="min-h-screen text-slate-900">
        <section className="recede relative min-h-screen overflow-hidden bg-gradient-to-tr from-[#2D5D90] to-[#0D1B2A] pb-16 text-white origin-top">
          <Navigation />
          <div className="relative z-10 mx-auto w-full max-w-6xl px-6 pt-16 sm:px-10 lg:px-14">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-white/60">
                  {project.type}
                </p>
                <h1 className="mt-4 text-4xl font-black leading-tight sm:text-6xl lg:text-7xl">
                  {project.title}
                </h1>
                <p className="mt-5 max-w-3xl text-sm text-white/80 sm:text-base">
                  {project.summary}
                </p>
              </div>
              {project.website && (
                <a
                  href={project.website}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.25em] text-white/80 transition duration-300 hover:text-white lg:mt-2"
                >
                  Visit website
                  <span aria-hidden="true">↗</span>
                </a>
              )}
            </div>
            <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
              {tools.length > 0 && (
                <div className="space-y-3">
                  <h3 className="text-lg font-semibold">Tools</h3>
                  <ul className="flex flex-wrap gap-2 text-xs text-white/80">
                    {tools.map((tool) => (
                      <li
                        key={tool}
                        className="rounded-full border border-white/20 px-3 py-1"
                      >
                        {tool}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
            <div className="mt-8 grid gap-8 lg:grid-cols-2">
              <div className="space-y-3">
                <h3 className="text-lg font-semibold">Goals</h3>
                <ul className="space-y-2 text-sm text-white/75">
                  {project.goals.map((goal) => (
                    <li key={goal} className="flex gap-3">
                      <span className="mt-2 h-1.5 w-1.5 rounded-full bg-white/60" />
                      <span>{goal}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="space-y-3">
                <h3 className="text-lg font-semibold">Deliverables</h3>
                <ul className="space-y-2 text-sm text-white/75">
                  {project.deliverables.map((deliverable) => (
                    <li key={deliverable} className="flex gap-3">
                      <span className="mt-2 h-1.5 w-1.5 rounded-full bg-white/60" />
                      <span>{deliverable}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            {project.involvement && (
              <div className="mt-8 space-y-3">
                <h3 className="text-lg font-semibold">My involvement</h3>
                <p className="text-sm text-white/75">{project.involvement}</p>
              </div>
            )}
          </div>
        </section>

        <section className="relative bg-white text-slate-900">
          <div className="relative z-10 mx-auto w-full max-w-6xl space-y-10 px-6 sm:px-10 lg:px-14">
            <img
              src={project.image}
              alt={`${project.title} screenshot`}
              className="w-full object-cover object-top"
            />
            <div className="space-y-4 text-lg text-slate-700 lg:text-3xl py-2 lg:py-8">
              {project.story.map((paragraph, index) => (
                <p key={`${project.slug}-story-${index}`}>{paragraph}</p>
              ))}
            </div>
            <div className="grid gap-4 lg:gap-8 sm:grid-cols-2">
              {gallery.map((image, index) => (
                <div
                  key={`${project.slug}-gallery-${index}`}
                  className="overflow-hidden border border-slate-200 bg-white"
                >
                  <img
                    src={image}
                    alt={`${project.title} gallery ${index + 1}`}
                    loading="lazy"
                    decoding="async"
                    className="w-full object-contain"
                  />
                </div>
              ))}
            </div>
            {approach.length > 0 && (
              <div className="space-y-4 text-lg text-slate-700 lg:text-3xl py-2 lg:py-4">
                {approach.map((paragraph, index) => (
                  <p key={`${project.slug}-approach-${index}`}>{paragraph}</p>
                ))}
              </div>
            )}
          </div>
        </section>

        <section className="relative pb-16 text-slate-900 mt-20">
          <div className="relative z-10 mx-auto w-full max-w-6xl px-6 sm:px-10 lg:px-14">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <h2 className="text-2xl lg:text-5xl font-bold text-slate-900">
                More projects
              </h2>
              <Link
                to="/projects"
                className="text-xs lg:text-lg font-semibold uppercase tracking-[0.25em] text-slate-500 transition duration-300 hover:text-slate-900"
              >
                View all projects
              </Link>
            </div>
            <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {moreProjects.map((item) => (
                <Link
                  key={item.slug}
                  to={`/projects/${item.slug}`}
                  className="group overflow-hidden border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1"
                >
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.title}
                      loading="lazy"
                      decoding="async"
                      className="h-full w-full object-cover object-top transition duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0D1B2A]/80 via-transparent to-transparent" />
                  </div>
                  <div className="space-y-2 px-5 pb-6 pt-5">
                    <p className="text-sm uppercase tracking-[0.3em] text-slate-500">
                      {item.type}
                    </p>
                    <h3 className="text-2xl font-bold text-slate-900">
                      {item.title}
                    </h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Cta />
      <Footer />
    </>
  );
}

export default SingleProject;
