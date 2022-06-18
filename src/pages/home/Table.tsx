import { ReactElement, useEffect, useState } from "react";
import { JsxElement } from "typescript";
import { chromeyeUrl, fetchPeople } from "../../apiUtils";
import { usePagination } from "../../components/Pagination";

type Company = {
    id: string
    name: string
    startDate: string
    department: string
}

type Avatar = {
    url: string
    alternativeText: string
}

type Person = {
    id: string
    firstName: string
    lastName: string
    email: string
    published_at: string
    created_at: string
    updated_at: string
    company: Company,
    avatar: Avatar
}

function TableRow(props: Person) {
    return <tr>
        <td>
            <img src={chromeyeUrl + props.avatar.url} alt={props.avatar.alternativeText} />
        </td>
        <td>{props.id}</td>
        <td>{props.firstName}</td>
        <td>{props.lastName}</td>
        <td><a target="_blank" href={"mailto:" + props.email}>{props.email}</a></td>
        <td>{props.company.name}</td>
        <td>{props.company.department}</td>
        <td>{props.company.startDate}</td>
    </tr>
}

export default function Table({ filter }: { filter: string }) {
    const [people, setPeople] = useState<Person[] | null>(null)

    const notFound: ReactElement = <>Not found</>

    const pagination = usePagination()

    useEffect(() => {
        (async () => {
            setPeople(await fetchPeople())
        })()
    }, [])

    useEffect(() => {
        if (people === null) {
            return
        }

        pagination.setTotal(people.length)
    }, [people])

    if (people === null) {
        return notFound
    }

    function getMathedPeople() {
        const filters = filter.trim().toLowerCase().split(" ")

        if(filters.length === 0)
        {
            return people
        }

        const matched = people.filter(({ firstName, lastName }) => {
            let didMatch = false

            for (let filter of filters) {
                if (firstName.toLowerCase().indexOf(filter) !== -1 || lastName.toLowerCase().indexOf(filter) !== -1) {
                    didMatch = true
                    break
                }
            }

            return didMatch
        })

        return matched
    }

    const matched = getMathedPeople()

    if (matched === null) {
        return notFound
    }

    pagination.setTotal(matched.length)

    if((pagination.page - 1) * pagination.perPage > matched.length)
    {
        pagination.setPage(Math.ceil(matched.length / pagination.perPage))
        return null
    }

    return <table>
        <tbody>
            <tr>
                <th>Avatar</th>
                <th>ID</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email</th>
                <th>Company</th>
                <th>Department</th>
                <th>Start Date</th>
            </tr>
            {matched.slice((pagination.page - 1) * pagination.perPage, pagination.page * pagination.perPage).map((row: Person) => <TableRow key={row.id} {...row} />)}
        </tbody>
    </table>
}