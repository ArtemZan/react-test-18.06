import { ChangeEvent, InputHTMLAttributes, useState } from "react"

import "./textField.css"

export default function TextField(props: InputHTMLAttributes<HTMLInputElement>) {
    const [value, setValue] = useState(props.value)

    function onChange(e: ChangeEvent<HTMLInputElement>)
    {
        setValue(e.target.value)
        props.onChange(e)
    }

    return <div className={"input" + (value ? " input--not-empty" : "")}>
        <input onInput = {onChange} {...props} placeholder={undefined} />
        <label>{props.placeholder}</label>
    </div>
}