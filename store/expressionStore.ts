import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { current } from "immer";
import { nanoid } from "nanoid";
import { DEFAULT_VARIABLES } from "@/constants/defaults";
import type { ExpressionSchema, FormulaRow, OperandNode, Variable } from "@/types/expression";

interface ExpressionStore {
  schema: ExpressionSchema;
  addFormula: () => void;
  removeFormula: (id: string) => void;
  duplicateFormula: (id: string) => void;
  updateFormulaField: <K extends keyof FormulaRow>(id: string, field: K, value: FormulaRow[K]) => void;
  setOperand: (formulaId: string, path: string, node: OperandNode) => void;
  clearOperand: (formulaId: string, path: string) => void;
  updateVariableValue: (name: string, value: number) => void;
  addVariable: (variable: Variable) => void;
  reset: () => void;
}

const blankRow = (): FormulaRow => ({
  id: nanoid(12),
  formula: "sum",
  targetType: "variable",
  targetVariable: "",
  a: null,
  b: null,
});

export const useExpressionStore = create<ExpressionStore>()(
  immer((set) => ({
    schema: {
      variables: DEFAULT_VARIABLES,
      formulas: [],
    },

    addFormula: () =>
      set((s) => { s.schema.formulas.push(blankRow()); }),

    removeFormula: (id) =>
      set((s) => {
        s.schema.formulas = s.schema.formulas.filter((f) => f.id !== id);
      }),

    duplicateFormula: (id) =>
      set((s) => {
        const row = s.schema.formulas.find((f) => f.id === id);
        if (row) {
          const plain = current(row);
          s.schema.formulas.push({ ...plain, id: nanoid(12) });
        }
      }),

    updateFormulaField: (id, field, value) =>
      set((s) => {
        const row = s.schema.formulas.find((f) => f.id === id);
        if (row) (row as Record<string, unknown>)[field] = value;
      }),

    setOperand: (formulaId, path, node) =>
      set((s) => {
        const row = s.schema.formulas.find((f) => f.id === formulaId);
        if (row) {
          const parts = path.split(".");
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          let cursor: any = row;
          for (let i = 0; i < parts.length - 1; i++) cursor = cursor[parts[i]];
          cursor[parts[parts.length - 1]] = node;
        }
      }),

    clearOperand: (formulaId, path) =>
      set((s) => {
        const row = s.schema.formulas.find((f) => f.id === formulaId);
        if (row) {
          const parts = path.split(".");
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          let cursor: any = row;
          for (let i = 0; i < parts.length - 1; i++) cursor = cursor[parts[i]];
          cursor[parts[parts.length - 1]] = null;
        }
      }),

    updateVariableValue: (name, value) =>
      set((s) => {
        const v = s.schema.variables.find((v: Variable) => v.name === name);
        if (v) v.value = value;
      }),

    addVariable: (variable) =>
      set((s) => { s.schema.variables.push(variable); }),

    reset: () =>
      set((s) => {
        s.schema.formulas = [];
        s.schema.variables = DEFAULT_VARIABLES;
      }),
  }))
);
