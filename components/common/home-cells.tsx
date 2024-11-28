import { Collections } from "@/lib/types"


export type CellProps = {
    type: 'action' | 'full_name' | 'email' | 'status',
    data: Collections
}

export function HomeCells({type, data}:CellProps) {
    switch(type) {
        case 'email': return <Email email={data.label} />
    }
}

const Email = ({ email }: { email: string }) => {

    return (
        <>{email}</>
    )
}