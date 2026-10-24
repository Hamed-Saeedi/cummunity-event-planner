import { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { CalendarDays, Menu, X } from "lucide-react";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const linkStyle = ({ isActive }) =>
    isActive
      ? "text-orange-600"
      : "text-stone-600 transition hover:text-orange-600";

  const mobileLinkStyle = ({ isActive }) =>
    `block py-3 ${
      isActive ? "text-orange-600" : "text-stone-600 hover:text-orange-600"
    }`;

  return (
    <nav className="fixed top-0 left-0 z-50 w-full bg-[#fffaf4] shadow-sm">
      <div className="flex items-center justify-between px-6 py-4 md:px-12">
        <Link
          to="/"
          onClick={() => setMenuOpen(false)}
          className="flex items-center gap-2"
        >
          <CalendarDays size={30} className="text-orange-600" />
          <span className="text-xl font-bold text-stone-900">
            CEP<span className="text-orange-600">.</span>
          </span>
        </Link>

        <div className="hidden items-center gap-8 text-sm font-medium md:flex">
          <NavLink to="/" end className={linkStyle}>
            Home
          </NavLink>
          <NavLink to="/events" className={linkStyle}>
            Events
          </NavLink>
          <NavLink to="/register" className={linkStyle}>
            Registration Plan
          </NavLink>
          <NavLink to="/about" className={linkStyle}>
            About
          </NavLink>
          <NavLink to="/admin" className={linkStyle}>
            Admin
          </NavLink>
        </div>

        <Link
          to="/events"
          className="hidden rounded-full bg-stone-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-orange-600 md:block"
        >
          Get Started →
        </Link>

        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="rounded-lg border border-orange-200 p-2 text-stone-900 md:hidden"
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
        >
          {menuOpen ? <X size={23} /> : <Menu size={23} />}
        </button>
      </div>

      {menuOpen && (
        <div className="border-t border-orange-100 px-6 py-3 md:hidden">
          <NavLink
            to="/"
            end
            className={mobileLinkStyle}
            onClick={() => setMenuOpen(false)}
          >
            Home
          </NavLink>

          <NavLink
            to="/events"
            className={mobileLinkStyle}
            onClick={() => setMenuOpen(false)}
          >
            Events
          </NavLink>

          <NavLink
            to="/register"
            className={mobileLinkStyle}
            onClick={() => setMenuOpen(false)}
          >
            Registration Plan
          </NavLink>

          <NavLink
            to="/about"
            className={mobileLinkStyle}
            onClick={() => setMenuOpen(false)}
          >
            About
          </NavLink>

          <NavLink
            to="/admin"
            className={mobileLinkStyle}
            onClick={() => setMenuOpen(false)}
          >
            Admin
          </NavLink>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
