// app/users/[handle]/page.tsx
import { notFound } from 'next/navigation';
import UserForm from '../_components/UserForm';
import { users } from '@/mockData/users';
import type { User } from '@/notes';

type PageProps = { params: { handle: string } };

export default function Page({ params: { handle } }: PageProps) {
    const normalized = decodeURIComponent(handle).toLowerCase();
    const initialUser = (users as Array<Partial<User> & { handle?: string }>)
        .find(u => u.handle?.toLowerCase() === normalized);

    if (!initialUser) {
        notFound();
    }

    return <UserForm initialUser={initialUser} />;
}
