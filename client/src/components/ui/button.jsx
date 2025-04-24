import React from "react";
import { cn } from "@/lib/utils";

const Button = React.forwardRef(
  (
    {
      children,
      className,
      variant = "primary",
      size = "default",
      isLoading = false,
      disabled = false,
      ...props
    },
    ref
  ) => {
    const baseStyles =
      "inline-flex items-center justify-center rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";

    const variants = {
      primary:
        "bg-[#C5D86D] text-black hover:bg-[#A4C639] focus:ring-[#C5D86D]",
      secondary:
        "bg-[#1D2D44] text-white hover:bg-[#3D5A80] focus:ring-[#1D2D44]",
      danger: "bg-red-500 text-white hover:bg-red-600 focus:ring-red-500",
      success:
        "bg-green-500 text-white hover:bg-green-600 focus:ring-green-500",
      outline:
        "border border-[#3D5A80] text-white hover:bg-[#1D2D44] focus:ring-[#3D5A80]",
      ghost: "text-white hover:bg-[#1D2D44] focus:ring-[#1D2D44]",
    };

    const sizes = {
      default: "px-4 py-2 text-sm",
      sm: "px-3 py-1.5 text-xs",
      lg: "px-6 py-3 text-base",
      icon: "p-2",
    };

    return (
      <button
        ref={ref}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading ? (
          <div className="flex items-center">
            <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-current mr-2" />
            Loading...
          </div>
        ) : (
          children
        )}
      </button>
    );
  }
);

Button.displayName = "Button";

export { Button };
