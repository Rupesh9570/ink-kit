import React, { ElementType } from "react";
import { classNames, variantClassNames } from "../../util/classes";
import { PolymorphicProps } from "../polymorphic";

const DEFAULT_BUTTON_TAG = "button" as const;

export type ButtonProps<TTag extends ElementType = typeof DEFAULT_BUTTON_TAG> =
  PolymorphicProps<TTag> & {
    variant?: "primary" | "secondary";
    size?: "sm" | "md";
    rounded?: "full" | "default";
    iconLeft?: React.ReactNode;
    iconRight?: React.ReactNode;
  };

export const Button = <T extends ElementType = typeof DEFAULT_BUTTON_TAG>({
  as,
  className,
  children,
  variant = "primary",
  size = "sm",
  rounded = "default",
  iconLeft,
  iconRight,
  ...restProps
}: ButtonProps<T>) => {
  const Component = as ?? DEFAULT_BUTTON_TAG;

  return (
    <Component
      className={classNames(
        "ink-rounded-full ink-font-bold ink-transition-colors disabled:ink-cursor-not-allowed ink-duration-100 ink-font-default",
        "ink-flex ink-items-center ink-justify-center ink-gap-1",
        variantClassNames(variant, {
          primary:
            "ink-bg-primary ink-text-text-on-primary hover:ink-bg-primary-hover disabled:ink-bg-primary-disabled disabled:ink-text-text-on-primary-disabled active:ink-bg-primary-pressed",
          secondary:
            "ink-bg-secondary ink-text-text-on-secondary hover:ink-bg-secondary-hover disabled:ink-bg-secondary-disabled disabled:ink-text-text-on-secondary-disabled active:ink-bg-secondary-pressed",
        }),
        variantClassNames(size, {
          /** The ink-leading here is to match designs (text-body-2 is 20px height, but it should only use 12px somehow) */
          sm: "ink-px-3 ink-py-2 ink-text-body-2 ink-leading-3",
          md: "ink-px-4 ink-py-2.5 ink-text-h4",
        }),
        variantClassNames(rounded, {
          full: variantClassNames(size, {
            sm: "ink-rounded-full ink-px-1.5 ink-py-1.5",
            md: "ink-rounded-full ink-px-2.5 ink-py-2.5",
          }),
          default: "",
        }),
        className
      )}
      {...restProps}
    >
      {iconLeft && (
        <div
          className={variantClassNames(size, {
            sm: "ink-size-1.5",
            md: "ink-size-3",
          })}
        >
          {iconLeft}
        </div>
      )}
      {rounded === "full" ? (
        <div
          className={classNames(
            variantClassNames(size, {
              sm: "ink-size-2.5",
              md: "ink-size-3",
            })
          )}
        >
          {children}
        </div>
      ) : (
        children
      )}
      {iconRight && (
        <div
          className={variantClassNames(size, {
            sm: "ink-size-1.5",
            md: "ink-size-3",
          })}
        >
          {iconRight}
        </div>
      )}
    </Component>
  );
};
