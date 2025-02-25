import * as React from "react";
import { cfx } from "classifyx";

// Badge Component
const Badge = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    variant?: "default" | "secondary" | "destructive" | "outline";
  }
>(({ className, variant = "default", ...props }, ref) => {
  // Base styles
  const baseStyles =
    "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2";

  // Variant styles (structured similar to Alert)
  const variantStyles = {
    default:
      "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
    secondary:
      "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
    destructive:
      "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
    outline: "text-foreground border border-border",
  };

  // Construct the final class name
  const badgeClass = cfx(baseStyles, variantStyles[variant], className);

  return <div ref={ref} className={badgeClass} {...props} />;
});
Badge.displayName = "Badge";

export { Badge };
