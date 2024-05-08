import { ComponentProps } from "react";

export function OkButton(props: ComponentProps<"button">) {
  return (
    <button
      className="bg-green-600 text-white px-3 py-1 transition-all rounded hover:bg-green-800"
      {...props}
    >
      {props.value}
    </button>
  );
}
