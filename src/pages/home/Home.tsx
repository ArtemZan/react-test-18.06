import Table from "./Table";
import Toolbar from "./Toolbar";
import { useRef, useState } from "react";

import "./home.css"
import { PaginationContextProvider } from "../../components/Pagination";

function useThrottle(timeout: number)
{
    const timeoutId = useRef<NodeJS.Timeout>(null)

    return (callback: (...args: any) => any, ...args: any) => {
        if(timeoutId.current)
        {
            clearTimeout(timeoutId.current)
        }

        timeoutId.current = setTimeout(() => callback(...args), timeout)
    }
}

export default function Home() {
    const [filter, setFilter] = useState("")

    const throttle = useThrottle(500)

    function updateFilter(filter: string)
    {
        throttle(setFilter, filter)
    }

    return <div className="people">
        <PaginationContextProvider>
            <Toolbar update={updateFilter} />
            
            <Table filter={filter} />
        </PaginationContextProvider>
    </div>
}