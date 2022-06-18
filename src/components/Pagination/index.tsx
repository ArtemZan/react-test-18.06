import { usePagination, PaginationContextProvider } from "./context"
import PagesButtons from "./PagesButtons"
import PaginationRange from "./Range"
import SelectPerPage from "./SelectPerPage"

import "./pagination.css"
import { useEffect } from "react"
import Separator from "../Separator"

export default function Pagination({perPageOptions = [5, 10, 25], initialPerPage, allOptionText}: {perPageOptions?: number[], initialPerPage?: number, allOptionText?: string}) {

    const {total, perPage, setPerPage} = usePagination()

    useEffect(() => {
        setPerPage(initialPerPage || perPageOptions[0])
    }, [initialPerPage])


    if(total <= 1)
    {
        return null
    }

    return <div className="pagination">
        <SelectPerPage options={perPageOptions} allOptionText={allOptionText} />

        <Separator orientation="vertical" />

        <PaginationRange />

        {total === perPage ? null : <Separator orientation="vertical" />}

        <PagesButtons />
    </div>
}

export { PaginationContextProvider, usePagination, PagesButtons, PaginationRange, SelectPerPage }