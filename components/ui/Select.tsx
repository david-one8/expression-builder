import { cn } from "@/lib/utils";
import { SelectHTMLAttributes } from "react";

interface Props extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  options: { label: string; value: string }[];
}

export function Select({ label, options, className, ...props }: Props) {
  return (
    <div className="flex flex-col gap-1">
      {label && <span className="text-[11px] text-gray-500 font-medium">{label}</span>}
      <select
        {...props}
        className={cn(
          "px-3 py-2 rounded-md border border-gray-300 bg-[#FAFAF5] text-sm",
          "focus:outline-none focus:ring-2 focus:ring-blue-400",
          className
        )}
      >
        <option value="">Select {label?.toLowerCase()}</option>
        {options.map((o) => (
          <option key={o.value} value={o.value}>{o.label}</option>
        ))}
      </select>
    </div>
  );
}
