import { useState } from "react";
import { Link } from "react-router-dom";

import Navbar from "../components/Navbar";
import AllServicesModal from "../components/AllServicesModal";
import { useLocation } from "../components/LocationContext";

import serviceCollage from "../assets/fixora-services.png";
import electricianImage from "../assets/services/electrician.png";
import plumberImage from "../assets/services/Plumbing.png";
import acImage from "../assets/services/air-conditioner.png";

export default function Home() {
  const [showServices, setShowServices] = useState(false);

  const { city: selectedCity } = useLocation();

  const city = selectedCity ?? "your city";

  return (
    <>
      {/* NAVBAR */}
      <Navbar />

      {/* HERO */}
      <section className="bg-white">
        <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-6 py-2 lg:grid-cols-[0.85fr_1.15fr] lg:px-10 lg:py-6">
          {/* LEFT */}
          <div>
            {/* HEADING */}
            <h1 className="max-w-lg text-4xl font-medium leading-[1.12] tracking-tight text-gray-900 sm:text-5xl">
              Home services in{" "}
              <span className="font-semibold text-[#0165F6]">{city}</span>
              <br />
              right at your doorstep.
            </h1>

            {/* DESCRIPTION */}
            <p className="mt-5 max-w-md text-sm leading-6 text-gray-500">
              Book trusted professionals for appliance repair, electrical,
              plumbing, and other home services in{" "}
              <span className="font-medium text-gray-700">{city}</span>.
            </p>

            {/* SERVICES */}
            <div className="mt-8 max-w-xl rounded-2xl border border-gray-200 bg-white p-4 shadow-[0_8px_30px_rgba(0,0,0,0.04)]">
              <div className="mb-3 flex items-center justify-between px-1">
                <div>
                  <h2 className="text-sm font-semibold text-gray-900">
                    Popular services
                  </h2>

                  <p className="mt-0.5 text-xs text-gray-400">
                    Available in {city}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                {/* ELECTRICAL */}
                <Link
                  to="/services/electrical"
                  className="group rounded-xl p-3 transition-all duration-200 hover:bg-gray-50"
                >
                  <div className="h-11 w-11 overflow-hidden rounded-lg bg-gray-100">
                    <img
                      src={electricianImage}
                      alt="Electrical service"
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>

                  <h3 className="mt-3 text-sm font-medium text-gray-900">
                    Electrical
                  </h3>

                  <p className="mt-1 text-xs text-gray-500">Wiring & repair</p>
                </Link>

                {/* AC */}
                <Link
                  to="/services/ac"
                  className="group rounded-xl p-3 transition-all duration-200 hover:bg-gray-50"
                >
                  <div className="h-11 w-11 overflow-hidden rounded-lg bg-gray-100">
                    <img
                      src={acImage}
                      alt="AC service"
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>

                  <h3 className="mt-3 text-sm font-medium text-gray-900">
                    AC Service
                  </h3>

                  <p className="mt-1 text-xs text-gray-500">
                    Cleaning & repair
                  </p>
                </Link>

                {/* APPLIANCE */}
                <Link
                  to="/services/appliance-repair"
                  className="group rounded-xl p-3 transition-all duration-200 hover:bg-gray-50"
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-gray-50 text-gray-700 transition-colors group-hover:bg-blue-50 group-hover:text-[#0165F6]">
                    <span className="text-lg">🔧</span>
                  </div>

                  <h3 className="mt-3 text-sm font-medium text-gray-900">
                    Appliance Repair
                  </h3>

                  <p className="mt-1 text-xs text-gray-500">
                    Repair & maintenance
                  </p>
                </Link>

                {/* PLUMBING */}
                <Link
                  to="/services/plumbing"
                  className="group rounded-xl p-3 transition-all duration-200 hover:bg-gray-50"
                >
                  <div className="h-11 w-11 overflow-hidden rounded-lg bg-gray-100">
                    <img
                      src={plumberImage}
                      alt="Plumbing service"
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>

                  <h3 className="mt-3 text-sm font-medium text-gray-900">
                    Plumbing
                  </h3>

                  <p className="mt-1 text-xs text-gray-500">Pipes & leakage</p>
                </Link>
              </div>

              {/* VIEW ALL */}
              <button
                type="button"
                onClick={() => setShowServices(true)}
                className="mt-3 flex w-full items-center justify-center gap-1 rounded-xl border border-gray-200 py-3 text-sm font-medium text-gray-700 transition-all duration-200 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-900"
              >
                View all services
                <span className="text-gray-400">→</span>
              </button>
            </div>
          </div>

          {/* RIGHT IMAGE */}
          <div className="flex justify-center lg:justify-end">
            <div className="w-full max-w-[520px] overflow-hidden rounded-3xl">
              <img
                src={serviceCollage}
                alt={`Fixora home services in ${city}`}
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ALL SERVICES MODAL */}
      <AllServicesModal
        open={showServices}
        onClose={() => setShowServices(false)}
      />
    </>
  );
}
