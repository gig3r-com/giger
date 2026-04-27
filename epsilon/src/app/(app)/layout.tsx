import { auth } from '@/auth'
import { redirect } from 'next/navigation'
import AppHeader from './components/AppHeader'
import ConversationsContextProvider from '@/components/modules/conversations/context/provider';
import Toolbar from '@mui/material/Toolbar'
import Box from '@mui/material/Box'
import { UserContextProvider } from '@/components/modules/users';
import { NetworkContextProvider } from '@/components/modules/networks';
import { ControllersContextProvider } from '@/components/modules/controller';
import { ConfirmProvider } from '@/contexts/ConfirmProvider';
import { ModalProvider } from '@/contexts/ModalProvider';

export default async function AppLayout({ children }: { children: React.ReactNode }) {
  const session = await auth()
  if (!session) redirect('/login')

  return (
    <NetworkContextProvider>
      <UserContextProvider>
        <ConversationsContextProvider>
          <ControllersContextProvider>
            <ConfirmProvider>
              <ModalProvider>
                <Box sx={{ display: 'flex', minHeight: '100dvh', }}>
                  <AppHeader user={session?.user ?? null} />
                  <Box component="main" sx={{ flexGrow: 1, pb: 3, pl: 3, pr: 3, overflow: 'hidden' }} display="flex" flexDirection="column">
                    <Toolbar />
                    <Box sx={{ height: '100%', overflow: 'auto', flex: "1", pt: 3 }}>
                      { children }
                    </Box>
                  </Box>
                </Box>
              </ModalProvider>
            </ConfirmProvider>
          </ControllersContextProvider>
        </ConversationsContextProvider>
      </UserContextProvider>
    </NetworkContextProvider>
  )
}
