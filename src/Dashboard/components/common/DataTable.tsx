import type { ReactNode } from "react";

export interface Column<T> {
  key: keyof T | string;
  header: string;
  render?: (row: T) => ReactNode;
}

export default function DataTable<T extends { id: string | number }>({
  columns, rows, emptyText = "No records found",
}: {
  columns: Column<T>[];
  rows: T[];
  emptyText?: string;
}) {
  if (!rows.length) return <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center text-sm text-slate-500">{emptyText}</div>;

  return <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
    <div className="overflow-x-auto">
      <table className="w-full min-w-[650px] text-left text-sm">
        <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
          <tr>{columns.map((column) => <th key={String(column.key)} className="px-5 py-4 font-bold">{column.header}</th>)}</tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {rows.map((row) => <tr key={row.id} className="hover:bg-slate-50/70">
            {columns.map((column) => <td key={String(column.key)} className="px-5 py-4 text-slate-700">
              {column.render ? column.render(row) : String((row as Record<string, unknown>)[String(column.key)] ?? "—")}
            </td>)}
          </tr>)}
        </tbody>
      </table>
    </div>
  </div>;
}
