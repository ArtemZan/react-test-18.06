import { ChangeEvent, useState } from "react"
import { NodeBuilderFlags } from "typescript"
import Button from "../Button"
import Select from "../Select"
import { usePagination, PaginationContextProvider } from "./context"
import "./pagination.css"

function PageButton({ page }: { page: number }) {
    const { page: openPage, setPage } = usePagination()

    return <Button style={{ backgroundColor: openPage === page ? "lightblue" : undefined }} onClick={() => setPage(page)}>{page}</Button>
}

function PagesButtons() {
    const { page, setPage,
        total,
        perPage, setPerPage
    } = usePagination()

    const pages = Math.ceil(total / perPage)

    if (pages < 2) {
        return null
    }

    function goBack() {
        setPage(page - 1)
    }

    function goForwards() {
        setPage(page + 1)
    }

    const neighbourPages = 1

    function getMiddlePages() {
        const middlePages = []

        const firstInTheMiddle = Math.max(Math.min(page - neighbourPages - 1, pages - (neighbourPages * 2 + 3)), 2)
        const lastInTheMiddle = Math.min(Math.max(Math.min(page + neighbourPages + 1, pages - 1), neighbourPages * 2 + 4), pages)
        if (firstInTheMiddle === lastInTheMiddle) {
            return null
        }

        if (firstInTheMiddle > 2) {
            middlePages.push(<div style={{ width: "1.5em", textAlign: "center" }} key="elipsis1">...</div>)
        }
        else if (firstInTheMiddle === 2) {
            middlePages.push(<PageButton key={2} page={2} />)
        }


        for (let p = firstInTheMiddle + 1; p < lastInTheMiddle; p++) {
            middlePages.push(<PageButton key={p} page={p} />)
        }

        if (lastInTheMiddle < pages - 1) {
            middlePages.push(<div style={{ width: "1.5em", textAlign: "center" }} key="elipsis2">...</div>)
        }
        else if (lastInTheMiddle === pages - 1) {
            middlePages.push(<PageButton key={pages - 1} page={pages - 1} />)
        }

        return middlePages
    }

    const middlePages = getMiddlePages()

    return <div className="pages">

        <Button onClick={goBack} disabled={page <= 1}><i className="material-icons">chevron_left</i></Button>

        <PageButton page={1} />

        {middlePages}

        <PageButton page={pages} />

        <Button onClick={goForwards} disabled={page >= pages}><i className="material-icons">chevron_right</i></Button>
    </div>
}

function SelectPerPage() {
    const {
        perPage, setPerPage,
        page, setPage,
        total } = usePagination()

    if (total <= 1) {
        return null
    }

    const options = [
        1,
        3,
        5,
        "All"
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
        value = "All"
    }

    return <div className="per-page">
        <Select label="Rows per page" onSelect={onChange} value={value} options={options} />
    </div>
}

function PaginationRange()
{
        const {page, total, perPage} = usePagination()
    
        const from = (page - 1) * perPage + 1
        const to = Math.min(from + perPage, total)

        const range = (perPage === 1 ? from : `${from} - ${to}`) + ` of ${total}`
        
        return <div className = "pagination__range">
            {range}
        </div> 
}

export default function Pagination() {

    return <div className="pagination">
        <SelectPerPage />

        <div style = {{height: "100%", width: "1px", backgroundColor: "grey"}}/>

        <PaginationRange />

        <div style = {{height: "100%", width: "1px", backgroundColor: "grey"}}/>

        <PagesButtons />
    </div>
}

export { PaginationContextProvider, usePagination }