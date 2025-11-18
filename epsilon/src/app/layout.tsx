import ThemeRegistry from '@/components/ThemeRegistry'
import '@/app/globals.scss'
import { EpsilonContextProvider } from '@/modules/epsilon/context/provider';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
      <html lang="en">
      <head>
          {/* React Scan script must be before any other scripts */}
          <script
              crossOrigin="anonymous"
              src="https://unpkg.com/react-scan/dist/auto.global.js"
          />
      </head>
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
