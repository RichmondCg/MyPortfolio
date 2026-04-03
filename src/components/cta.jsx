import React from "react";

function Cta() {
  return (
    <section id="cta" className="px-0 sm:px-10 lg:px-20 py-16">
      <div className="flex flex-col lg:flex-row items-center relative overflow-hidden lg:rounded-3xl bg-gradient-to-tr from-[#6E4D3C] to-[#281004] px-6 py-12 sm:px-10 sm:py-14 lg:px-16 lg:py-16 gap-6">
        <div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white mb-3">
            Let’s Build Something Meaningful Together.
          </h1>
          <p className="text-white/80 max-w-2xl">
            Have an idea or project in mind? I’m ready to help you turn it into
            a purposeful and effective solution.
          </p>
        </div>
        <div className="lg:mt-8 flex flex-col items-center justify-center gap-4 w-full lg:w-auto">
          <div className="flex w-full flex-col space-y-4 sm:items-center">
            <input
              type="text"
              placeholder="Your email"
              className="w-full sm:w-[360px] lg:w-[420px] rounded-full border border-white/20 bg-white/10 px-5 py-3 text-sm sm:text-base text-white placeholder:text-white/60 outline-none transition-all focus:border-white/60 focus:bg-white/15"
            />
            <textarea
              rows={4}
              placeholder="Project brief"
              className="w-full sm:w-[360px] lg:w-[420px] rounded-2xl border border-white/20 bg-white/10 px-5 py-3 text-sm sm:text-base text-white placeholder:text-white/60 outline-none transition-all focus:border-white/60 focus:bg-white/15 resize-none"
            />
          </div>
          <button className="w-full sm:w-[360px] lg:w-[420px] rounded-full bg-white px-6 py-3 text-sm sm:text-base font-semibold text-[#0D1B2A] transition-transform hover:-translate-y-0.5">
            Send message
          </button>
        </div>
      </div>
    </section>
  );
}

export default Cta;
