import { auth } from '@/auth'
import { redirect } from 'next/navigation'
import ConversationsContextProvider from '@/components/modules/conversations/context/provider';
import { UserContextProvider } from '@/components/modules/users';
import { NetworkContextProvider } from '@/components/modules/networks';
import { ControllersContextProvider } from '@/components/modules/controller';
import { ConfirmProvider } from '@/contexts/ConfirmProvider';
import { ModalProvider } from '@/contexts/ModalProvider';
import Layout from '@/app/(app)/_layout';

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
                <Layout>
                  Tet
                </Layout>
              </ModalProvider>
            </ConfirmProvider>
          </ControllersContextProvider>
        </ConversationsContextProvider>
      </UserContextProvider>
    </NetworkContextProvider>
  )
}
