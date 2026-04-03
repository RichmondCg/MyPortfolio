import React from "react";
import { Award } from "lucide-react";

function CertificateCard({ item }) {
  return (
    <div className="flex h-full flex-col rounded-3xl border border-white/10 bg-[#1B263B]/50 p-8 transition-all duration-300 hover:border-white/20 hover:bg-white/10">
      <div className="mb-6 flex items-start justify-between">
        <Award className="h-8 w-8 text-[#93c5fd]" />
        <span className="text-xs font-semibold uppercase tracking-wider text-[#93c5fd]">
          {item.date}
        </span>
      </div>
      <h3 className="mb-3 text-2xl font-bold text-white shadow-sm leading-tight">
        {item.title}
      </h3>
      <p className="text-base text-white/60 mt-auto pt-4">{item.issuer}</p>
    </div>
  );
}

export default CertificateCard;
