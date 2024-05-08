import { ComponentProps } from "react";

export function DangerButton(props: ComponentProps<"button">){
    return <button className="bg-red-600 text-white px-3 py-1 transition-all rounded hover:bg-red-800" {...props}>{props.value}</button>
}