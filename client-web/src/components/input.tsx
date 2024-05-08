import { ComponentProps } from "react";

export function InputComponent(props: ComponentProps<"input">) {
  return (
    <input
      className="w-full border rounded p-1 outline-none focus:shadow-lg focus:shadow-blue-100"
      {...props}
    />
  );
}
