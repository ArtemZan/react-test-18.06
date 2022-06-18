import { usePagination } from "."

export default function PaginationRange() {
    const { page, total, perPage } = usePagination()

    const from = (page - 1) * perPage + 1
    const to = Math.min(from + perPage - 1, total)

    const range = (perPage === 1 || from === to ? from : `${from} - ${to}`) + ` of ${total}`

    return <div className="pagination__range">
        {range}
    </div>
}