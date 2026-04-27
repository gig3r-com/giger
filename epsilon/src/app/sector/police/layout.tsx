import { ReactNode } from 'react';
import { PoliceThemeProvider, RootScreen } from './_components/PoliceTheme';

export default function PoliceLayout({ children }: { children: ReactNode }) {

  return (
    <PoliceThemeProvider>
      <RootScreen>
        { children }
      </RootScreen>
    </PoliceThemeProvider>
  )
}
