import * as React from "react";

interface AspectRatioProps extends React.HTMLAttributes<HTMLDivElement> {
  ratio: number;
  children: React.ReactNode;
}

// AspectRatio Component
const AspectRatio: React.FC<AspectRatioProps> = React.forwardRef<
  HTMLDivElement,
  AspectRatioProps
>(({ ratio, children, className, ...props }, ref) => {
  return (
    <div ref={ref} className={`relative w-full ${className}`} {...props}>
      <div className="absolute inset-0">{children}</div>{" "}
    </div>
  );
});
AspectRatio.displayName = "AspectRatio";

export { AspectRatio };
