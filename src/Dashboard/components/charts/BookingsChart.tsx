import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

const data = [
  { day: "Mon", bookings: 12 }, { day: "Tue", bookings: 19 },
  { day: "Wed", bookings: 15 }, { day: "Thu", bookings: 24 },
  { day: "Fri", bookings: 18 }, { day: "Sat", bookings: 29 },
  { day: "Sun", bookings: 21 },
];

export default function BookingsChart() {
  return <section className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm">
    <div className="mb-5"><h2 className="font-extrabold text-slate-900">Booking activity</h2><p className="mt-1 text-xs text-slate-500">Illustrative weekly booking volume</p></div>
    <div className="h-64">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" vertical={false}/>
          <XAxis dataKey="day" axisLine={false} tickLine={false}/>
          <YAxis axisLine={false} tickLine={false}/>
          <Tooltip/>
          <Bar dataKey="bookings" fill="#0165F6" radius={[6, 6, 0, 0]}/>
        </BarChart>
      </ResponsiveContainer>
    </div>
  </section>;
}
