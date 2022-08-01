import * as React from "react";
import { twMerge } from "tailwind-merge";

interface IButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export default function Button(props: IButtonProps) {
  const { children, className, ...rest } = props;

  return (
    <button
      className={twMerge(
        "ml-0 rounded-lg bg-gray-100 p-2 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700",
        className
      )}
      {...rest}
    >
      {children}
    </button>
  );
}