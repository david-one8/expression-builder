"use client";
import { useState } from "react";
import { useExpressionStore } from "@/store/expressionStore";
import { VariableChip } from "./VariableChip";
import { ValueCreator } from "./ValueCreator";
import { Button } from "@/components/ui/Button";

export function VariablePalette() {
  // ✅ All single-value selectors
  const variables          = useExpressionStore((s) => s.schema.variables);
  const updateVariableValue = useExpressionStore((s) => s.updateVariableValue);
  const addVariable        = useExpressionStore((s) => s.addVariable);

  const [newName,  setNewName]  = useState("");
  const [newType,  setNewType]  = useState<"int" | "float">("int");
  const [newValue, setNewValue] = useState(0);
  const [showAdd,  setShowAdd]  = useState(false);

  const handleAdd = () => {
    if (!newName.trim()) return;
    addVariable({ name: newName.trim(), type: newType, value: newValue });
    setNewName(""); setNewValue(0); setShowAdd(false);
  };

  return (
    <aside className="w-65 shrink-0 flex flex-col gap-4 p-4 border-r border-gray-200 bg-gray-50 min-h-screen">
      <div>
        <h3 className="text-xs font-semibold uppercase tracking-widest text-gray-500 mb-2">Variables</h3>
        <div className="flex flex-col gap-2">
          {variables.map((v) => (
            <div key={v.name} className="flex flex-col gap-1">
              <VariableChip variable={v} />
              <input
                type="number"
                value={v.value}
                onChange={(e) => updateVariableValue(v.name, Number(e.target.value))}
                placeholder="value"
                className="px-2 py-1 text-xs border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-400"
              />
            </div>
          ))}
        </div>
        <Button size="sm" variant="ghost" className="mt-2 w-full" onClick={() => setShowAdd(!showAdd)}>
          + Add Variable
        </Button>
        {showAdd && (
          <div className="mt-2 flex flex-col gap-1">
            <input
              placeholder="Variable name"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              className="px-2 py-1 text-xs border border-gray-300 rounded-md"
            />
            <select
              value={newType}
              onChange={(e) => setNewType(e.target.value as "int" | "float")}
              className="px-2 py-1 text-xs border border-gray-300 rounded-md"
            >
              <option value="int">int</option>
              <option value="float">float</option>
            </select>
            <input
              type="number"
              placeholder="default value"
              value={newValue}
              onChange={(e) => setNewValue(Number(e.target.value))}
              className="px-2 py-1 text-xs border border-gray-300 rounded-md"
            />
            <Button size="sm" variant="primary" onClick={handleAdd}>Add</Button>
          </div>
        )}
      </div>
      <div>
        <h3 className="text-xs font-semibold uppercase tracking-widest text-gray-500 mb-2">Literal Value</h3>
        <ValueCreator />
      </div>
    </aside>
  );
}
