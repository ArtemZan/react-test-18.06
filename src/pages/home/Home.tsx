import { useRef, useState } from "react"
import Table from "./Table"
import Toolbar from "./Toolbar"
import { PaginationContextProvider } from "../../components/Pagination"

import "./home.css"
import useMounted from "../../utils/useMouted"
import useThrottle from "../../utils/useThrottle"


export default function Home() {
    const [filter, setFilter] = useState("")

    const throttle = useThrottle(500)

    const isMounted = useMounted()

    function updateFilter(filter: string) {
        throttle(() => {
            if (isMounted.current) {
                setFilter(filter)
            }
        })
    }

    return <div className="page home-page">
        <h1>Table with people</h1>
        <div className="people">
            <PaginationContextProvider>
                <Toolbar update={updateFilter} />

                <Table filter={filter} />
            </PaginationContextProvider>
        </div>
    </div>
}