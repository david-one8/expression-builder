import { cn } from "@/lib/utils";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "blue" | "amber" | "purple" | "green" | "gray";
  className?: string;
}

export function Badge({ children, variant = "gray", className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wide border",
        variant === "blue"   && "bg-blue-50   text-blue-700   border-blue-200",
        variant === "amber"  && "bg-amber-50  text-amber-700  border-amber-200",
        variant === "purple" && "bg-purple-50 text-purple-700 border-purple-200",
        variant === "green"  && "bg-emerald-50 text-emerald-700 border-emerald-200",
        variant === "gray"   && "bg-gray-100  text-gray-600   border-gray-200",
        className
      )}
    >
      {children}
    </span>
  );
}
