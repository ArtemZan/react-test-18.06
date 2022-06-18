import { usePagination } from "./context"
import Button from "../Button"

function PageButton({ page }: { page: number }) {
    const { page: openPage, setPage } = usePagination()

    return <Button style={{ backgroundColor: openPage === page ? "lightblue" : undefined }} onClick={() => setPage(page)}>{page}</Button>
}

type PagesButtonsProps = {
    // Count of buttons before '...' from each side of the current page button
    neighbourCount?: number
}

export default function PagesButtons({ neighbourCount = 1 }: PagesButtonsProps) {
    const {
        page, setPage,
        total,
        perPage
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

    function getMiddlePages() {
        const middlePages = []

        if(pages === 2)
        {
            return null
        }

        // First showed element that is not '1'. If it should be ellipsis, 'firstInTheMiddle' will be equal to the last page that is hidden by that ellipsis
        const firstInTheMiddle = Math.max(Math.min(page - neighbourCount - 1, pages - (neighbourCount * 2 + 3)), 2)

        // Last showed element that is not the last page. If it should be ellipsis, 'lastInTheMiddle' will be equal to the first page that is hidden by that ellipsis
        const lastInTheMiddle = Math.min(Math.max(Math.min(page + neighbourCount + 1, pages - 1), neighbourCount * 2 + 4), pages)

        if (firstInTheMiddle > 2) {
            // There are more that 1 page between 1 and firstInTheMiddle. They should be hidden
            middlePages.push(<div style={{ width: "1.5em", textAlign: "center" }} key="ellipsis1">...</div>)
        }
        else if (firstInTheMiddle === 2) {
            // There is 1 page between 1 and firstInTheMiddle. Thus no ellipsis
            middlePages.push(<PageButton key={2} page={2} />)
        }


        for (let p = firstInTheMiddle + 1; p < lastInTheMiddle; p++) {
            middlePages.push(<PageButton key={p} page={p} />)
        }


        if (lastInTheMiddle < pages - 1) {
            middlePages.push(<div style={{ width: "1.5em", textAlign: "center" }} key="ellipsis2">...</div>)
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