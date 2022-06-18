
import "./separator.css"

type SeparatorProps = {
    orientation?: "vertical" | "horizontal"
}

export default function Separator({orientation = "horizontal"} : SeparatorProps)
{
    return <div className = {"separator" + " separator--" + orientation}/>
}