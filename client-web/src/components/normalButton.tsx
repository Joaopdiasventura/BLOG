import { ComponentProps } from "react";

export function NormalButton(props: ComponentProps<"button">) {
  return (
    <button
      className="bg-blue-500 text-white px-3 py-1 transition-all rounded hover:bg-blue-800"
      {...props}
    >
      {props.value}
    </button>
  );
}
