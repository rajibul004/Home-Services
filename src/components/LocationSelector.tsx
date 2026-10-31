import { useState } from "react";
import { MapPin, ChevronDown, Check } from "lucide-react";

import { useLocation } from "./LocationContext";

const cities = ["Bolpur", "Burdwan"];

export default function LocationSelector() {
  const { city, setCity } = useLocation();

  const [open, setOpen] = useState(false);

  const handleCityChange = (newCity: string) => {
    setCity(newCity);
    setOpen(false);
  };

  return (
    <div className="relative">
      {/* SELECTED LOCATION */}
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="flex items-center gap-2 rounded-xl px-3 py-2 transition hover:bg-gray-50"
      >
        <MapPin size={18} className="text-[#0165F6]" />

        <div className="text-left">
          <p className="text-[10px] font-medium uppercase tracking-wide text-gray-400">
            Location
          </p>

          <p className="text-sm font-medium text-gray-900">
            {city ?? "Select city"}
          </p>
        </div>

        <ChevronDown
          size={16}
          className={`ml-1 text-gray-400 transition-transform ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* DROPDOWN */}
      {open && (
        <div className="absolute right-0 top-full z-50 mt-2 w-64 overflow-hidden rounded-2xl border border-gray-200 bg-white p-2 shadow-[0_12px_40px_rgba(0,0,0,0.10)]">
          {/* HEADER */}
          <div className="px-3 py-2">
            <p className="text-xs font-semibold text-gray-900">
              Choose your location
            </p>

            <p className="mt-0.5 text-[11px] text-gray-400">
              Select a city to see available services
            </p>
          </div>

          {/* CITIES */}
          <div className="mt-1">
            {cities.map((item) => {
              const selected = item === city;

              return (
                <button
                  key={item}
                  type="button"
                  onClick={() => handleCityChange(item)}
                  className="flex w-full items-center justify-between rounded-xl px-3 py-3 text-left transition hover:bg-gray-50"
                >
                  <div>
                    <p
                      className={`text-sm font-medium ${
                        selected ? "text-[#0165F6]" : "text-gray-900"
                      }`}
                    >
                      {item}
                    </p>

                    <p className="text-xs text-gray-400">West Bengal</p>
                  </div>

                  {selected && <Check size={17} className="text-[#0165F6]" />}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
