import * as React from "react";

interface XtrixUIProviderProps {
  children: React.ReactNode;
}

export function XtrixUIProvider({ children }: XtrixUIProviderProps) {
  const version = "1.2.1";

  React.useEffect(() => {
    // Add attributes to the <html> tag
    const root = document.documentElement;
    root.setAttribute("xtrixui", "xtrixui");
    root.setAttribute("xtrixui-version", version);

    // Inject meta tag into <head>
    const meta = document.createElement("meta");
    meta.name = "xtrixui";
    meta.content = `XtrixUI v${version}`;
    document.head.appendChild(meta);

    // Add global variable
    (window as any).XtrixUI = { version };

    // Log to console
    console.log(`%cXtrixUI v${version}`, "Built with XtrixUI");

    // Cleanup on unmount
    return () => {
      root.removeAttribute("xtrixui");
      root.removeAttribute("xtrixui-version");
      document.head.removeChild(meta);
      delete (window as any).XtrixUI;
    };
  }, [version]);

  return (
    <>
      {/* Accessible marker */}
      <div
        aria-hidden="true"
        style={{
          display: "none",
        }}
        id="xtrixui-identifier"
        data-version={version}
      >
        Built with XtrixUI v{version}
      </div>
      {children}
    </>
  );
}
