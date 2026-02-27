import type { OperandNode, ExpressionSchema } from "@/types/expression";
import { numberToWords } from "@/lib/utils";

function evalNode(node: OperandNode, vars: Record<string, number>): number {
  switch (node.type) {
    case "value":
      return node.value;
    case "variable": {
      if (!(node.name in vars)) throw new Error(`Unknown variable: "${node.name}"`);
      return vars[node.name];
    }
    case "calc": {
      const a = evalNode(node.a, vars);
      const b = evalNode(node.b, vars);
      switch (node.formula) {
        case "sum":      return a + b;
        case "subtract": return a - b;
        case "multiply": return a * b;
        case "divide":
          if (b === 0) throw new Error("Division by zero");
          return a / b;
        case "toWords":  return a; // result rendered as words in display
        default: throw new Error(`Unknown formula: ${node.formula}`);
      }
    }
  }
}

export type CompileResult = Record<string, number | string>;

export function compileSchema(schema: ExpressionSchema): CompileResult {
  const varMap: Record<string, number> = Object.fromEntries(
    schema.variables.map((v) => [v.name, v.value])
  );
  const results: CompileResult = {};

  for (const row of schema.formulas) {
    if (!row.a || !row.b) continue;

    const result = evalNode(
      { type: "calc", formula: row.formula, a: row.a, b: row.b },
      varMap
    );

    const key = row.targetVariable || row.id;

    // Chain: write result back so later formulas can reference it
    if (row.targetVariable) varMap[row.targetVariable] = result;

    results[key] = row.formula === "toWords" ? numberToWords(result) : result;
  }

  return results;
}
