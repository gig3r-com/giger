import { QueryClient, dehydrate } from '@tanstack/react-query'
import { fetchUsers } from '@/lib/api/users'
import HydrationBoundary from '@/lib/queries/HydrationBoundary'
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
