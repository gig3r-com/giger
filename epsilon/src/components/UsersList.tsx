import React from 'react'
import { useStore } from '@/store/useStore'


export const UsersList: React.FC = () => {
    const users = useStore(state => state.entities.users)


    const list = Object.values(users)


    if (!list.length) return <div>No users loaded</div>


    return (
        <ul>
            {list.map(u => (
                <li key={u.id}>
                    <strong>{u.name ?? u.handle}</strong> <small>({u.handle})</small>
                </li>
            ))}
        </ul>
    )
}


export default UsersList