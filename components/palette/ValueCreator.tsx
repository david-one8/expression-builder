"use client";
import { useEffect, useRef, useState } from "react";
import { draggable } from "@atlaskit/pragmatic-drag-and-drop/element/adapter";

export function ValueCreator() {
  const [val, setVal] = useState<number>(0);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    return draggable({
      element: ref.current,
      getInitialData: () => ({
        kind: "value-node",
        node: { type: "value", value: val },
      }),
    });
  }, [val]);

  return (
    <div className="flex items-center gap-2">
      <input
        type="number"
        value={val}
        onChange={(e) => setVal(Number(e.target.value))}
        className="w-20 px-2 py-1.5 text-sm border border-gray-300 rounded-md
                   focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
      <div
        ref={ref}
        className="px-3 py-1.5 text-sm rounded-md border border-blue-400 text-blue-600
                   cursor-grab hover:bg-blue-50 transition-all select-none"
      >
        ⠿ Drag Value
      </div>
    </div>
  );
}
