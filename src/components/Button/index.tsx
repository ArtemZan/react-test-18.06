import { MouseEventHandler } from "react"
import { CSSProperties, FormEventHandler } from "react"

import "./button.css"

type ButtonProps = {
    onClick?: MouseEventHandler<HTMLButtonElement>
    children: any
    disabled?: boolean,
    style?: CSSProperties
}

export default function Button(props: ButtonProps)
{
    return <button style = {props.style} className={"button" + (props.disabled ? " button--disabled" : "")} onClick = {props.disabled ? undefined : props.onClick}>
        {props.children}
    </button>
}