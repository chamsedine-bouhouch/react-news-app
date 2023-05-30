import { useEffect } from 'react'
import useSWR from 'swr'
import axios from '@/lib/axios'
import { useRouter } from 'next/router'

export const useAuth = ({ middleware, redirectIfAuthenticated } = {}) => {

    const router = useRouter()

    const { data: user, error, mutate } = useSWR('/api/user', () =>
        axios
            .get('/api/user')
            .then(res => res.data)
            .catch(error => {
                // if (error.response.status !== 409) throw error
                console.error(error)
                // router.push('/verify-email')
            }),
    )


    const csrf = () => axios.get('/sanctum/csrf-cookie')



    const login = async ({ setErrors, ...props }) => {
        await csrf()

        setErrors([])


        axios
            .post('/api/auth/login', props)
            .then(() => mutate())
            .catch(error => {
                console.log(error)
            })
    }

    const logout = async () => {
        if (!error) {
            await axios.post('/api/auth/logout').then(() => mutate())
        }

        window.location.pathname = '/auth'
    }
    useEffect(() => {
        if (middleware === 'guest' && redirectIfAuthenticated && user)
            router.push(redirectIfAuthenticated)
        // if (
        //     window.location.pathname === '/verify-email' &&
        //     user?.email_verified_at
        // )
            // router.push(redirectIfAuthenticated)
        if (middleware === 'auth' && error) logout()
    }, [user, error])


    return {
        user,

        login,

        logout,
    }
}