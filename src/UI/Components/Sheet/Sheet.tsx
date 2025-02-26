import * as React from "react";
import { LuX } from "react-icons/lu";
import { cfx } from "classifyx";

interface SheetContextType {
  isOpen: boolean;
  open: () => void;
  close: () => void;
}

const SheetContext = React.createContext<SheetContextType | null>(null);

const useSheet = () => {
  const context = React.useContext(SheetContext);
  if (!context) {
    throw new Error("useSheet must be used within a SheetProvider");
  }
  return context;
};

// 🟢 SheetProvider manages state
const SheetProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isOpen, setIsOpen] = React.useState(false);

  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);

  return (
    <SheetContext.Provider value={{ isOpen, open, close }}>
      {children}
    </SheetContext.Provider>
  );
};

// 🟢 Root Sheet component (Controls visibility)
const Sheet: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isOpen } = useSheet();
  return isOpen ? <div className="fixed inset-0 z-50">{children}</div> : null;
};

// 🟢 Sheet Trigger (Opens the sheet)
const SheetTrigger: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement>> = ({
  children,
  className,
  ...props
}) => {
  const { open } = useSheet();
  return (
    <button
      onClick={open}
      className={cfx("cursor-pointer", className)}
      {...props}
    >
      {children}
    </button>
  );
};

// 🟢 Sheet Close (Closes the sheet)
const SheetClose: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement>> = ({
  className,
  ...props
}) => {
  const { close } = useSheet();
  return (
    <button
      onClick={close}
      className={cfx(
        "absolute right-4 top-4 rounded-lg border p-1 hover:bg-gray-100 dark:hover:bg-gray-800",
        className,
      )}
      {...props}
    >
      <LuX className="h-5 w-5" />
      <span className="sr-only">Close</span>
    </button>
  );
};

// 🟢 Sheet Overlay (Closes when clicked)
const SheetOverlay = React.forwardRef<
  HTMLDivElement,
  { className?: string; children?: React.ReactNode }
>(({ className, children }, ref) => {
  const { close } = useSheet();

  return (
    <div
      ref={ref}
      className={cfx(
        "fixed inset-0 z-40 bg-black/50 backdrop-blur-sm transition-opacity",
        className,
      )}
      onClick={close} // Close when clicking the overlay
    >
      {children}
    </div>
  );
});
SheetOverlay.displayName = "SheetOverlay";

// 🟢 Sheet Variants (Improved animations)
const sheetVariants = {
  top: "inset-x-0 top-0 border-b translate-y-[-100%] animate-slideInDown",
  bottom: "inset-x-0 bottom-0 border-t translate-y-[100%] animate-slideInUp",
  left: "inset-y-0 left-0 h-full w-3/4 border-r translate-x-[-100%] sm:max-w-sm animate-slideInLeft",
  right:
    "inset-y-0 right-0 h-full w-3/4 border-l translate-x-[100%] sm:max-w-sm animate-slideInRight",
};

// 🟢 Sheet Content (Improved animations & accessibility)
const SheetContent = React.forwardRef<
  HTMLDivElement,
  {
    variant?: "top" | "bottom" | "left" | "right";
    className?: string;
    children?: React.ReactNode;
  }
>(({ variant = "right", className, children, ...props }, ref) => {
  const { isOpen } = useSheet();

  return (
    <div
      ref={ref}
      role="dialog"
      aria-modal="true"
      className={cfx(
        "fixed z-50 p-6 bg-white shadow-lg dark:bg-[#1a1a1a] rounded-lg transition-transform duration-300",
        sheetVariants[variant],
        isOpen ? "translate-x-0 translate-y-0" : "",
        className,
      )}
      {...props}
    >
      {children}
      <SheetClose />
    </div>
  );
});
SheetContent.displayName = "SheetContent";

// 🟢 Sheet Header
const SheetHeader: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  className,
  ...props
}) => (
  <div
    className={cfx(
      "flex flex-col space-y-2 text-center sm:text-left",
      className,
    )}
    {...props}
  />
);

// 🟢 Sheet Footer
const SheetFooter: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  className,
  ...props
}) => (
  <div
    className={cfx(
      "flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2",
      className,
    )}
    {...props}
  />
);

// 🟢 Sheet Title
const SheetTitle: React.FC<React.HTMLAttributes<HTMLHeadingElement>> = ({
  className,
  ...props
}) => <h2 className={cfx("text-lg font-semibold", className)} {...props} />;

// 🟢 Sheet Description
const SheetDescription: React.FC<
  React.HTMLAttributes<HTMLParagraphElement>
> = ({ className, ...props }) => (
  <p className={cfx("text-sm text-muted-foreground", className)} {...props} />
);

export {
  SheetProvider,
  SheetOverlay,
  Sheet,
  SheetTrigger,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetFooter,
  SheetTitle,
  SheetDescription,
};
