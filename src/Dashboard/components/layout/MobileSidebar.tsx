import { X } from "lucide-react";
import Sidebar from "./Sidebar";
import type { DashboardRole } from "../../types/dashboard.types";

export default function MobileSidebar({ role, open, onClose }: { role: DashboardRole; open: boolean; onClose: () => void }) {
  if (!open) return null;
  return <div className="fixed inset-0 z-50 lg:hidden">
    <button aria-label="Close menu" onClick={onClose} className="absolute inset-0 bg-slate-950/40"/>
    <div className="absolute inset-y-0 left-0 flex">
      <Sidebar role={role} onNavigate={onClose}/>
      <button onClick={onClose} aria-label="Close menu" className="absolute left-[17rem] top-4 rounded-lg bg-white p-2 text-slate-700"><X size={18}/></button>
    </div>
  </div>;
}
