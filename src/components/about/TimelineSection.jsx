import React from "react";
import TimelineItem from "./TimelineItem";

function TimelineSection({ title, eyebrow, items, offset = 0 }) {
  return (
    <section className="relative pb-10 md:pb-24">
      <div className="relative z-10 w-full px-6 sm:px-10 lg:px-14">
        <div className="flex flex-col justify-between gap-2">
          <div className="flex items-center gap-3">
            <h2 className="text-3xl font-black sm:text-4xl">{title}</h2>
          </div>
          <p className="text-xs uppercase tracking-[0.3em] text-[#93c5fd]">
            {eyebrow}
          </p>
        </div>

        <div className="relative mt-20">
          <div className="absolute left-[20px] top-0 bottom-0 w-[2px] -translate-x-1/2 bg-gradient-to-b from-[#93c5fd]/50 via-[#93c5fd]/10 to-transparent md:left-1/2" />

          <div className="space-y-16 md:space-y-24">
            {items.map((item, index) => (
              <TimelineItem
                key={`${item.year}-${item.title}`}
                item={item}
                index={index + offset}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default TimelineSection;
