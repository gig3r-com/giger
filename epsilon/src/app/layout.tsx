'use client'

import ThemeRegistry from '@/components/ThemeRegistry';
import '@/app/globals.scss';
import { EpsilonContextProvider } from '@/modules/epsilon/context/provider';
import { NuqsAdapter } from 'nuqs/adapters/next/app';
// import Providers from './providers';
import { ReactNode, useState } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

export default function RootLayout({ children }: { children: React.ReactNode }) {// create once per app lifetime
    const [queryClient] = useState(() =>
        new QueryClient({
            defaultOptions: {
                queries: {
                    staleTime: Infinity,
                    gcTime: Infinity,
                    retry: 1,
                },
            },
        })
    );

  return (
    <html lang="en">
      <body>
      <NuqsAdapter>
          <ThemeRegistry>
              <QueryClientProvider client={queryClient}>
                  <EpsilonContextProvider>
                      { children }
                  </EpsilonContextProvider>
              </QueryClientProvider>
          </ThemeRegistry>
      </NuqsAdapter>
      </body>
    </html>
  )
}
