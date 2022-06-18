import { usePagination } from "."
import Select from "../Select"

export default function SelectPerPage({options, allOptionText = "All"}: {options: number[], allOptionText?: string}) {
    const {
        perPage, setPerPage,
        page, setPage,
        total } = usePagination()

    if (total <= 1) {
        return null
    }

    const finalOptions = [
        ...options,
        allOptionText
    ]

    function onChange(value: number | string) {
        if (typeof value === "string") {
            setPerPage(total)
            setPage(1)
            return
        }

        setPerPage(value)
        setPage(Math.floor((page - 1) * perPage / value) + 1)
    }

    let value: string | number = perPage
    if (options.indexOf(perPage) === -1) {
        value = allOptionText
    }

    return <div className="per-page">
        <Select label="Rows per page:" onSelect={onChange} value={value} options={finalOptions} />
    </div>
}