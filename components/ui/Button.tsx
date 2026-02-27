import { cn } from "@/lib/utils";
import { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "success" | "danger" | "ghost";
  size?: "sm" | "md";
}

export function Button({ variant = "ghost", size = "md", className, ...props }: ButtonProps) {
  return (
    <button
      {...props}
      className={cn(
        "rounded-md font-medium transition-all cursor-pointer disabled:opacity-50",
        size === "sm" ? "px-3 py-1 text-xs" : "px-4 py-2 text-sm",
        variant === "primary" && "bg-blue-600 text-white hover:bg-blue-700",
        variant === "success" && "bg-emerald-600 text-white hover:bg-emerald-700",
        variant === "danger"  && "bg-red-500 text-white hover:bg-red-600",
        variant === "ghost"   && "border border-gray-300 hover:bg-gray-100 text-gray-700",
        className
      )}
    />
  );
}
