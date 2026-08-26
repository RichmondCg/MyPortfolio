import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { homeProjects } from "../data/projects.js";
gsap.registerPlugin(ScrollTrigger);

export function WorkCard({ project, index, cursorRef, isHoverDevice }) {
  const cardRef = useRef(null);
  const imgWrapRef = useRef(null);
  const imgRef = useRef(null);
  const titleRef = useRef(null);
  const taglineRef = useRef(null);
  const linkRef = useRef(null);

  useEffect(() => {
    const card = cardRef.current;
    const imgWrap = imgWrapRef.current;
    const img = imgRef.current;
    const title = titleRef.current;
    const tagline = taglineRef.current;
    const link = linkRef.current;

    if (!card || !imgWrap || !img || !title || !tagline || !link) return;

    const cursor = cursorRef.current;

    const ctx = gsap.context(() => {
      // Initial state - title/tagline hidden for reveal; image always visible
      gsap.set([title, tagline], { autoAlpha: 0, y: 60 });

      if (project.bottomToMiddle) {
        ScrollTrigger.create({
          trigger: card,
          start: "top bottom",
          end: "bottom center",
          scrub: true,
          onUpdate: (self) => {
            const yPercent = 30 - self.progress * 30;
            gsap.set(card, { yPercent });
          },
        });

        ScrollTrigger.create({
          trigger: card,
          start: "top 80%",
          once: true,
          invalidateOnRefresh: true,
          onEnter: () => {
            gsap.to(title, {
              autoAlpha: 1,
              y: 0,
              duration: 1,
              ease: "power3.out",
              delay: 0.15,
            });
            gsap.to(tagline, {
              autoAlpha: 1,
              y: 0,
              duration: 1,
              ease: "power3.out",
              delay: 0.3,
            });
          },
        });

        // Image parallax inside card (subtle depth)
        ScrollTrigger.create({
          trigger: imgWrap,
          start: "top bottom",
          end: "bottom top",
          scrub: 0.6,
          onUpdate: (self) => {
            gsap.set(img, { y: 0 });
          },
        });
      } else {
        // OTHER CARDS: Standard reveal + image parallax
        ScrollTrigger.create({
          trigger: card,
          start: "top 88%",
          once: true,
          invalidateOnRefresh: true,
          onEnter: () => {
            gsap.to(title, {
              autoAlpha: 1,
              y: 0,
              duration: 1,
              ease: "power3.out",
              delay: 0.15,
            });
            gsap.to(tagline, {
              autoAlpha: 1,
              y: 0,
              duration: 1,
              ease: "power3.out",
              delay: 0.3,
            });
          },
        });

        ScrollTrigger.create({
          trigger: imgWrap,
          start: "top bottom",
          end: "bottom top",
          scrub: 0.6,
          onUpdate: (self) => {
            gsap.set(img, { y: 0 });
          },
        });
      }

      // Refresh ScrollTrigger after images load
      const imgEl = img;
      if (imgEl.complete && imgEl.naturalWidth > 0) {
        ScrollTrigger.refresh();
      } else {
        imgEl.addEventListener("load", () => ScrollTrigger.refresh(), {
          once: true,
        });
      }
    }, card);

    let mouseX = -100;
    let mouseY = -100;
    let cursorX = -100;
    let cursorY = -100;
    let rafId = null;
    let isHovering = false;

    const updateCursorPosition = () => {
      if (!isHoverDevice || !isHovering) return;
      cursorX += (mouseX - cursorX) * 0.12;
      cursorY += (mouseY - cursorY) * 0.12;
      if (cursor) {
        cursor.style.transform = `translate(-50%, -50%) translate3d(${cursorX}px, ${cursorY}px, 0) scale(1, 1)`;
      }
      rafId = requestAnimationFrame(updateCursorPosition);
    };

    const onMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const onMouseEnter = () => {
      isHovering = true;
      if (cursor) {
        gsap.to(cursor, {
          autoAlpha: 1,
          scale: 1,
          duration: 0.4,
          ease: "power2.out",
        });
      }
      if (isHoverDevice) {
        document.addEventListener("mousemove", onMouseMove);
        updateCursorPosition();
      }
    };

    const onMouseLeave = () => {
      isHovering = false;
      if (cursor) {
        gsap.to(cursor, {
          autoAlpha: 0,
          scale: 0,
          duration: 0.3,
          ease: "power2.in",
        });
      }
      if (isHoverDevice) {
        document.removeEventListener("mousemove", onMouseMove);
        if (rafId) cancelAnimationFrame(rafId);
      }
    };

    if (isHoverDevice && cursor) {
      link.addEventListener("mouseenter", onMouseEnter);
      link.addEventListener("mouseleave", onMouseLeave);
    }

    return () => {
      ctx.revert();
      if (isHoverDevice && cursor) {
        link.removeEventListener("mouseenter", onMouseEnter);
        link.removeEventListener("mouseleave", onMouseLeave);
        document.removeEventListener("mousemove", onMouseMove);
        if (rafId) cancelAnimationFrame(rafId);
      }
    };
  }, [cursorRef, isHoverDevice, project.parallax, project.bottomToMiddle]);

  return (
    <div
      ref={cardRef}
      className="work-card relative"
      style={{ gridArea: project.area, contain: "layout style paint" }}
    >
      <div className="mb-4 md:mb-5">
        <h2
          ref={titleRef}
          className="work-title font-secondhead font-bold text-[clamp(1.75rem,3.5vw,3rem)] leading-[0.95] tracking-tight text-black"
          style={{ willChange: "transform, opacity" }}
        >
          {project.title}
        </h2>
        <p
          ref={taglineRef}
          className="work-tagline mt-2 text-[12px] md:text-[13px] text-neutral-500 tracking-[0.02em] max-w-md"
          style={{ willChange: "transform, opacity" }}
        >
          {project.tagline}
        </p>
      </div>

      <div
        ref={linkRef}
        className="relative"
        style={{ cursor: isHoverDevice ? "none" : "pointer" }}
      >
        <a
          href={"#" + project.link}
          aria-label={`View ${project.title} project`}
          className="block"
        >
          <div
            ref={imgWrapRef}
            className="img-work-w relative overflow-hidden"
            style={{
              clipPath: "inset(0%)",
              willChange: "transform",
            }}
          >
            <img
              ref={imgRef}
              src={project.image}
              alt=""
              className="img-work block h-auto w-full object-contain"
              style={{
                willChange: "transform",
                transform: "translate3d(0px, 0px, 0px)",
              }}
              loading="lazy"
            />
          </div>
        </a>
      </div>
    </div>
  );
}

