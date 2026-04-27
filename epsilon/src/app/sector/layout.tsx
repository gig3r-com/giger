import { ReactNode } from 'react';
import { SectorContextProvider } from '@/app/sector/sectorContext';

export default function SectorLayout({ children }: { children: ReactNode }) {

  return (
    <SectorContextProvider>
      { children }
    </SectorContextProvider>
  )
}
