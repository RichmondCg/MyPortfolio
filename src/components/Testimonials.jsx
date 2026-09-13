import { useEffect, useRef, useState } from "react";
import photo1 from "../assets/profiles/photo1.jpg";
import photo2 from "../assets/profiles/photo2.jpg";
import photo3 from "../assets/profiles/photo3.jpg";

const TESTIMONIALS = [
  {
    name: "Mika Santos",
    role: "Founder, Nueva Insights",
    image: photo1,
    quote:
      "Richmond brought structure to a complicated idea and turned it into a website our clients understood immediately.",
  },
  {
    name: "Adrian Cruz",
    role: "CEO, Paps Barbershop",
    image: photo2,
    quote:
      "The booking experience finally feels like our shop: personal, clear, and easy to move through.",
  },
  {
    name: "Leah Garcia",
    role: "Product Lead, Preparado",
    image: photo3,
    quote:
      "He thinks through the whole product, not just the screen in front of him. That made every decision sharper.",
  },
];

function TestimonialCard({ testimonial }) {
  return (
    <article className="w-[min(78vw,380px)] shrink-0 border border-black/15 bg-white p-6 md:p-8">
      <div className="flex items-center gap-4">
        <img
          src={testimonial.image}
          alt={`${testimonial.name} testimonial portrait`}
          className="h-12 w-12 rounded-full object-cover"
        />
        <div>
          <h3 className="font-secondhead text-lg font-bold leading-none">
            {testimonial.name}
          </h3>
          <p className="mt-2 text-[10px] uppercase tracking-[0.18em] text-black/50">
            {testimonial.role}
          </p>
        </div>
      </div>
      <p className="mt-8 text-sm leading-relaxed text-black/75 md:text-base">
        “{testimonial.quote}”
      </p>
    </article>
  );
}

export default function Testimonials() {
  const [isPaused, setIsPaused] = useState(false);
  const trackRef = useRef(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const animation = track.animate(
      [{ transform: "translateX(0)" }, { transform: "translateX(-33.333%)" }],
      { duration: 18000, iterations: Infinity, easing: "linear" },
    );

    animation.onfinish = () => animation.cancel();

    return () => animation.cancel();
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    track.getAnimations().forEach((animation) => {
      animation.playbackRate = isPaused ? 0 : 1;
    });
  }, [isPaused]);

  const cards = [...TESTIMONIALS, ...TESTIMONIALS, ...TESTIMONIALS];

  return (
    <section id="testimonials" className="overflow-hidden py-24 md:py-36">
      <div className="mx-auto max-w-[1200px] px-6 md:px-12">
        <div className="mb-12 flex flex-col gap-4 md:mb-16 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 className="font-display text-[clamp(2.5rem,7vw,8rem)] leading-[0.82] tracking-tight">
              Kind words
            </h2>
          </div>
          <p className="max-w-xs text-sm leading-relaxed text-black/60">
            A few notes from people I have helped turn ideas into useful digital
            work.
          </p>
        </div>
      </div>

      <div
        className="relative"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onFocus={() => setIsPaused(true)}
        onBlur={() => setIsPaused(false)}
      >
        <div ref={trackRef} className="flex w-max gap-4 px-6 md:gap-6 md:px-12">
          {cards.map((testimonial, index) => (
            <TestimonialCard
              key={`${testimonial.name}-${index}`}
              testimonial={testimonial}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
