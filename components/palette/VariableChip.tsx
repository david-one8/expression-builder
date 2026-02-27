"use client";
import { useEffect, useRef } from "react";
import { draggable } from "@atlaskit/pragmatic-drag-and-drop/element/adapter";
import type { Variable } from "@/types/expression";

export function VariableChip({ variable }: { variable: Variable }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    return draggable({
      element: ref.current,
      getInitialData: () => ({
        kind: "variable-node",
        node: { type: "variable", name: variable.name },
      }),
    });
  }, [variable.name]);

  return (
    <div
      ref={ref}
      className="flex items-center justify-between px-3 py-1.5 rounded-md border
                 border-gray-200 bg-white cursor-grab hover:border-blue-400
                 hover:shadow-sm transition-all select-none"
    >
      <span className="text-sm font-medium text-gray-800 truncate">{variable.name}</span>
      <span className="ml-2 text-[10px] text-gray-400 uppercase tracking-wide">
        {variable.type}
      </span>
    </div>
  );
}
