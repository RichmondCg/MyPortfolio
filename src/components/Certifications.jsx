import { useEffect, useRef } from "react";
import gsap from "gsap";
import { Link } from "react-router-dom";
import Navigation from "./Navigation.jsx";

const CERTS = [
  {
    title: "IT Specialist - Databases Certificate",
    org: "Certiport",
    year: "2025",
    desc: "Validated foundational knowledge in database design, relational databases, data storage, database objects, and SQL queries.",
    link: "https://www.credly.com/badges/a7cb94d4-1b63-4758-b7ac-1aff7c69644b/linked_in_profile",
  },

  {
    title: "Google Project Management Certificate",
    org: "Coursera / Google",
    year: "2025",
    desc: "Covered project planning, Agile and Scrum methodologies, risk management, stakeholder communication, budgeting, and project execution.",
    link: "https://www.coursera.org/account/accomplishments/specialization/2VF2SE02KCEG",
  },

  {
    title: "Associate Data Engineer Certificate",
    org: "DataCamp",
    year: "2025",
    desc: "Validated skills in data engineering fundamentals, including data management, SQL, data pipelines, databases, and processing data for analysis.",
    link: "https://www.datacamp.com/certificate/DEA0015417498162",
  },

  {
    title: "Introduction to Cybersecurity Tools & Cyberattacks",
    org: "Coursera / IBM",
    year: "2025",
    desc: "Covered cybersecurity fundamentals, common cyberattacks, threat actors, security concepts, cryptography, network security, and cybersecurity tools.",
    link: "https://www.coursera.org/account/accomplishments/verify/FW7NTIOOTX67",
  },
];

const AWARDS = [
  {
    title: "Academic Distinction Awardee",
    org: "Nueva Ecija University of Science and Technology",
    year: "2026",
    desc: "Recognized for academic excellence and strong academic performance throughout the program.",
  },

  {
    title: "CICT Techno Day Figma Competition - 4th Place",
    org: "NEUST College of Information and Communications Technology",
    year: "2026",
    desc: "Placed 4th in the Figma Design Competition during CICT Techno Day, showcasing UI/UX design and prototyping skills.",
  },

  {
    title: "CICT Techno Day C++ Competition - 3rd Place",
    org: "NEUST College of Information and Communications Technology",
    year: "2023",
    desc: "Placed 3rd in the C++ Programming Competition during CICT Techno Day, demonstrating programming and problem-solving skills.",
  },
];

function Certifications() {
  const curtainRef = useRef(null);
  const headRef = useRef(null);
  const introRef = useRef(null);
  const listRef = useRef(null);
  const awardsRef = useRef(null);
  const footRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      tl.set([headRef.current, introRef.current], { autoAlpha: 0, y: 30 })
        .set([listRef.current, awardsRef.current, footRef.current], {
          autoAlpha: 0,
          y: 40,
        })
        .to(
          curtainRef.current,
          { yPercent: -100, duration: 0.7, ease: "power4.inOut" },
          0,
        )
        .to(
          [headRef.current, introRef.current],
          { autoAlpha: 1, y: 0, duration: 0.9, stagger: 0.1 },
          "-=0.25",
        )
        .to(
          listRef.current,
          { autoAlpha: 1, y: 0, duration: 0.8, ease: "power3.out" },
          "-=0.4",
        )
        .to(
          awardsRef.current,
          { autoAlpha: 1, y: 0, duration: 0.8, ease: "power3.out" },
          "-=0.3",
        )
        .to(footRef.current, { autoAlpha: 1, y: 0, duration: 0.6 }, "-=0.3");
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="relative min-h-screen w-full bg-white font-mono text-black select-none">
      <div
        ref={curtainRef}
        className="absolute inset-0 z-50 bg-white will-change-transform"
      />

      <Navigation />

      <main className="mx-auto max-w-5xl px-6 pt-32 md:px-12 md:pt-44">
        <p className="mb-4 text-[11px] tracking-[0.32em] uppercase opacity-60">
          03 · Certifications
        </p>
        <h1
          ref={headRef}
          className="font-display text-[clamp(2.5rem,8vw,7rem)] leading-none tracking-tight"
        >
          Certifications
        </h1>

        <div ref={introRef} className="mt-8 max-w-2xl">
          <p className="text-sm leading-relaxed md:text-base">
            Credentials earned along the way — proof of the fundamentals, and
            the drive to keep learning.
          </p>
        </div>

        <div ref={listRef} className="mt-16 space-y-4">
          {CERTS.map((cert) => (
            <div
              key={cert.title}
              className="border border-black/10 px-5 py-6 transition-colors duration-300 hover:border-black"
            >
              <div className="flex items-center justify-between gap-4">
                <h3 className="font-display text-lg md:text-xl">
                  {cert.title}
                </h3>
                <span className="shrink-0 text-xs tracking-[0.2em] uppercase text-black/40">
                  {cert.year}
                </span>
              </div>
              <p className="mt-1 text-xs tracking-[0.2em] uppercase text-black/50">
                {cert.org}
              </p>
              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-black/80">
                {cert.desc}
              </p>
              {cert.link && (
                <a
                  href={cert.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group mt-5 inline-flex items-center gap-3 rounded-full border border-black px-6 py-3 text-[11px] tracking-[0.25em] uppercase transition-colors duration-300 hover:bg-black hover:text-white"
                >
                  Show credential
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 12 12"
                    fill="none"
                    aria-hidden="true"
                    className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                  >
                    <path
                      d="M1 11L11 1M11 1H3M11 1V9"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    />
                  </svg>
                </a>
              )}
            </div>
          ))}
        </div>

        {/* Awards */}
        <div ref={awardsRef} className="mt-24">
          <p className="mb-6 text-[11px] tracking-[0.32em] uppercase opacity-60">
            04 · Awards
          </p>
          {AWARDS.length > 0 ? (
            <div className="space-y-4">
              {AWARDS.map((award) => (
                <div
                  key={award.title}
                  className="border border-black/10 px-5 py-6 transition-colors duration-300 hover:border-black"
                >
                  <div className="flex items-center justify-between gap-4">
                    <h3 className="font-display text-lg md:text-xl">
                      {award.title}
                    </h3>
                    <span className="shrink-0 text-xs tracking-[0.2em] uppercase text-black/40">
                      {award.year}
                    </span>
                  </div>
                  <p className="mt-1 text-xs tracking-[0.2em] uppercase text-black/50">
                    {award.org}
                  </p>
                  <p className="mt-3 max-w-2xl text-sm leading-relaxed text-black/80">
                    {award.desc}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <div className="border border-dashed border-black/20 px-5 py-16 text-center">
              <p className="text-sm text-black/50">Awards coming soon.</p>
            </div>
          )}
        </div>

        <div ref={footRef} className="my-10 border-t border-black/10 py-10">
          <Link
            to="/me"
            className="group inline-flex items-center gap-4 rounded-full border border-black px-8 py-4 text-[11px] tracking-[0.25em] uppercase transition-colors duration-300 hover:bg-black hover:text-white"
          >
            Back to about
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              aria-hidden="true"
              className="transition-transform duration-300 group-hover:-translate-x-1 group-hover:translate-y-1"
            >
              <path
                d="M11 1L1 11M1 11H9M1 11V3"
                stroke="currentColor"
                strokeWidth="1.5"
              />
            </svg>
          </Link>
        </div>
      </main>
    </div>
  );
}

export default Certifications;
