import ThemeRegistry from '@/components/ThemeRegistry'
import '@/app/globals.scss'
import { EpsilonContextProvider } from '@/modules/epsilon/context/provider';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
      <ThemeRegistry>
        <EpsilonContextProvider>
          {children}
        </EpsilonContextProvider>
      </ThemeRegistry>
      </body>
    </html>
  )
}
