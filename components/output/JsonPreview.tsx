"use client";
import { useState } from "react";
import { useExpressionStore } from "@/store/expressionStore";

export function JsonPreview() {
  const schema = useExpressionStore((s) => s.schema);
  const [open, setOpen] = useState(false);

  return (
    <div className="border border-gray-200 rounded-xl overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-4 py-2.5
                   bg-gray-50 text-sm font-medium text-gray-700 hover:bg-gray-100"
      >
        <span>JSON Schema</span>
        <span>{open ? "▲" : "▼"}</span>
      </button>
      {open && (
        <pre className="bg-gray-900 text-green-400 text-xs p-4 overflow-auto max-h-72">
          {JSON.stringify(schema, null, 2)}
        </pre>
      )}
    </div>
  );
}
