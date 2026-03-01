"use client";
import { useExpressionStore } from "@/store/expressionStore";
import { FormulaRow } from "./FormulaRow";
import { Button } from "@/components/ui/Button";

export function ExpressionBuilder() {
  const formulas  = useExpressionStore((s) => s.schema.formulas);
  const addFormula = useExpressionStore((s) => s.addFormula);

  return (
    <div className="flex flex-col gap-3">
      {formulas.length === 0 && (
        <div className="text-center py-16 text-gray-400 border-2 border-dashed border-gray-200 rounded-xl">
          No formulas yet. Click <strong>"+ Add Formula"</strong> to start.
        </div>
      )}
      {formulas.map((row) => <FormulaRow key={row.id} row={row} />)}
      <Button variant="primary" onClick={addFormula} className="self-start">
        + Add Formula
      </Button>
    </div>
  );
}
