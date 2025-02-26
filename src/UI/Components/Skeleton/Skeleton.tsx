import * as React from "react";
import { cfx } from "classifyx";

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "rounded" | "square" | "circle";
  baseColor?: string;
  highlightColor?: string;
}

const Skeleton: React.FC<SkeletonProps> = ({
  className,
  variant = "rounded",
  baseColor = "bg-gray-200",
  highlightColor = "bg-gray-100",
  ...props
}) => {
  const shapeClasses =
    variant === "circle"
      ? "rounded-full aspect-square"
      : variant === "square"
        ? "rounded-md"
        : "rounded-xl";

  return (
    <div
      className={cfx(
        "animate-pulse",
        baseColor,
        "dark:bg-gray-700", // Dark mode support
        shapeClasses,
        className,
      )}
      style={{
        backgroundImage: `linear-gradient(90deg, ${baseColor} 25%, ${highlightColor} 50%, ${baseColor} 75%)`,
        backgroundSize: "200% 100%",
        animation: "pulseAnimation 1.5s infinite linear",
      }}
      {...props}
    />
  );
};

export { Skeleton };
