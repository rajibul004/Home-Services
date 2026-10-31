import { useState, useEffect } from "react";
import {
  Bell,
  Search,
  ChevronDown,
  BriefcaseBusiness,
  UserRound,
  LogOut,
} from "lucide-react";
import { dashboardTitles } from "../../config/dashboardNavigation";
import type { DashboardRole } from "../../types/dashboard.types";
import { apiRequest } from "../../../api/client";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../../../api/authApi";

type WorkStatus = "AVAILABLE" | "OFF_DUTY";
interface TechnicianProfile {
  workStatus: WorkStatus;
}
const workStatusOptions: {
  value: WorkStatus;
  label: string;
}[] = [
  { value: "AVAILABLE", label: "Available" },
  { value: "OFF_DUTY", label: "Off Duty" },
];

const statusStyles: Record<WorkStatus, string> = {
  AVAILABLE: "bg-green-50 text-green-700",
  OFF_DUTY: "bg-slate-100 text-slate-600",
};

export default function TopNavbar({ role }: { role: DashboardRole }) {
  const isTechnician = role === "TECHNICIAN";

  const [workStatus, setWorkStatus] = useState<WorkStatus>("OFF_DUTY");
  const [updating, setUpdating] = useState(false);
  const [loadingStatus, setLoadingStatus] = useState(isTechnician);

  // Fetch existing work status
  useEffect(() => {
    if (!isTechnician) return;

    const fetchWorkStatus = async () => {
      const token = localStorage.getItem("accessToken");

      if (!token) {
        setLoadingStatus(false);
        return;
      }

      try {
        const profile = await apiRequest<TechnicianProfile>(
          "/technician/profile",
        );

        setWorkStatus(profile.workStatus ?? "OFF_DUTY");
      } catch (error) {
      } finally {
        setLoadingStatus(false);
      }
    };

    fetchWorkStatus();
  }, [isTechnician]);

  // Update work status
  const updateWorkStatus = async (status: WorkStatus) => {
    const token = localStorage.getItem("accessToken");

    if (!token) {
      return;
    }

    try {
      setUpdating(true);

      await apiRequest("/technician/work-status", {
        method: "PATCH",
        body: JSON.stringify({ status }),
      });

      setWorkStatus(status);
    } catch (error) {
      alert("Unable to update work status.");
    } finally {
      setUpdating(false);
    }
  };
  const navigate = useNavigate();

  const handleLogout = () => {
    logoutUser();
    navigate("/login", { replace: true });
  };
  const [accountOpen, setAccountOpen] = useState(false);

  // Keep your existing states and functions below...

  return (
    <header className="flex h-16 items-center justify-between border-b border-slate-200 bg-white px-4 sm:px-7">
      <div className="min-w-0">
        <p className="truncate text-sm font-bold text-slate-800">
          {dashboardTitles[role]}
        </p>
        <p className="hidden text-[11px] text-slate-400 sm:block">
          Manage your work from one place
        </p>
      </div>

      <div className="flex items-center gap-2 sm:gap-4">
        {/* Technician Work Status */}
        {isTechnician && (
          <div className="flex items-center gap-2 rounded-xl border border-slate-200 px-2 py-1.5">
            <BriefcaseBusiness size={15} className="text-slate-500" />
            {/* Availability Indicator */}
            {/* Current Work Status Indicator */}
            <div className="flex items-center gap-1.5 whitespace-nowrap rounded-lg px-2 py-1">
              <span
                className={`h-2.5 w-2.5 rounded-full ${
                  workStatus === "AVAILABLE"
                    ? "bg-green-500"
                    : workStatus === "OFF_DUTY"
                      ? "bg-red-500"
                      : "bg-gray-400"
                }`}
              />

              <span
                className={`text-xs font-bold ${
                  statusStyles[workStatus].replace("bg-", "text-").split(" ")[0]
                }`}
              >
                {
                  workStatusOptions.find((item) => item.value === workStatus)
                    ?.label
                }
              </span>
            </div>
            <select
              value={workStatus}
              disabled={updating || loadingStatus}
              onChange={(e) => updateWorkStatus(e.target.value as WorkStatus)}
              className={`max-w-28 cursor-pointer rounded-lg px-2 py-1 text-xs font-semibold outline-none disabled:opacity-50 ${statusStyles[workStatus]}`}
              aria-label="Change work status"
            >
              {workStatusOptions.map((status) => (
                <option key={status.value} value={status.value}>
                  {status.label}
                </option>
              ))}
            </select>

            {updating && (
              <span className="text-[10px] text-slate-400">Saving...</span>
            )}
          </div>
        )}
        {/* Search */}
        <label className="hidden h-9 items-center gap-2 rounded-xl border border-slate-200 px-3 md:flex">
          <Search size={15} className="text-slate-400" />
          <input
            className="w-36 bg-transparent text-xs outline-none"
            placeholder="Search..."
          />
        </label>
        {/* Notifications */}
        <button
          className="relative rounded-xl p-2 text-slate-500 hover:bg-slate-100"
          aria-label="Notifications"
        >
          <Bell size={19} />
          <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-rose-500 ring-2 ring-white" />
        </button>

        <div className="relative">
          <button
            type="button"
            onClick={() => setAccountOpen(!accountOpen)}
            className="flex items-center gap-2 rounded-xl p-1.5 transition hover:bg-slate-50"
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 text-xs font-extrabold text-blue-700">
              U
            </span>

            <span className="hidden text-left sm:block">
              <span className="block text-xs font-bold text-slate-800">
                My Account
              </span>
              <span className="block text-[10px] text-slate-400">
                {role.replaceAll("_", " ")}
              </span>
            </span>

            <ChevronDown
              size={14}
              className={`hidden text-slate-400 transition-transform sm:block ${
                accountOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          {accountOpen && (
            <div className="absolute right-0 top-full z-50 mt-2 w-48 overflow-hidden rounded-xl border border-slate-200 bg-white py-1 shadow-xl">
              <button
                type="button"
                onClick={() => {
                  setAccountOpen(false);
                  // Add profile navigation here when available
                }}
                className="flex w-full items-center gap-3 px-4 py-3 text-sm text-slate-700 transition hover:bg-slate-50"
              >
                <UserRound size={16} />
                My Profile
              </button>

              <div className="mx-3 border-t border-slate-100" />

              <button
                type="button"
                onClick={handleLogout}
                className="flex w-full items-center gap-3 px-4 py-3 text-sm font-medium text-red-600 transition hover:bg-red-50"
              >
                <LogOut size={16} />
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
