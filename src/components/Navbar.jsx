import { NavLink, Link } from "react-router-dom";
import { CalendarDays, Menu } from "lucide-react";

function Navbar() {
  const linkStyle = ({ isActive }) =>
    isActive
      ? "text-orange-600"
      : "text-stone-600 transition hover:text-orange-600";

  return (
    <nav className="fixed top-0 left-0 z-50 flex w-full items-center justify-between bg-[#fffaf4] px-6 py-4 shadow-sm md:px-12">
      <Link to="/" className="flex items-center gap-2">
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
        className="hidden rounded-full bg-stone-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-orange-600 sm:block"
      >
        Get Started →
      </Link>

      <button
        className="rounded-lg border border-orange-200 p-2 md:hidden"
        aria-label="Menu"
      >
        <Menu size={23} />
      </button>
    </nav>
  );
}

export default Navbar;
