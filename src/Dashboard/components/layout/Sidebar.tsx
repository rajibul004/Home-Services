import * as Icons from "lucide-react";
import { NavLink } from "react-router-dom";
import { dashboardBasePaths, dashboardNavigation, dashboardTitles } from "../../config/dashboardNavigation";
import type { DashboardRole } from "../../types/dashboard.types";

export default function Sidebar({ role, onNavigate }: { role: DashboardRole; onNavigate?: () => void }) {
  const base = dashboardBasePaths[role];
  return <aside className="flex h-full w-64 shrink-0 flex-col border-r border-slate-200 bg-white">
    <div className="flex h-20 items-center gap-3 border-b border-slate-100 px-6">
      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-lg font-black text-white">F</div>
      <div><p className="font-extrabold tracking-tight text-slate-900">Fixora</p><p className="text-[10px] font-semibold uppercase tracking-widest text-slate-400">{role.replaceAll("_", " ")}</p></div>
    </div>
    <div className="px-4 pt-6"><p className="px-3 text-[10px] font-bold uppercase tracking-[.16em] text-slate-400">{dashboardTitles[role]}</p></div>
    <nav className="flex-1 space-y-1 overflow-y-auto px-4 py-4">
      {dashboardNavigation[role].map((item) => {
        const Icon = (Icons as unknown as Record<string, Icons.LucideIcon>)[item.icon] ?? Icons.Circle;
        return <NavLink key={item.label} to={`${base}${item.path}`} end={item.path === ""} onClick={onNavigate}
          className={({ isActive }) => `flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold transition ${isActive ? "bg-blue-50 text-blue-700" : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"}`}>
          <Icon size={18}/><span>{item.label}</span>
        </NavLink>;
      })}
    </nav>
    <div className="border-t border-slate-100 p-4"><p className="text-xs text-slate-400">Samadho service platform</p></div>
  </aside>;
}
