import * as React from "react";
import { cfx } from "classifyx";

interface SpotlightHoverProps {
  children: React.ReactNode;
  size?: number; // Spotlight size
  color?: string; // Spotlight color
}

const SpotlightHover = React.forwardRef<HTMLDivElement, SpotlightHoverProps>(
  ({ children, size = 600, color = "rgba(255, 182, 255, 0.15)" }, ref) => {
    const divRef = React.useRef<HTMLDivElement>(null);
    const [position, setPosition] = React.useState({ x: 0, y: 0 });
    const [opacity, setOpacity] = React.useState(0);

    // Throttle mouse movement updates to improve performance
    const handleMouseMove = React.useCallback(
      (e: React.MouseEvent<HTMLDivElement>) => {
        if (!divRef.current) return;
        const rect = divRef.current.getBoundingClientRect();
        setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
      },
      [],
    );

    return (
      <div
        ref={ref || divRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setOpacity(1)}
        onMouseLeave={() => setOpacity(0)}
        className={cfx(
          "relative size-full overflow-hidden rounded-xl",
          "flex items-center justify-center",
        )}
      >
        {/* Spotlight Effect */}
        <div
          className="pointer-events-none absolute inset-0 transition-opacity duration-300"
          style={{
            opacity,
            background: `radial-gradient(${size}px circle at ${position.x}px ${position.y}px, ${color}, transparent 40%)`,
          }}
        />

        {/* Content */}
        <div className="relative z-10">{children}</div>
      </div>
    );
  },
);

SpotlightHover.displayName = "SpotlightHover";

export default SpotlightHover;
