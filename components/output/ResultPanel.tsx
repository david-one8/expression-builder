"use client";
import type { CompileResult } from "@/compiler/evaluate";

export function ResultPanel({ results }: { results: CompileResult }) {
  return (
    <div className="border border-emerald-300 bg-emerald-50 rounded-xl p-4">
      <h3 className="text-sm font-semibold text-emerald-800 mb-2">Compile Results</h3>
      <div className="flex flex-col gap-1">
        {Object.entries(results).map(([key, val]) => (
          <div key={key} className="flex items-center gap-2 text-sm">
            <span className="font-mono text-emerald-700 font-medium">{key}</span>
            <span className="text-gray-500">=</span>
            <span className="font-mono bg-white border border-emerald-200 px-2 py-0.5 rounded text-emerald-900">
              {String(val)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