export function ViewAllButton() {
  return (
    <div className="mt-20 md:mt-28 text-center">
      <a
        href="#/works"
        className="inline-flex items-center gap-4 border border-black rounded-full px-10 py-5 text-[12px] tracking-[0.25em] uppercase font-mono hover:bg-black hover:text-white transition-colors duration-300"
      >
        View all
        <svg
          width="14"
          height="14"
          viewBox="0 0 14 14"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M1 13L13 1M13 1H4M13 1V10"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      </a>
    </div>
  );
}

export default function Works() {
  const sectionRef = useRef(null);
  const labelRef = useRef(null);
  const cursorRef = useRef(null);
  const [isHoverDevice, setIsHoverDevice] = useState(false);

  useEffect(() => {
    const checkHover = () => {
      const hasHover = window.matchMedia(
        "(hover: hover) and (pointer: fine)",
      ).matches;
      setIsHoverDevice(hasHover);
    };
    checkHover();
    window.addEventListener("resize", checkHover);
    return () => window.removeEventListener("resize", checkHover);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const label = labelRef.current;
      if (!label) return;

      gsap.set(label, { autoAlpha: 0, y: 30 });

      gsap.to(label, {
        autoAlpha: 1,
        y: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          once: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Recalculate ScrollTrigger positions once everything (incl. lazy images)
  // has loaded, so bottom-most cards reveal correctly.
  useEffect(() => {
    const onLoad = () => ScrollTrigger.refresh();
    window.addEventListener("load", onLoad);
    const timer = setTimeout(() => ScrollTrigger.refresh(), 1500);
    return () => {
      window.removeEventListener("load", onLoad);
      clearTimeout(timer);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="works"
      className="relative bg-white pt-28 md:pt-40 pb-24 overflow-hidden"
    >
      <div className="relative z-10 mx-auto max-w-[1200px] px-6 md:px-12">
        <div className="flex items-end justify-between mb-10 md:mb-16">
          <div ref={labelRef}>
            <h1 className="font-display text-[clamp(2rem,8vw,12rem)] leading-[0.8] tracking-tight text-black">
              Works
            </h1>
          </div>
          <p className="text-[12px] tracking-[0.2em] uppercase text-neutral-400 font-mono pb-2">
            Selected Projects
          </p>
        </div>

        <div
          className="works-grid relative"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gridTemplateRows: "auto auto auto",
            gridTemplateAreas:
              '"nueva paps" "preparado preparado" "clinic smartfit"',
            gap: "10rem 5rem",
            willChange: "transform",
          }}
        >
          {homeProjects.map((project, index) => (
            <WorkCard
              key={project.id}
              project={project}
              index={index}
              cursorRef={cursorRef}
              isHoverDevice={isHoverDevice}
            />
          ))}
        </div>

        <ViewAllButton />
      </div>

      {isHoverDevice && (
        <div
          ref={cursorRef}
          className="cursor-work fixed top-0 left-0 z-[100] pointer-events-none"
          style={{
            transform: "translate(-50%, -50%) scale(0, 0)",
            willChange: "transform, opacity",
          }}
          aria-hidden="true"
        >
          <div className="flex items-center gap-2 bg-black px-5 py-3 rounded-full">
            <span className="text-white text-[12px] font-mono tracking-[0.15em] uppercase">
              explore
            </span>
            <svg
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
              className="text-white"
              aria-hidden="true"
            >
              <path
                d="M1 13L13 1M13 1H4M13 1V10"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </div>
        </div>
      )}
    </section>
  );
}
