import { ButtonHTMLAttributes, MouseEventHandler } from "react"
import { CSSProperties } from "react"

import "./button.css"

type ButtonProps = {
    onClick?: MouseEventHandler<HTMLButtonElement>
    disabled?: boolean,
    style?: CSSProperties
} & ButtonHTMLAttributes<HTMLButtonElement>

export default function Button(props: ButtonProps)
{
    return <button style = {props.style} className={"button" + (props.disabled ? " button--disabled" : "")} onClick = {props.disabled ? undefined : props.onClick}>
        {props.children}
    </button>
}