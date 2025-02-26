import * as React from "react";
import { cfx } from "classifyx";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link"; // Define variants
  size?: "default" | "sm" | "md" | "lg" | "xl" | "icon"; // Define sizes
  asChild?: boolean; // For rendering as a different component
}

// Button Component
const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "default",
      size = "default",
      asChild = false,
      ...props
    },
    ref,
  ) => {
    const Component = asChild ? "span" : "button"; // Use span if asChild is true, otherwise use button

    // Base styles
    const baseStyles =
      "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50";

    // Variants configuration
    const variantsConfig = {
      variants: {
        variant: {
          default: "bg-primary text-primary-foreground hover:bg-primary/90",
          destructive:
            "bg-destructive text-destructive-foreground hover:bg-destructive/90",
          outline:
            "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
          secondary:
            "bg-secondary text-secondary-foreground hover:bg-secondary/80",
          ghost: "hover:bg-accent hover:text-accent-foreground",
          link: "text-primary underline-offset-4 hover:underline",
        },
        size: {
          default: "h-10 px-4 py-2",
          sm: "h-8 px-3 py-1.5 text-sm",
          md: "h-10 px-5 py-2",
          lg: "h-12 px-6 py-3 text-lg",
          xl: "h-14 px-8 py-4 text-xl",
          icon: "h-10 w-10 p-2",
        },
      },
      defaultVariants: {
        variant: "default",
        size: "default",
      },
    };

    // Construct the final class name using cfx with variants
    const buttonClass = cfx(
      baseStyles,
      variantsConfig,
      { variant, size },
      className,
    );

    return <Component ref={ref} className={buttonClass} {...props} />;
  },
);
Button.displayName = "Button";

export { Button };
