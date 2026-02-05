'use client'

import { useUsers } from '@/lib/queries/useUsers'

export default function UsersClient() {
    const { data, isFetching } = useUsers()

    return (
        <div>
            <h1>Users</h1>

            {isFetching && <small>Refreshing…</small>}

            <ul>
                {data?.users?.map(user => (
                    <li key={user.id}>{user.name}</li>
                ))}
            </ul>
        </div>
    )
}
