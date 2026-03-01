"use client";
import { useState } from "react";
import { useShallow } from "zustand/react/shallow";
import { VariablePalette } from "@/components/palette/VariablePalette";
import { ExpressionBuilder } from "@/components/builder/ExpressionBuilder";
import { JsonPreview } from "@/components/output/JsonPreview";
import { ResultPanel } from "@/components/output/ResultPanel";
import { Button } from "@/components/ui/Button";
import { useExpressionStore } from "@/store/expressionStore";
import { compileSchema, type CompileResult } from "@/compiler/evaluate";

export default function Home() {
  const schema = useExpressionStore((s) => s.schema);
  const reset  = useExpressionStore((s) => s.reset);

  const [results, setResults] = useState<CompileResult | null>(null);
  const [error, setError]     = useState<string | null>(null);

  const handleCompile = () => {
    try {
      setError(null);
      setResults(compileSchema(schema));
    } catch (e) {
      setError((e as Error).message);
      setResults(null);
    }
  };

  return (
    <div className="flex min-h-screen bg-white">
      <VariablePalette />
      <main className="flex-1 flex flex-col gap-4 p-6 overflow-auto">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold text-gray-900">Expression Builder</h1>
          <div className="flex gap-2">
            <Button variant="success" onClick={handleCompile}>▶ Compile</Button>
            <Button variant="ghost"   onClick={reset}>↺ Reset</Button>
          </div>
        </div>
        <ExpressionBuilder />
        {error && (
          <div className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-4 py-2">
            ⚠ {error}
          </div>
        )}
        {results && <ResultPanel results={results} />}
        <JsonPreview />
      </main>
    </div>
  );
}
