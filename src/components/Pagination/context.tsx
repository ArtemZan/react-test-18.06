import { createContext, useContext, useState } from "react";

const context = createContext({
    page: 1,
    setPage: (page: number) => undefined,
    total: 0,
    setTotal: (total: number) => undefined,
    perPage: 1,
    setPerPage: (perPage: number) => undefined
})

export function PaginationContextProvider({ children }: { children: any }) {
    const [page, setPage] = useState(1)
    const [total, setTotal] = useState(0)
    const [perPage, setPerPage] = useState(1)

    return <context.Provider value={{
        page, setPage,
        total, setTotal,
        perPage, setPerPage
    }}>
        {children}
    </context.Provider>
}

export const usePagination = () => useContext(context)