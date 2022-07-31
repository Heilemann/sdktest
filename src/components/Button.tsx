import * as React from "react";
import { twMerge } from "tailwind-merge";

interface IButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export default function Button(props: IButtonProps) {
  const { children, className, ...rest } = props;

  return (
    <button
      className={twMerge(
        "rounded-lg bg-gray-100 p-2 dark:bg-gray-800",
        className
      )}
      {...rest}
    >
      {children}
    </button>
  );
}
