import { PropsWithChildren, SelectHTMLAttributes, useEffect, useState } from "react"
import Button from "../Button"

import "./select.css"

type SelectProps = PropsWithChildren<{
    label?: string
    options: any[]
    onSelect: ((value: any, index: number) => void) | ((value: any) => void)
    value: any
}>

export default function Select(props: SelectProps) {
    const [open, setOpen] = useState(false)

    function onClickOutside() {
        setOpen(false)
    }

    function onSelect(index: number) {
        const newValue = props.options[index]

        if (props.value === newValue) {
            return
        }

        props.onSelect(newValue, index)
        setOpen(false)
    }

    useEffect(() => {
        document.addEventListener("click", onClickOutside)

        return () => document.removeEventListener("click", onClickOutside)
    }, [])

    return <div onClick={e => e.stopPropagation()} className={"select" + (open ? " select--open" : "")}>
        <label>{props.label}</label>
        <Button onClick={_ => setOpen(!open)}>
            {props.value}

            {open ?
                <i className="material-icons">keyboard_arrow_up</i>
                :
                <i className="material-icons">keyboard_arrow_down</i>}
                
            <ul className="options" onClick={e => e.stopPropagation()}>
                {props.options.map((option, index) => <li key={index}><Button style = {option === props.value ? {backgroundColor: "lightblue"} : null} onClick={() => onSelect(index)}>{option}</Button></li>)}
            </ul>
        </Button>
    </div>
}