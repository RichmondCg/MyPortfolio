import React from "react";
import CertificateCard from "./CertificateCard";

function AwardsSection({ title, eyebrow, items }) {
  return (
    <section className="relative flex w-full flex-col py-12 md:py-20">
      <div className="relative left-6 z-20 sm:left-10 lg:left-14 mb-8 md:mb-12">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-3">
            <h2 className="text-3xl font-black sm:text-4xl">{title}</h2>
          </div>
          <p className="hidden text-xs uppercase tracking-[0.3em] text-[#93c5fd] md:block">
            {eyebrow}
          </p>
        </div>
      </div>

      <div className="relative z-10 w-full px-6 sm:px-10 lg:px-14">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item, index) => (
            <CertificateCard
              key={`${item.title}-${item.date}`}
              item={item}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default AwardsSection;
