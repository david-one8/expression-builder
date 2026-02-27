"use client";
import { useEffect, useRef, useState } from "react";
import { dropTargetForElements } from "@atlaskit/pragmatic-drag-and-drop/element/adapter";
import { cn } from "@/lib/utils";
import { NodeDisplay } from "./NodeDisplay";
import { useExpressionStore } from "@/store/expressionStore";
import type { DragData, OperandNode } from "@/types/expression";

interface Props {
  formulaId: string;
  path: string;       // "a" | "b" | "a.a" | "b.b.a" etc.
  node: OperandNode | null;
  label: string;      // "A" or "B"
}

export function OperandSlot({ formulaId, path, node, label }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [dragOver, setDragOver] = useState(false);
  const { setOperand, clearOperand } = useExpressionStore((s) => ({
    setOperand: s.setOperand,
    clearOperand: s.clearOperand,
  }));

  useEffect(() => {
    if (!ref.current) return;
    return dropTargetForElements({
      element: ref.current,
      onDragEnter: () => setDragOver(true),
      onDragLeave: () => setDragOver(false),
      onDrop: ({ source }) => {
        setDragOver(false);
        const data = source.data as DragData;
        if (["variable-node", "value-node", "calc-node"].includes(data.kind)) {
          setOperand(formulaId, path, data.node);
        }
      },
    });
  }, [formulaId, path, setOperand]);

  return (
    <div className="flex flex-col gap-1">
      <span className="text-[10px] text-gray-400 font-semibold uppercase">{label}</span>
      <div
        ref={ref}
        className={cn(
          "min-w-[140px] min-h-[38px] flex items-center px-2 py-1 rounded-md border-2",
          "transition-all duration-150",
          dragOver
            ? "border-blue-500 bg-blue-50 shadow-md scale-105"
            : "border-dashed border-gray-300 bg-[#FAFAF5]",
          !node && "justify-center"
        )}
      >
        {node ? (
          <NodeDisplay
            node={node}
            formulaId={formulaId}
            path={path}
            onClear={() => clearOperand(formulaId, path)}
          />
        ) : (
          <span className="text-xs text-gray-400 select-none">Drop here</span>
        )}
      </div>
    </div>
  );
}
