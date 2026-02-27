export type FormulaType = "sum" | "subtract" | "multiply" | "divide" | "toWords";
export type TargetType  = "value" | "variable" | "calc";
export type VariableType = "int" | "float";

export interface Variable {
  name: string;
  type: VariableType;
  value: number;
}

export interface ValueNode    { type: "value";    value: number }
export interface VariableNode { type: "variable"; name: string  }
export interface CalcNode {
  type: "calc";
  formula: FormulaType;
  a: OperandNode;
  b: OperandNode;
}

export type OperandNode = ValueNode | VariableNode | CalcNode;

export interface FormulaRow {
  id: string;
  formula: FormulaType;
  targetType: TargetType;
  targetVariable: string;
  a: OperandNode | null;
  b: OperandNode | null;
}

export interface ExpressionSchema {
  variables: Variable[];
  formulas: FormulaRow[];
}

// Drag-and-drop data shapes
export type DragData =
  | { kind: "variable-node"; node: VariableNode }
  | { kind: "value-node";    node: ValueNode    }
  | { kind: "calc-node";     node: CalcNode     };
