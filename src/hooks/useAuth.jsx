import { useNavigate } from 'react-router-dom'
import { route } from '@/routes'
import { useEffect, useMemo, useState } from 'react'
import { useLocalStorage } from 'react-use-storage'

export function useAuth() {
    const [errors, setErrors] = useState({})
    const [loading, setLoading] = useState(false)
    const [accessToken, setAccessToken, removeAccessToken] = useLocalStorage('access_token', '')

    const navigate = useNavigate()

    const isLoggedIn = useMemo(() => !!accessToken, [accessToken])
    
    useEffect(() => {
        if (accessToken) {
            axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`
        }
    }, [accessToken])

    async function register(data) {
        setErrors({})
        setLoading(true)

        return axios.post('auth/register', data)
            .then(() => {
                setAccessToken(response.data.access_token)
                navigate(route('vehicles.index'))
            })
            .catch((error) => {
                if (error.response.status === 422) {
                    setErrors(error.response.data.errors)
                }
            })
            .finally(() => setLoading(false))
    }

    async function login(data) {
        setErrors({})
        setLoading(true)

        return axios.post('/auth/login', data)
            .then(response => {
                setAccessToken(response.data.access_token)
                navigate(route('parkings.active'))
            })
            .catch(error => {
                if (error.response.status === 422) {
                    setErrors(error.response.data.errors)
                }
            })
            .finally(() => setLoading(false))
    }

    async function logout(force = false) {
        if (!force) {
            await axios.post('auth/logout')
        }

        removeAccessToken()
        navigate(route('login'))
    }

    return { register, login, errors, loading, isLoggedIn, logout }
}