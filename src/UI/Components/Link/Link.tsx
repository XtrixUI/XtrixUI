import * as React from "react";
import { cfx } from "classifyx";
import { LuExternalLink } from "react-icons/lu";

interface LinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  variant?: "default" | "underline" | "external";
  customAnchor?: React.ReactElement<any>;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
  className?: string;
}

const Link = React.forwardRef<HTMLAnchorElement, LinkProps>(
  (
    {
      variant = "default",
      customAnchor,
      icon,
      iconPosition = "right",
      className,
      children,
      href,
      ...props
    },
    ref,
  ) => {
    const isExternal =
      variant === "external" || (href && /^https?:\/\//.test(href));
    const Icon = isExternal && !icon ? <LuExternalLink /> : icon;

    // Base styles
    const baseStyles = "inline-flex items-center gap-1 transition-colors";

    // Variant styles
    const variantStyles = {
      default: "text-primary hover:text-primary-700",
      underline: "text-primary hover:underline",
      external: "text-primary hover:text-primary-700",
    };

    // Handle custom anchor rendering
    if (customAnchor) {
      return React.cloneElement(customAnchor, {
        ...(customAnchor.props || {}),
        ref: typeof customAnchor.type === "string" ? undefined : ref,
        className: cfx(baseStyles, className),
        href,
        ...props,
      });
    }

    return (
      <a
        ref={ref}
        href={href}
        className={cfx(baseStyles, variantStyles[variant], className)}
        target={isExternal ? "_blank" : undefined}
        rel={isExternal ? "noopener noreferrer" : undefined}
        {...props}
      >
        {iconPosition === "left" && Icon && (
          <span className="mr-1">{Icon}</span>
        )}
        {children}
        {iconPosition === "right" && Icon && (
          <span className="ml-1">{Icon}</span>
        )}
      </a>
    );
  },
);

Link.displayName = "Link";

export { Link };
