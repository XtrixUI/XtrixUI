import * as React from "react";
import { cfx } from "classifyx";
import { LuStar as StarIcon } from "react-icons/lu";

interface StarWrapperProps {
  value?: number;
  setValue?: React.Dispatch<React.SetStateAction<number>>;
  numStars?: number;
  icon?: React.ComponentType<any>;
  disabled?: boolean;
  wrapperProps?: React.HTMLAttributes<HTMLDivElement>;
  iconProps?: React.HTMLAttributes<SVGSVGElement>;
  showcase?: boolean;
}

function Rating({
  numStars = 5,
  icon,
  setValue,
  value,
  disabled,
  showcase,
  iconProps = {},
  wrapperProps = {},
}: StarWrapperProps) {
  const { className: wrapperClassName, ...restWrapperProps } = wrapperProps;
  const { className: iconClassName, ...restIconProps } = iconProps;
  const IconComponent = icon || StarIcon; // Default to StarIcon if no icon is provided

  return (
    <div
      className={cfx("flex items-center gap-1", wrapperClassName)}
      {...restWrapperProps}
    >
      {Array.from({ length: numStars }, (_, i) => {
        const isRated = i < value!;
        const styledIconProps = {
          onMouseEnter: () => !showcase && !disabled && setValue!(i + 1),
          className: cfx(
            "fill-primary stroke-primary size-5",
            {
              "opacity-50 pointer-events-none": disabled,
              "transition-transform duration-300 hover:scale-110":
                !disabled && !showcase,
              "!fill-muted !stroke-muted": !isRated,
            },
            iconClassName,
          ),
          ...restIconProps,
        };
        return (
          <div key={i}>
            <IconComponent {...styledIconProps} />
          </div>
        );
      })}
    </div>
  );
}

export { Rating };
