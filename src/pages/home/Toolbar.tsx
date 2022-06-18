import Pagination from "../../components/Pagination"
import TextField from "../../components/TextField"


export default function Toolbar({ update }: { update: (filter: string) => void }) {
    return <div className="toolbar">
        <TextField onChange={e => update(e.target.value)} placeholder="Find by name" />

        <Pagination perPageOptions={[1, 3, 5]} initialPerPage={3} />
    </div>
}