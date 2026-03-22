import { QueryClient, dehydrate } from '@tanstack/react-query'
import { fetchUsers } from '@/lib/api'
import { HydrationBoundary } from '@tanstack/react-query'
import UsersClient from './UsersClient'

export default async function Page() {
    const queryClient = new QueryClient()

    await queryClient.prefetchQuery({
        queryKey: ['users'],
        queryFn: fetchUsers,
    })

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <UsersClient />
        </HydrationBoundary>
    )
}
