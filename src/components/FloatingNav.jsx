import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SECTIONS = [
  {
    id: "experience",
    path: "/experience",
    label: "Experience",
    desc: "My professional journey and roles",
    icon: (
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        aria-hidden="true"
      >
        <rect x="2" y="7" width="20" height="14" rx="2" />
        <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
        <path d="M2 13h20" />
      </svg>
    ),
  },
  {
    id: "stack",
    path: "/stack",
    label: "Stack",
    desc: "Tools and technologies I use",
    icon: (
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        aria-hidden="true"
      >
        <path d="M12 2L2 7l10 5 10-5-10-5z" />
        <path d="M2 17l10 5 10-5" />
        <path d="M2 12l10 5 10-5" />
      </svg>
    ),
  },
  {
    id: "certifications",
    path: "/certifications",
    label: "Certifications",
    desc: "Credentials and achievements",
    icon: (
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        aria-hidden="true"
      >
        <circle cx="12" cy="8" r="6" />
        <path d="M8.5 13l-2.5 9 6-3 6 3-2.5-9" />
      </svg>
    ),
  },
];

function FloatingNav() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const goTo = (path) => {
    setOpen(false);
    navigate(path);
  };

  return (
    <>
      {/* Desktop: left-middle rail */}
      <nav className="fixed left-6 top-1/2 z-40 hidden -translate-y-1/2 flex-col items-start gap-3 md:flex">
        {SECTIONS.map((s) => (
          <div key={s.id} className="group relative flex items-center">
            <button
              type="button"
              onClick={() => goTo(s.path)}
              className="grid h-11 w-11 place-items-center rounded-full border border-black bg-white text-black transition-all duration-300 group-hover:bg-black group-hover:text-white"
            >
              {s.icon}
            </button>
            {/* Tooltip */}
            <div className="pointer-events-none absolute left-full ml-4 w-56 translate-x-2 rounded-lg border border-black/10 bg-white p-4 opacity-0 shadow-lg transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100">
              <p className="font-display text-sm tracking-tight">{s.label}</p>
              <p className="mt-1 text-xs leading-relaxed text-black/60">
                {s.desc}
              </p>
            </div>
          </div>
        ))}
      </nav>

      {/* Mobile: assistive ball */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-3 md:hidden">
        {open && (
          <div className="flex flex-col items-end gap-2">
            {SECTIONS.map((s) => (
              <button
                key={s.id}
                type="button"
                onClick={() => goTo(s.path)}
                className="flex items-center gap-3 rounded-full border border-black bg-white px-4 py-2.5 text-[11px] tracking-[0.2em] uppercase shadow-md transition-colors hover:bg-black hover:text-white"
              >
                {s.label}
              </button>
            ))}
          </div>
        )}

        {/* Bouncing ball with pulsing border */}
        <button
          type="button"
          onClick={() => setOpen(!open)}
          aria-label="Jump to sections"
          className="relative grid h-14 w-14 place-items-center rounded-full bg-black text-white"
        >
          <span className="pointer-events-none absolute inset-0 animate-ring-pulse rounded-full border-2 border-black" />
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            aria-hidden="true"
            className={open ? "rotate-45 transition-transform duration-300" : "transition-transform duration-300"}
          >
            <path d="M12 5v14M5 12h14" />
          </svg>
        </button>
      </div>
    </>
  );
}

export default FloatingNav;