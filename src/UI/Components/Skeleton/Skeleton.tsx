import { cfx } from "classifyx";
import React from "react";
function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cfx("animate-pulse rounded-md bg-gray-200/50", className)}
      {...props}
    />
  );
}

export { Skeleton };
