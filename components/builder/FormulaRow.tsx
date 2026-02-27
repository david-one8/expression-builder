"use client";
import { FORMULA_OPTIONS, TARGET_TYPE_OPTIONS, FORMULA_SYMBOL } from "@/constants/defaults";
import { useExpressionStore } from "@/store/expressionStore";
import { OperandSlot } from "./OperandSlot";
import { Select } from "@/components/ui/Select";
import { Button } from "@/components/ui/Button";
import type { FormulaRow as FormulaRowType } from "@/types/expression";

export function FormulaRow({ row }: { row: FormulaRowType }) {
  const { updateFormulaField, removeFormula, duplicateFormula, schema } =
    useExpressionStore((s) => ({
      updateFormulaField: s.updateFormulaField,
      removeFormula: s.removeFormula,
      duplicateFormula: s.duplicateFormula,
      schema: s.schema,
    }));

  const variableOptions = schema.variables.map((v) => ({ label: v.name, value: v.name }));

  return (
    <div className="rounded-xl border border-gray-200 bg-white shadow-sm p-4 flex flex-col gap-3">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold bg-gray-800 text-white px-2 py-0.5 rounded-md">
            Formula
          </span>
          <code className="text-[10px] text-gray-400">#{row.id}</code>
        </div>
        <div className="flex items-center gap-2">
          <Button size="sm" variant="ghost" onClick={() => duplicateFormula(row.id)}>
            Duplicate
          </Button>
          <Button size="sm" variant="danger" onClick={() => removeFormula(row.id)}>
            Remove
          </Button>
        </div>
      </div>

      {/* Selectors Row */}
      <div className="flex flex-wrap items-end gap-3">
        <Select
          label="Formula"
          value={row.formula}
          options={FORMULA_OPTIONS}
          onChange={(e) => updateFormulaField(row.id, "formula", e.target.value as FormulaRowType["formula"])}
        />
        <Select
          label="Target Type"
          value={row.targetType}
          options={TARGET_TYPE_OPTIONS}
          onChange={(e) => updateFormulaField(row.id, "targetType", e.target.value as FormulaRowType["targetType"])}
        />
        {row.targetType === "variable" && (
          <Select
            label="Target Variable"
            value={row.targetVariable}
            options={variableOptions}
            onChange={(e) => updateFormulaField(row.id, "targetVariable", e.target.value)}
          />
        )}
      </div>

      {/* Operand Slots */}
      <div className="flex items-center gap-3 flex-wrap">
        <OperandSlot formulaId={row.id} path="a" node={row.a} label="A" />
        <span className="text-2xl font-bold text-gray-400 mt-4">
          {FORMULA_SYMBOL[row.formula] ?? "?"}
        </span>
        <OperandSlot formulaId={row.id} path="b" node={row.b} label="B" />
        <span className="text-gray-400 mt-4 text-sm font-medium">
          → {row.targetVariable || "result"}
        </span>
      </div>
    </div>
  );
}
