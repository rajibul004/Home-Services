import { useState, type ReactNode } from "react";
import { Menu } from "lucide-react";
import Sidebar from "./Sidebar";
import TopNavbar from "./TopNavbar";
import MobileSidebar from "./MobileSidebar";
import type { DashboardRole } from "../../types/dashboard.types";

export default function DashboardLayout({ role, children }: { role: DashboardRole; children: ReactNode }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  return <div className="min-h-screen bg-[#F7F9FC] text-slate-900">
    <div className="flex min-h-screen">
      <div className="hidden lg:block"><Sidebar role={role}/></div>
      <div className="min-w-0 flex-1">
        <div className="flex items-center border-b border-slate-200 bg-white lg:hidden">
          <button onClick={() => setMobileOpen(true)} className="p-4 text-slate-600" aria-label="Open menu"><Menu size={21}/></button>
          <span className="font-extrabold">Fixora</span>
        </div>
        <TopNavbar role={role}/>
        <main className="mx-auto w-full max-w-[1600px] p-4 sm:p-6 lg:p-8">{children}</main>
      </div>
    </div>
    <MobileSidebar role={role} open={mobileOpen} onClose={() => setMobileOpen(false)}/>
  </div>;
}
