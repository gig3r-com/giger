import { signIn } from '@/auth'
import LoginForm from '@/components/login/LoginForm'

export default function LoginPage({ searchParams }: { searchParams?: { callbackUrl?: string; error?: string } }) {
    const redirectTo = searchParams?.callbackUrl ?? '/dashboard'

    async function login(formData: FormData) {
        'use server'
        const provider = formData.get('provider')?.toString()
        if (provider) formData.delete('provider')
        const targetProvider =
            provider && ['mock', 'police'].includes(provider) ? (provider as 'mock' | 'police') : 'credentials'
        await signIn(targetProvider, formData)
    }

    return <LoginForm action={login} redirectTo={redirectTo} error={searchParams?.error} />
}
