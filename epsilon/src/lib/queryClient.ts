import { QueryClient } from '@tanstack/react-query'

export function createQueryClient() {
    return new QueryClient({
        defaultOptions: {
            queries: {
                staleTime: Infinity,
                cacheTime: Infinity,
                retry: 1,
            },
        },
    })
}