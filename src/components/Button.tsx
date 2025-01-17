import { ReactElement } from "react";

interface ButtonProps {
    variant: 'primary' | 'secondary';
    text : string;
    startIcon?: ReactElement;
    endIcon?: ReactElement;
    fullWidth ?: boolean;
    loading ?: boolean;
    onclick ?: ()=>void;
}

const variantType = {
    primary: "bg-purple-600 text-white",
    secondary: "bg-purple-200 text-purple-400"
}

const defaultStyle = "px-4 m-2 mt-0 py-2 rounded-md flex  items-center"

export function Button(props : ButtonProps) {
    return (
      <button onClick={props.onclick}
      className={variantType[props.variant] + " " + defaultStyle + `${props.fullWidth ? ' w-full flex justify-center items-center' : ''}`}
      disabled = {props.loading}
      >
        {props.startIcon}
        {props.text}
        {props.endIcon}
        </button>
    )
  }