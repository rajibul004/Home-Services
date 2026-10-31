import { Inbox } from "lucide-react";

export default function EmptyState({ title = "Nothing here yet", description = "New activity will appear here when available." }: { title?: string; description?: string }) {
  return (
    <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-12 text-center">
      <Inbox className="mx-auto text-slate-400" size={30}/>
      <h3 className="mt-3 font-bold text-slate-800">{title}</h3>
      <p className="mt-1 text-sm text-slate-500">{description}</p>
    </div>
  );
}
