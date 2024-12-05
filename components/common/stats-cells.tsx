import { Stats } from "@/lib/types"


export type CellProps = {
    type: 'action' | 'full_name' | 'email' | 'status',
    data: Stats
}

export function StatsCells({type, data}:CellProps) {
    switch(type) {
        case 'email': return <Email email={data.boxDone || 0} />
    }
}

const Email = ({ email }: { email: number }) => {

    return (
        <>{email}</>
    )
}