import type { LucideIcon } from "lucide-react";

export default function StatCard({
  title, value, note, icon: Icon, trend,
}: {
  title: string; value: string; note?: string; icon: LucideIcon; trend?: string;
}) {
  return (
    <section className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm font-medium text-slate-500">{title}</p>
          <p className="mt-2 text-2xl font-extrabold tracking-tight text-slate-900">{value}</p>
        </div>
        <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600"><Icon size={20}/></span>
      </div>
      <div className="mt-3 flex items-center justify-between gap-2">
        <p className="text-xs text-slate-400">{note}</p>
        {trend && <span className="text-xs font-bold text-emerald-600">{trend}</span>}
      </div>
    </section>
  );
}
