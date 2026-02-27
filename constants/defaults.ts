import type { Variable, FormulaType, TargetType } from "@/types/expression";

export const DEFAULT_VARIABLES: Variable[] = [
  { name: "Contract Duration Years",  type: "int",   value: 0 },
  { name: "Contract Duration Months", type: "int",   value: 0 },
  { name: "Contract Duration Days",   type: "int",   value: 0 },
  { name: "Number of Vendors",        type: "int",   value: 0 },
];

export const FORMULA_OPTIONS: { label: string; value: FormulaType }[] = [
  { label: "Sum",      value: "sum"      },
  { label: "Subtract", value: "subtract" },
  { label: "Multiply", value: "multiply" },
  { label: "Divide",   value: "divide"   },
  { label: "To Words", value: "toWords"  },
];

export const TARGET_TYPE_OPTIONS: { label: string; value: TargetType }[] = [
  { label: "Value",    value: "value"    },
  { label: "Variable", value: "variable" },
  { label: "Calc",     value: "calc"     },
];

export const FORMULA_SYMBOL: Record<string, string> = {
  sum:      "+",
  subtract: "−",
  multiply: "×",
  divide:   "÷",
  toWords:  "→",
};
