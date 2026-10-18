// src/context/AuthContext.jsx
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react"
import { getCurrentUser, logout as logoutRequest, googleLoginUrl } from "@/api/authService.js"

const AuthContext = createContext(null)

export const useAuth = () => {
    const ctx = useContext(AuthContext)
    if (!ctx) throw new Error("useAuth must be used inside AuthProvider")
    return ctx
}

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const controller = new AbortController()
        getCurrentUser({ signal: controller.signal })
            .then((res) => setUser(res.data))
            .catch((err) => {
                if (err.code === "ERR_CANCELED") return
                setUser(null)
            })
            .finally(() => {
                if (!controller.signal.aborted) setLoading(false)
            })
        return () => controller.abort()
    }, [])

    const login = useCallback(() => {
        window.location.href = googleLoginUrl
    }, [])

    const logout = useCallback(async () => {
        try {
            await logoutRequest()
        } finally {
            setUser(null)
        }
    }, [])

    const value = useMemo(
        () => ({ user, loading, isAdmin: user?.role === "admin", login, logout }),
        [user, loading, login, logout]
    )

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
