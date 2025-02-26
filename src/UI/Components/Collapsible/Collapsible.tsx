import * as React from "react";
import { cfx } from "classifyx";

interface CollapsibleProps extends React.HTMLAttributes<HTMLDivElement> {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  children: React.ReactNode;
}

const Collapsible = React.forwardRef<HTMLDivElement, CollapsibleProps>(
  ({ open = false, onOpenChange, children, className, ...props }, ref) => {
    const [isOpen, setIsOpen] = React.useState(open);

    const toggleOpen = () => {
      setIsOpen((prev) => {
        const newState = !prev;
        onOpenChange?.(newState);
        return newState;
      });
    };

    React.useEffect(() => setIsOpen(open), [open]);

    return (
      <div ref={ref} className={cfx("w-full", className)} {...props}>
        {React.Children.map(children, (child) => {
          if (React.isValidElement(child)) {
            if (child.type === CollapsibleTrigger) {
              return React.cloneElement(
                child as React.ReactElement<CollapsibleTriggerProps>,
                {
                  isOpen,
                  toggleOpen,
                },
              );
            }
            if (child.type === CollapsibleContent) {
              return React.cloneElement(
                child as React.ReactElement<CollapsibleContentProps>,
                {
                  isOpen,
                },
              );
            }
          }
          return child;
        })}
      </div>
    );
  },
);
Collapsible.displayName = "Collapsible";

interface CollapsibleTriggerProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isOpen?: boolean;
  toggleOpen?: () => void;
}

const CollapsibleTrigger = React.forwardRef<
  HTMLButtonElement,
  CollapsibleTriggerProps
>(({ isOpen, toggleOpen, className, children, ...props }, ref) => (
  <button
    ref={ref}
    onClick={toggleOpen}
    className={cfx(
      "flex items-center justify-between w-full p-2 text-left font-medium",
      className,
    )}
    aria-expanded={isOpen}
    {...props}
  >
    {children}
    <span>{isOpen ? "▼" : "▶"}</span> {/* Simple visual indicator */}
  </button>
));
CollapsibleTrigger.displayName = "CollapsibleTrigger";

interface CollapsibleContentProps extends React.HTMLAttributes<HTMLDivElement> {
  isOpen?: boolean;
}

const CollapsibleContent = React.forwardRef<
  HTMLDivElement,
  CollapsibleContentProps
>(({ isOpen = false, className, children, ...props }, ref) => {
  const contentRef = React.useRef<HTMLDivElement>(null);
  const [height, setHeight] = React.useState<number | null>(null);

  // Measure the content height for smooth transitions
  React.useEffect(() => {
    if (contentRef.current) {
      setHeight(isOpen ? contentRef.current.scrollHeight : 0);
    }
  }, [isOpen]);

  return (
    <div
      ref={ref}
      className={cfx(
        "overflow-hidden transition-all duration-300 ease-in-out",
        className,
      )}
      style={{ maxHeight: isOpen ? `${height}px` : "0px" }}
      aria-hidden={!isOpen}
      {...props}
    >
      <div ref={contentRef} className="p-2">
        {children}
      </div>
    </div>
  );
});
CollapsibleContent.displayName = "CollapsibleContent";

export { Collapsible, CollapsibleTrigger, CollapsibleContent };
