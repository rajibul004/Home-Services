import { Activity, CalendarDays, CircleDollarSign, Users, BriefcaseBusiness, ClipboardList, Headset, ShieldCheck, Wrench } from "lucide-react";
import DashboardLayout from "../components/layout/DashboardLayout";
import PageHeader from "../components/common/PageHeader";
import StatCard from "../components/common/StatCard";
import BookingsChart from "../components/charts/BookingsChart";
import RevenueChart from "../components/charts/RevenueChart";
import type { DashboardRole } from "../types/dashboard.types";
import { dashboardTitles } from "../config/dashboardNavigation";

const content: Record<DashboardRole, { description: string; stats: { title: string; value: string; note: string; icon: typeof CalendarDays; trend?: string }[]; tasks: string[] }> = {
  CUSTOMER: { description: "Manage your home services, appointments and payments.", stats: [{ title: "Total bookings", value: "8", note: "All-time sample", icon: CalendarDays }, { title: "Active bookings", value: "2", note: "Currently in progress", icon: Activity }, { title: "Completed services", value: "6", note: "Successfully completed", icon: Wrench }, { title: "Payments", value: "₹4,850", note: "Illustrative total", icon: CircleDollarSign }], tasks: ["Book a new service", "View upcoming appointment", "Review completed service"] },
  TECHNICIAN: { description: "Your assigned work, schedule and earnings at a glance.", stats: [{ title: "Today's jobs", value: "4", note: "Sample assignments", icon: BriefcaseBusiness }, { title: "Pending requests", value: "2", note: "Awaiting your response", icon: ClipboardList }, { title: "Completed jobs", value: "38", note: "Illustrative total", icon: Wrench }, { title: "Monthly earnings", value: "₹18,400", note: "Demo amount", icon: CircleDollarSign }], tasks: ["Review new job requests", "Update today's job status", "Check your availability"] },
  TECHNICIAN_SUPERVISOR: { description: "Coordinate technician assignments and monitor field operations.", stats: [{ title: "Team technicians", value: "18", note: "Sample team size", icon: Users }, { title: "Available now", value: "7", note: "Demo availability", icon: Activity }, { title: "Unassigned jobs", value: "5", note: "Require allocation", icon: ClipboardList }, { title: "Jobs completed", value: "42", note: "This week · demo", icon: Wrench }], tasks: ["Assign unallocated jobs", "Review technician attendance", "Resolve delayed assignments"] },
  CUSTOMER_SUPPORT: { description: "Resolve customer questions, complaints and service issues.", stats: [{ title: "Open tickets", value: "12", note: "Sample ticket count", icon: Headset }, { title: "Unassigned tickets", value: "3", note: "Need an owner", icon: ClipboardList }, { title: "Resolved today", value: "9", note: "Illustrative count", icon: ShieldCheck }, { title: "Customer satisfaction", value: "96%", note: "Demo score", icon: Activity }], tasks: ["Review priority complaints", "Assign unowned tickets", "Follow up on pending refunds"] },
  OPERATIONS_MANAGER: { description: "Monitor service delivery, workforce and operational performance.", stats: [{ title: "Today's bookings", value: "32", note: "Sample volume", icon: CalendarDays }, { title: "Pending assignments", value: "5", note: "Require coordination", icon: ClipboardList }, { title: "Active technicians", value: "14", note: "Demo availability", icon: Users }, { title: "Service value", value: "₹42,600", note: "Illustrative amount", icon: CircleDollarSign }], tasks: ["Resolve pending assignments", "Review delayed services", "Check service area capacity"] },
  ADMIN: { description: "Monitor platform users, service activity and business performance.", stats: [{ title: "Total bookings", value: "248", note: "Demo figures", icon: CalendarDays, trend: "+12%" }, { title: "Gross service value", value: "₹1,24,800", note: "Illustrative amount", icon: CircleDollarSign, trend: "+18%" }, { title: "Registered customers", value: "156", note: "Sample account count", icon: Users }, { title: "Active technicians", value: "28", note: "Sample team size", icon: Wrench }], tasks: ["Review pending technician verifications", "Monitor open complaints", "Review booking operations"] },
  SUPER_ADMIN: { description: "Oversee platform governance, administrators, security and system health.", stats: [{ title: "Platform users", value: "1,248", note: "Illustrative total", icon: Users }, { title: "Active admins", value: "8", note: "Sample count", icon: ShieldCheck }, { title: "Transactions", value: "₹8.4L", note: "Demo gross value", icon: CircleDollarSign }, { title: "System alerts", value: "2", note: "Sample alerts", icon: Activity }], tasks: ["Review administrator access", "Inspect recent audit activity", "Review platform security alerts"] },
};

export default function RoleOverview({ role }: { role: DashboardRole }) {
  const item = content[role];
  return <DashboardLayout role={role}>
    <PageHeader eyebrow="SAMADHO / FIXORA" title={dashboardTitles[role]} description={item.description}/>
    <div className="mb-6 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-xs leading-5 text-amber-800">
      Demo dashboard: all metrics and activities are sample data. Connect secured Spring Boot APIs before using this in production.
    </div>
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {item.stats.map((stat) => <StatCard key={stat.title} title={stat.title} value={stat.value} note={stat.note} icon={stat.icon} trend={stat.trend}/>)}
    </div>
    {(role === "ADMIN" || role === "SUPER_ADMIN" || role === "OPERATIONS_MANAGER") && <div className="mt-6 grid gap-6 xl:grid-cols-2"><BookingsChart/><RevenueChart/></div>}
    <div className="mt-6 grid gap-6 xl:grid-cols-[1.2fr_.8fr]">
      <section className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm">
        <h2 className="font-extrabold text-slate-900">Priority actions</h2>
        <p className="mt-1 text-xs text-slate-500">Suggested tasks for your workspace</p>
        <div className="mt-4 space-y-3">{item.tasks.map((task, i) => <div key={task} className="flex items-center gap-3 rounded-xl bg-slate-50 p-3"><span className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-100 text-xs font-extrabold text-blue-700">{i + 1}</span><span className="text-sm font-medium text-slate-700">{task}</span></div>)}</div>
      </section>
      <section className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm">
        <div className="flex items-center gap-2"><Activity size={18} className="text-blue-600"/><h2 className="font-extrabold text-slate-900">Recent activity</h2></div>
        <div className="mt-4 space-y-4">{["Dashboard opened", "Your workspace is ready", "No new critical alerts"].map((activity, i) => <div key={activity} className="flex gap-3"><span className="mt-1.5 h-2 w-2 rounded-full bg-blue-500"/><div><p className="text-sm font-semibold text-slate-700">{activity}</p><p className="mt-0.5 text-xs text-slate-400">{i === 0 ? "Just now" : `${i * 15} minutes ago`} · Demo activity</p></div></div>)}</div>
      </section>
    </div>
  </DashboardLayout>;
}
