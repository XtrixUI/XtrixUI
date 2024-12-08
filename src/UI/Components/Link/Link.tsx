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
      variant === "external" || (href && href.startsWith("http"));

    const Icon = isExternal && !icon ? <LuExternalLink /> : icon;

    if (customAnchor) {
      return React.cloneElement(customAnchor, {
        ...(customAnchor.props || {}),
        ref: typeof customAnchor.type === "string" ? undefined : ref,
        className: cfx("inline-flex items-center", className),
        href,
        ...props,
      });
    }

    return (
      <a
        ref={ref}
        href={href}
        className={cfx(
          "text-primary-600 inline-flex items-center gap-1 transition-colors",
          {
            "hover:underline": variant === "underline",
            "hover:text-primary-700": variant === "default",
          },
          className,
        )}
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
