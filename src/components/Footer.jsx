import { CalendarDays, Mail, MapPin, Code2 } from "lucide-react";

function Footer() {
  return (
    <footer className="bg-[#2a1a11] px-6 pt-12 text-white md:px-12">
      <div className="mx-auto grid max-w-7xl gap-10 pb-10 sm:grid-cols-2 lg:grid-cols-3">
        <div>
          <a href="#home" className="flex items-center gap-3">
            <CalendarDays size={32} className="text-orange-500" />

            <span className="text-2xl font-bold">
              CEP<span className="text-orange-500">.</span>
            </span>
          </a>

          <p className="mt-4 max-w-xs text-sm leading-7 text-stone-300">
            Discover events, learn new skills, and connect with people in your
            community.
          </p>
        </div>

        <div>
          <h3 className="font-bold">Quick Links</h3>

          <div className="mt-4 flex flex-col items-start gap-3 text-sm text-stone-300">
            <a href="#home" className="hover:text-orange-400">
              Home
            </a>
            <a href="#events" className="hover:text-orange-400">
              Events
            </a>
            <a href="#about" className="hover:text-orange-400">
              About Us
            </a>
          </div>
        </div>

        <div>
          <h3 className="font-bold">Contact Us</h3>

          <div className="mt-4 flex flex-col gap-4 text-sm text-stone-300">
            <p className="flex items-center gap-3">
              <MapPin size={18} className="text-orange-500" />
              Herat, Afghanistan
            </p>

            <p className="flex items-center gap-3">
              <Mail size={18} className="text-orange-500" />
              Community Events
            </p>

            <a
              href="https://github.com"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-3 hover:text-orange-400"
            >
              <Code2 size={18} className="text-orange-500" />
              Visit GitHub
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10 py-5 text-center text-xs text-stone-400">
        © 2026 Community Event Registration Planner. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
