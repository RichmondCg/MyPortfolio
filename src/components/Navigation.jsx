import { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import gsap from "gsap";

function Navigation({ navRef, items }) {
  const menuRef = useRef(null);
  const [menuOpen, setMenuOpen] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const navItems = items || [
    { label: "Home", to: "/" },
    { label: "About Me", to: "/me" },
    { label: "Works", to: "/works" },
  ];
  // Open / close menu
  useEffect(() => {
    if (!menuRef.current) return;

    gsap.to(menuRef.current, {
      x: menuOpen ? 0 : "100%",
      duration: menuOpen ? 0.5 : 0.4,
      ease: menuOpen ? "power2.out" : "power2.in",
    });
  }, [menuOpen]);

  // Scroll after navigating to a hash
  useEffect(() => {
    if (!location.hash) return;

    const id = location.hash.substring(1);

    let attempts = 0;

    const scrollToElement = () => {
      const element = document.getElementById(id);

      if (element) {
        element.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });

        return;
      }

      attempts++;

      if (attempts < 30) {
        setTimeout(scrollToElement, 100);
      }
    };

    // Give the new page a moment to mount
    setTimeout(scrollToElement, 50);
  }, [location.pathname, location.hash]);

  const handleClick = (item) => {
    setMenuOpen(false);

    if (!item.hash) {
      navigate(item.to);
      return;
    }

    // If we're already on the correct page
    if (location.pathname === item.to) {
      const element = document.querySelector(item.hash);

      if (element) {
        element.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }

      return;
    }

    // Navigate from /me -> /#works
    navigate({
      pathname: item.to,
      hash: item.hash,
    });
  };

  return (
    <>
      {/* Top Navigation */}
      <header
        ref={navRef}
        className="absolute inset-x-0 top-0 z-30 flex items-center justify-between px-4 py-5 sm:px-6 sm:py-6 md:px-10"
      >
        <Link to="/" aria-label="RCHMND" className="inline-block">
          <span className="grid h-8 w-8 place-items-center bg-black font-display text-sm leading-none text-white sm:h-9 sm:w-9 sm:text-base">
            R
          </span>
        </Link>

        <button
          type="button"
          onClick={() => setMenuOpen((prev) => !prev)}
          className="group relative z-40 flex cursor-pointer items-center gap-3 text-xs uppercase tracking-[0.3em]
          after:absolute after:bottom-[-8px] after:left-0 after:h-[5px] after:w-0
          after:bg-current after:transition-all after:duration-500
          hover:after:w-full"
        >
          Menu
        </button>
      </header>

      {/* Fullscreen Menu */}
      <nav
        ref={menuRef}
        className="fixed inset-0 z-50 flex translate-x-full flex-col items-center justify-center bg-white will-change-transform"
      >
        {/* Close */}
        <button
          type="button"
          onClick={() => setMenuOpen(false)}
          className="absolute right-6 top-6 z-[60] cursor-pointer sm:right-8 sm:top-8"
          aria-label="Close menu"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        {/* Menu Items */}
        <div className="flex flex-col items-center gap-8">
          {navItems.map((item) =>
            item.hash ? (
              <button
                key={item.label}
                type="button"
                onClick={() => handleClick(item)}
                className="font-display text-3xl tracking-tight transition-opacity duration-300 hover:opacity-50 sm:text-4xl md:text-5xl"
              >
                {item.label}
              </button>
            ) : (
              <Link
                key={item.label}
                to={item.to}
                onClick={() => setMenuOpen(false)}
                className="font-display text-3xl tracking-tight transition-opacity duration-300 hover:opacity-50 sm:text-4xl md:text-5xl"
              >
                {item.label}
              </Link>
            ),
          )}
        </div>
      </nav>
    </>
  );
}

export default Navigation;
