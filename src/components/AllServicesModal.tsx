import { X, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

import electricianImage from "../assets/services/electrician.png";
import plumberImage from "../assets/services/Plumbing.png";
import acImage from "../assets/services/air-conditioner.png";

interface AllServicesModalProps {
  open: boolean;
  onClose: () => void;
}

const categories = [
  {
    id: "home",
    name: "Home Maintenance",
    description: "Essential repairs & maintenance",
  },
  {
    id: "appliance",
    name: "Appliance Services",
    description: "Repair & servicing",
  },
  {
    id: "cleaning",
    name: "Cleaning Services",
    description: "Cleaning & hygiene",
  },
  {
    id: "other",
    name: "Other Services",
    description: "More services for your home",
  },
];

const services = [
  {
    category: "home",
    name: "Electrical",
    description: "Wiring, switches & electrical repair",
    image: electricianImage,
    path: "/services/electrical",
  },
  {
    category: "home",
    name: "Plumbing",
    description: "Pipes, leakage & bathroom repair",
    image: plumberImage,
    path: "/services/plumbing",
  },
  {
    category: "home",
    name: "Carpenter",
    description: "Furniture & woodwork services",
    icon: "🪚",
    path: "/services/carpenter",
  },
  {
    category: "home",
    name: "Painting",
    description: "Home & wall painting",
    icon: "🎨",
    path: "/services/painting",
  },

  {
    category: "appliance",
    name: "AC Service",
    description: "AC cleaning, repair & maintenance",
    image: acImage,
    path: "/services/ac",
  },
  {
    category: "appliance",
    name: "Refrigerator",
    description: "Repair & maintenance",
    icon: "❄️",
    path: "/services/refrigerator",
  },
  {
    category: "appliance",
    name: "Washing Machine",
    description: "Repair & servicing",
    icon: "🫧",
    path: "/services/washing-machine",
  },
  {
    category: "appliance",
    name: "TV Repair",
    description: "TV installation & repair",
    icon: "📺",
    path: "/services/tv-repair",
  },

  {
    category: "cleaning",
    name: "Home Cleaning",
    description: "Complete home cleaning",
    icon: "🧹",
    path: "/services/home-cleaning",
  },
  {
    category: "cleaning",
    name: "Deep Cleaning",
    description: "Detailed deep home cleaning",
    icon: "✨",
    path: "/services/deep-cleaning",
  },
  {
    category: "cleaning",
    name: "Kitchen Cleaning",
    description: "Kitchen cleaning & hygiene",
    icon: "🍳",
    path: "/services/kitchen-cleaning",
  },
  {
    category: "cleaning",
    name: "Bathroom Cleaning",
    description: "Bathroom cleaning & sanitization",
    icon: "🚿",
    path: "/services/bathroom-cleaning",
  },

  {
    category: "other",
    name: "General Repair",
    description: "Everyday home repairs",
    icon: "🛠️",
    path: "/services/general-repair",
  },
  {
    category: "other",
    name: "Furniture Assembly",
    description: "Furniture installation & assembly",
    icon: "🪑",
    path: "/services/furniture-assembly",
  },
  {
    category: "other",
    name: "Installation",
    description: "Home product installation",
    icon: "🔩",
    path: "/services/installation",
  },
];

export default function AllServicesModal({
  open,
  onClose,
}: AllServicesModalProps) {
  if (!open) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-gray-950/50 px-4 py-6 backdrop-blur-md"
      onClick={onClose}
    >
      <div
        className="relative flex max-h-[90vh] w-full max-w-5xl flex-col overflow-hidden rounded-[28px] border border-white/60 bg-white shadow-[0_30px_100px_rgba(0,0,0,0.20)]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* HEADER */}
        <div className="flex shrink-0 items-center justify-between border-b border-gray-100 px-6 py-5 sm:px-8">
          <div>
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-[#0165F6]" />

              <span className="text-xs font-semibold uppercase tracking-wider text-[#0165F6]">
                Fixora Services
              </span>
            </div>

            <h2 className="mt-2 text-2xl font-semibold tracking-[-0.02em] text-gray-950 sm:text-3xl">
              What can we help you with?
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Choose a service category to get started
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-gray-200 text-gray-500 transition-all hover:border-gray-300 hover:bg-gray-50 hover:text-gray-900"
            aria-label="Close"
          >
            <X size={19} />
          </button>
        </div>

        {/* CONTENT */}
        <div className="flex min-h-0 flex-1 flex-col md:flex-row">
          {/* CATEGORY SIDEBAR */}
          <aside className="shrink-0 border-b border-gray-100 bg-gray-50/70 p-4 md:w-[230px] md:border-b-0 md:border-r md:p-5">
            <p className="mb-3 px-2 text-[11px] font-semibold uppercase tracking-wider text-gray-400">
              Categories
            </p>
            <div className="flex gap-2 overflow-x-auto md:block md:space-y-1">
              {categories.map((category, index) => (
                <a
                  key={category.id}
                  href={`#${category.id}`}
                  className={`group flex min-w-[190px] items-center justify-between rounded-xl px-3 py-3 text-left transition-all md:min-w-0 ${
                    index === 0
                      ? "bg-white shadow-sm ring-1 ring-gray-100"
                      : "hover:bg-white"
                  }`}
                >
                  <div>
                    <p
                      className={`text-sm font-semibold ${
                        index === 0
                          ? "text-gray-950"
                          : "text-gray-600 group-hover:text-gray-900"
                      }`}
                    >
                      {category.name}
                    </p>

                    <p className="mt-0.5 text-[11px] text-gray-400">
                      {category.description}
                    </p>
                  </div>

                  <ChevronRight
                    size={15}
                    className={`hidden transition-transform group-hover:translate-x-0.5 md:block ${
                      index === 0 ? "text-[#0165F6]" : "text-gray-400"
                    }`}
                  />
                </a>
              ))}
            </div>
          </aside>

          {/* SERVICES */}
          <div className="min-h-0 flex-1 overflow-y-auto px-5 py-6 sm:px-7">
            {categories.map((category) => {
              const categoryServices = services.filter(
                (service) => service.category === category.id,
              );

              return (
                <section
                  key={category.id}
                  id={category.id}
                  className="mb-9 scroll-mt-5 last:mb-2"
                >
                  {/* CATEGORY TITLE */}
                  <div className="mb-4 flex items-end justify-between">
                    <div>
                      <h3 className="text-base font-semibold text-gray-950">
                        {category.name}
                      </h3>

                      <p className="mt-0.5 text-xs text-gray-400">
                        {category.description}
                      </p>
                    </div>

                    <span className="text-xs text-gray-400">
                      {categoryServices.length} services
                    </span>
                  </div>

                  {/* SERVICE GRID */}
                  <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                    {categoryServices.map((service) => (
                      <Link
                        key={service.name}
                        to={service.path}
                        onClick={onClose}
                        className="group flex items-center gap-4 rounded-2xl border border-gray-100 bg-white p-3.5 transition-all duration-200 hover:-translate-y-0.5 hover:border-blue-100 hover:bg-blue-50/30 hover:shadow-[0_8px_25px_rgba(0,0,0,0.06)]"
                      >
                        {/* IMAGE / ICON */}
                        <div className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-gray-50 transition-colors group-hover:bg-white">
                          {"image" in service ? (
                            <img
                              src={service.image}
                              alt={service.name}
                              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                            />
                          ) : (
                            <span className="text-2xl">{service.icon}</span>
                          )}
                        </div>

                        {/* INFO */}
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center justify-between gap-2">
                            <h4 className="text-sm font-semibold text-gray-900">
                              {service.name}
                            </h4>

                            <ChevronRight
                              size={15}
                              className="shrink-0 text-gray-300 transition-all group-hover:translate-x-0.5 group-hover:text-[#0165F6]"
                            />
                          </div>

                          <p className="mt-1 line-clamp-1 text-xs leading-5 text-gray-500">
                            {service.description}
                          </p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </section>
              );
            })}

            {/* MOBILE CTA */}
            <Link
              to="/services"
              onClick={onClose}
              className="flex items-center justify-center gap-2 rounded-2xl bg-[#0165F6] py-3.5 text-sm font-semibold text-white shadow-lg shadow-blue-500/20 transition hover:bg-blue-700 md:hidden"
            >
              Explore all services
              <ChevronRight size={17} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
