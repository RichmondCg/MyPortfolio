import { useEffect, useRef } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Navigation from "./Navigation.jsx";
import Footer from "./Footer.jsx";
import { projects } from "../data/projects.js";

gsap.registerPlugin(ScrollTrigger);

function Arrow({ direction = "forward" }) {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      aria-hidden="true"
      className={direction === "back" ? "rotate-180" : ""}
    >
      <path
        d="M1 7H13M13 7L7.5 1.5M13 7L7.5 12.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ProjectDetail({ project }) {
  const pageRef = useRef(null);
  const progressRef = useRef(null);
  const heroImageRef = useRef(null);
  const introRef = useRef(null);
  const nextProject =
    projects[(projects.indexOf(project) + 1) % projects.length];
  const content = project.caseStudy;

  useEffect(() => {
    const page = pageRef.current;
    if (!page) return undefined;

    const ctx = gsap.context(() => {
      const revealItems = page.querySelectorAll("[data-project-reveal]");

      gsap.set(revealItems, { autoAlpha: 0, y: 36 });
      gsap.to(revealItems, {
        autoAlpha: 1,
        y: 0,
        duration: 0.9,
        ease: "power3.out",
        stagger: 0.08,
        delay: 0.15,
      });

      gsap.fromTo(
        heroImageRef.current,
        { scale: 1.12, yPercent: 4 },
        {
          scale: 1,
          yPercent: -4,
          ease: "none",
          scrollTrigger: {
            trigger: heroImageRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        },
      );

      gsap.fromTo(
        introRef.current,
        { y: 80 },
        {
          y: -20,
          ease: "none",
          scrollTrigger: {
            trigger: introRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
          },
        },
      );

      ScrollTrigger.create({
        trigger: page,
        start: "top top",
        end: "bottom bottom",
        onUpdate: (self) => {
          gsap.set(progressRef.current, { scaleX: self.progress });
        },
      });
    }, page);

    return () => ctx.revert();
  }, [project]);

  return (
    <div
      ref={pageRef}
      className="project-page overflow-hidden bg-white font-mono text-black"
    >
      <div
        className="project-progress fixed inset-x-0 top-0 z-[70] h-1 origin-left bg-black"
        ref={progressRef}
      />
      <Navigation />

      <main>
        <section className="mx-auto max-w-[1400px] px-5 pb-16 pt-28 sm:px-6 md:px-12 md:pb-32 md:pt-44">
          <div
            className="mb-8 flex flex-col items-start gap-4 text-[10px] uppercase tracking-[0.18em] text-neutral-500 sm:mb-10 sm:flex-row sm:items-center sm:justify-between sm:gap-6 sm:text-[11px] sm:tracking-[0.22em]"
            data-project-reveal
          >
            <Link
              to="/works"
              className="group inline-flex items-center gap-3 text-black transition-opacity hover:opacity-50"
            >
              <Arrow direction="back" />
              Back to works
            </Link>
            <span>{content.category}</span>
          </div>

          <div className="grid gap-7 sm:gap-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(260px,0.55fr)] lg:items-end lg:gap-20">
            <div>
              <p
                className="mb-4 text-[10px] uppercase tracking-[0.2em] text-neutral-400 sm:mb-5 sm:text-[11px] sm:tracking-[0.24em]"
                data-project-reveal
              >
                Selected project / {content.year}
              </p>
              <h1
                className="max-w-5xl font-display text-[clamp(2.7rem,12vw,9rem)] leading-[0.88] tracking-[-0.035em] sm:text-[clamp(3rem,8vw,9rem)] sm:leading-[0.84] sm:tracking-[-0.04em]"
                data-project-reveal
              >
                {project.title}
              </h1>
            </div>
            <p
              className="max-w-sm text-[13px] leading-[1.55] text-neutral-500 sm:text-sm sm:leading-6 lg:pb-2"
              data-project-reveal
            >
              {project.tagline}
            </p>
          </div>
        </section>

        <section className="mx-auto max-w-[1400px] px-5 sm:px-6 md:px-12">
          <div className="project-hero-image relative aspect-[4/3] overflow-hidden bg-neutral-100 sm:aspect-[16/9] md:aspect-[16/8]">
            <img
              ref={heroImageRef}
              src={project.image}
              alt={`${project.title} project preview`}
              className="h-full w-full object-cover"
              loading="eager"
            />
            <div className="absolute bottom-4 left-4 flex items-center gap-2 text-[9px] uppercase tracking-[0.16em] text-white mix-blend-difference sm:bottom-5 sm:left-5 sm:gap-3 sm:text-[10px] sm:tracking-[0.22em] md:bottom-8 md:left-8">
              <span className="h-2 w-2 rounded-full bg-current" />
              Scroll to explore
            </div>
          </div>
        </section>

        <section className="mx-auto grid max-w-[1200px] gap-12 px-5 py-20 sm:px-6 md:grid-cols-[0.6fr_1.4fr] md:gap-24 md:px-12 md:py-40">
          <div ref={introRef} className="self-start md:sticky md:top-32">
            <p className="mb-4 text-[10px] uppercase tracking-[0.2em] text-neutral-400 sm:mb-5 sm:text-[11px] sm:tracking-[0.24em]">
              The brief
            </p>
            <h2 className="max-w-xs font-secondhead text-[2rem] font-bold leading-[0.98] tracking-tight sm:text-3xl md:text-5xl md:leading-[0.95] text-black/60">
              {content.goal}
            </h2>
          </div>
          <div className="space-y-10 sm:space-y-14">
            <div className="grid grid-cols-2 gap-x-5 gap-y-6 border-y border-black/10 py-5 text-[10px] uppercase tracking-[0.14em] sm:gap-8 sm:py-6 sm:text-[11px] sm:tracking-[0.18em] md:grid-cols-3">
              <div>
                <span className="mb-2 block text-neutral-400">Role</span>
                <span>{content.role}</span>
              </div>
              <div>
                <span className="mb-2 block text-neutral-400">Timeline</span>
                <span>{content.duration}</span>
              </div>
              <div>
                <span className="mb-2 block text-neutral-400">Year</span>
                <span>{content.year}</span>
              </div>
            </div>
            <p className="max-w-2xl font-secondhead text-[clamp(1.5rem,6vw,3.1rem)] leading-[1.1] tracking-tight sm:text-[clamp(1.6rem,3vw,3.1rem)] sm:leading-[1.05]">
              {content.story}
            </p>
          </div>
        </section>

        <section className="bg-black px-5 py-20 text-white sm:px-6 md:px-12 md:py-40">
          <div className="mx-auto grid max-w-[1200px] gap-12 sm:gap-16 md:grid-cols-[0.7fr_1.3fr] md:gap-24">
            <div>
              <p className="mb-4 text-[10px] uppercase tracking-[0.2em] text-white/40 sm:mb-5 sm:text-[11px] sm:tracking-[0.24em]">
                How it came together
              </p>
              <h2 className="max-w-sm font-display text-[clamp(2.7rem,12vw,6rem)] leading-[0.88] tracking-[-0.035em] sm:text-[clamp(2.5rem,6vw,6rem)] sm:leading-[0.86] sm:tracking-[-0.04em]">
                Make it feel obvious.
              </h2>
            </div>
            <div className="divide-y divide-white/15">
              {content.approach.map((item, index) => (
                <div
                  key={item}
                  className="grid gap-4 py-6 first:pt-0 sm:gap-5 sm:py-7 md:grid-cols-[80px_1fr] md:gap-8"
                  data-project-reveal
                >
                  <span className="text-[11px] tracking-[0.2em] text-white/40">
                    0{index + 1}
                  </span>
                  <p className="max-w-xl font-secondhead text-[1.35rem] leading-[1.12] sm:text-2xl sm:leading-tight md:text-4xl">
                    {item}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto grid max-w-[1200px] gap-7 px-5 py-20 sm:gap-8 sm:px-6 md:grid-cols-[0.55fr_1.45fr] md:items-end md:gap-24 md:px-12 md:py-40">
          <p className="text-[10px] uppercase tracking-[0.2em] text-neutral-400 sm:text-[11px] sm:tracking-[0.24em]">
            The result
          </p>
          <div>
            <p
              className="font-secondhead text-[clamp(2rem,9vw,5.5rem)] font-bold leading-[0.94] tracking-[-0.03em] sm:text-[clamp(2.2rem,5vw,5.5rem)] sm:leading-[0.9]"
              data-project-reveal
            >
              {content.outcome}
            </p>
            <div
              className="mt-8 h-px w-full origin-left bg-black/15 sm:mt-12"
              data-project-reveal
            />
          </div>
        </section>

        <section className="border-t border-black/10 px-5 py-14 sm:px-6 sm:py-16 md:px-12 md:py-24">
          <div className="mx-auto flex max-w-[1200px] flex-col gap-7 sm:gap-8 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="mb-3 text-[10px] uppercase tracking-[0.2em] text-neutral-400 sm:mb-4 sm:text-[11px] sm:tracking-[0.24em]">
                Keep exploring
              </p>
              <h2 className="max-w-2xl font-display text-[clamp(2.45rem,11vw,7rem)] leading-[0.88] tracking-[-0.035em] sm:text-[clamp(2.5rem,6vw,7rem)] sm:leading-[0.85] sm:tracking-[-0.04em]">
                Next: {nextProject.title}
              </h2>
            </div>
            <Link
              to={`/works/${nextProject.id}`}
              className="group inline-flex w-fit items-center gap-4 rounded-full border border-black px-6 py-3.5 text-[10px] uppercase tracking-[0.2em] transition-colors duration-300 hover:bg-black hover:text-white sm:px-7 sm:py-4 sm:text-[11px] sm:tracking-[0.22em]"
            >
              Open project
              <span className="transition-transform duration-300 group-hover:translate-x-1">
                <Arrow />
              </span>
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

export function ProjectDetailPage() {
  const { projectId } = useParams();
  const project = projects.find((item) => item.id === projectId);

  if (!project) return <Navigate to="/works" replace />;

  return <ProjectDetail project={project} />;
}

export default ProjectDetail;
