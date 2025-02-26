import * as React from "react";
import { cfx } from "classifyx";

interface SeparatorProps extends React.HTMLAttributes<HTMLDivElement> {
  orientation?: "horizontal" | "vertical";
  decorative?: boolean;
  variant?: "solid" | "dashed" | "dotted";
  thickness?: string;
  color?: string;
}

// Variant classes (solid, dashed, dotted)
const variantClasses = {
  solid: "border-solid",
  dashed: "border-dashed",
  dotted: "border-dotted",
};

const Separator = React.forwardRef<HTMLDivElement, SeparatorProps>(
  (
    {
      className,
      orientation = "horizontal",
      decorative = true,
      variant = "solid",
      thickness = "1px",
      color = "border", // Default to Tailwind's border color, customizable
      ...props
    },
    ref,
  ) => {
    const isHorizontal = orientation === "horizontal";
    const orientationClasses = isHorizontal
      ? "w-full h-0 border-t"
      : "h-full w-0 border-l";

    return (
      <div
        ref={ref}
        role={decorative ? undefined : "separator"}
        aria-orientation={decorative ? undefined : orientation}
        className={cfx(
          "shrink-0",
          orientationClasses,
          variantClasses[variant], // Apply variant styles
          className,
        )}
        style={{
          borderWidth: thickness,
          borderColor: color, // Supports Tailwind & custom colors
        }}
        {...props}
      />
    );
  },
);

Separator.displayName = "Separator";

export { Separator };
