import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, UserCircle } from "lucide-react";

import logo from "../assets/fixora-logo.svg";
import SearchBar from "./SearchBar";
import LocationSelector from "./LocationSelector";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-gray-100 bg-white/95 backdrop-blur">
      {/* ================================================= */}
      {/* DESKTOP NAVBAR */}
      {/* ================================================= */}

      <nav className="mx-auto hidden h-[76px] max-w-[1440px] grid-cols-[auto_1fr_auto] items-center gap-8 px-8 xl:grid 2xl:px-12">
        {/* LEFT */}
        <div className="flex items-center gap-8">
          {/* LOGO */}
          <Link to="/" className="flex shrink-0 items-center gap-2">
            <img src={logo} alt="Fixora" className="h-10 w-10" />

            <span className="text-[22px] font-bold tracking-[-0.03em]">
              <span className="text-gray-950">Fix</span>
              <span className="text-[#0165F6]">ora</span>
            </span>
          </Link>

          {/* NAV LINKS */}
          <div className="hidden items-center gap-7 lg:flex">
            <Link
              to="/services"
              className="text-sm font-medium text-gray-600 transition hover:text-gray-950"
            >
              Home Services
            </Link>

            <Link
              to="/appliance-services"
              className="text-sm font-medium text-gray-600 transition hover:text-gray-950"
            >
              Appliance Services
            </Link>
          </div>
        </div>

        {/* CENTER */}
        <div className="flex items-center justify-center gap-2">
          {/* LOCATION */}
          <LocationSelector />

          {/* SEARCH */}
          <SearchBar />
        </div>

        {/* RIGHT */}
        <div className="flex items-center justify-end gap-3">
          {/* BOOK */}
          <Link
            to="/book-service"
            className="rounded-xl bg-[#0165F6] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700"
          >
            Book a Service
          </Link>

          {/* ACCOUNT */}
          <Link
            to="/login"
            className="flex h-10 w-10 items-center justify-center rounded-xl text-gray-600 transition hover:bg-gray-50 hover:text-gray-950"
            aria-label="Account"
          >
            <UserCircle size={24} strokeWidth={1.8} />
          </Link>
        </div>
      </nav>

      {/* ================================================= */}
      {/* MOBILE NAVBAR */}
      {/* ================================================= */}

      <nav className="xl:hidden">
        {/* TOP */}
        <div className="flex h-16 items-center justify-between px-4">
          {/* MENU */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="flex h-10 w-10 items-center justify-center rounded-xl text-gray-700 transition hover:bg-gray-50"
            aria-label="Menu"
          >
            {mobileMenuOpen ? (
              <X size={22} strokeWidth={1.8} />
            ) : (
              <Menu size={22} strokeWidth={1.8} />
            )}
          </button>

          {/* LOGO */}
          <Link to="/" className="flex items-center gap-1.5">
            <img src={logo} alt="Fixora" className="h-9 w-9" />

            <span className="text-xl font-bold tracking-[-0.03em]">
              <span className="text-gray-950">Fix</span>
              <span className="text-[#0165F6]">ora</span>
            </span>
          </Link>

          {/* ACCOUNT */}
          <Link
            to="/login"
            className="flex h-10 w-10 items-center justify-center rounded-xl text-gray-700 transition hover:bg-gray-50"
            aria-label="Account"
          >
            <UserCircle size={23} strokeWidth={1.8} />
          </Link>
        </div>

        {/* MOBILE LOCATION + SEARCH */}
        <div className="space-y-2.5 border-t border-gray-100 px-4 py-3">
          <div className="w-full">
            <LocationSelector />
          </div>

          <div className="w-full">
            <SearchBar />
          </div>
        </div>

        {/* MOBILE MENU */}
        {mobileMenuOpen && (
          <div className="border-t border-gray-100 bg-white px-4 py-3">
            <div className="flex flex-col gap-1">
              <Link
                to="/services"
                onClick={() => setMobileMenuOpen(false)}
                className="rounded-xl px-3 py-3 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
              >
                Home Services
              </Link>

              <Link
                to="/appliance-services"
                onClick={() => setMobileMenuOpen(false)}
                className="rounded-xl px-3 py-3 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
              >
                Appliance Services
              </Link>

              <Link
                to="/book-service"
                onClick={() => setMobileMenuOpen(false)}
                className="mt-2 rounded-xl bg-[#0165F6] px-4 py-3 text-center text-sm font-semibold text-white transition hover:bg-blue-700"
              >
                Book a Service
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
