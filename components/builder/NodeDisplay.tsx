"use client";
import { useEffect, useRef } from "react";
import { draggable } from "@atlaskit/pragmatic-drag-and-drop/element/adapter";
import { FORMULA_SYMBOL } from "@/constants/defaults";
import type { OperandNode } from "@/types/expression";

interface Props {
  node: OperandNode;
  formulaId: string;
  path: string;
  onClear: () => void;
}

export function NodeDisplay({ node, formulaId, path, onClear }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  // Placed nodes are also draggable — so they can be re-dropped elsewhere
  useEffect(() => {
    if (!ref.current) return;
    return draggable({
      element: ref.current,
      getInitialData: () => ({
        kind: node.type === "calc" ? "calc-node" : node.type === "variable"
          ? "variable-node" : "value-node",
        node,
      }),
    });
  }, [node]);

  if (node.type === "value") {
    return (
      <div ref={ref} className="flex items-center gap-1.5 px-2 py-1 bg-amber-50
           border border-amber-300 rounded-md text-sm cursor-grab select-none">
        <span>{node.value}</span>
        <button onClick={onClear} className="text-gray-400 hover:text-red-500 text-xs">✕</button>
      </div>
    );
  }

  if (node.type === "variable") {
    return (
      <div ref={ref} className="flex items-center gap-1.5 px-2 py-1 bg-blue-50
           border border-blue-300 rounded-md text-sm cursor-grab select-none">
        <span className="font-medium text-blue-700">{node.name}</span>
        <button onClick={onClear} className="text-gray-400 hover:text-red-500 text-xs">✕</button>
      </div>
    );
  }

  // CalcNode — nested formula display
  return (
    <div ref={ref} className="flex items-center gap-1 px-2 py-1 bg-purple-50
         border border-purple-300 rounded-md text-xs cursor-grab select-none">
      <span className="font-bold text-purple-700">{FORMULA_SYMBOL[node.formula]}</span>
      <span className="text-gray-500">(</span>
      <span className="text-purple-600 truncate max-w-[60px]">
        {node.a.type === "variable" ? node.a.name
          : node.a.type === "value" ? node.a.value : "calc"}
      </span>
      <span className="text-gray-400">,</span>
      <span className="text-purple-600 truncate max-w-[60px]">
        {node.b.type === "variable" ? node.b.name
          : node.b.type === "value" ? node.b.value : "calc"}
      </span>
      <span className="text-gray-500">)</span>
      <button onClick={onClear} className="text-gray-400 hover:text-red-500 ml-1">✕</button>
    </div>
  );
}
