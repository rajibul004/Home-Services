import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

const data = [
  { month: "Jan", revenue: 18000 }, { month: "Feb", revenue: 24000 },
  { month: "Mar", revenue: 21000 }, { month: "Apr", revenue: 31000 },
  { month: "May", revenue: 28000 }, { month: "Jun", revenue: 39000 },
];

export default function RevenueChart() {
  return <section className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm">
    <div className="mb-5"><h2 className="font-extrabold text-slate-900">Revenue overview</h2><p className="mt-1 text-xs text-slate-500">Illustrative monthly service value</p></div>
    <div className="h-64">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data}>
          <defs><linearGradient id="revenueFill" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#0165F6" stopOpacity={0.22}/><stop offset="95%" stopColor="#0165F6" stopOpacity={0}/></linearGradient></defs>
          <CartesianGrid strokeDasharray="3 3" vertical={false}/>
          <XAxis dataKey="month" axisLine={false} tickLine={false}/>
          <YAxis axisLine={false} tickLine={false}/>
          <Tooltip/>
          <Area type="monotone" dataKey="revenue" stroke="#0165F6" fill="url(#revenueFill)" strokeWidth={2.5}/>
        </AreaChart>
      </ResponsiveContainer>
    </div>
  </section>;
}
