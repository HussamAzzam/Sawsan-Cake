// src/components/RouteGuards.jsx
import { Navigate, Outlet, useLocation } from "react-router-dom"
import { useAuth } from "@/context/AuthContext.jsx"

function Loading() {
    return (
        <main className={`w-full min-h-screen flex items-center justify-center bg-background`}>
            <p className={`text-base text-dark/70`}>جاري التحميل...</p>
        </main>
    )
}

export function ProtectedRoute() {
    const { user, loading } = useAuth()
    const location = useLocation()
    if (loading) return <Loading />
    if (!user) return <Navigate to="/login" replace state={{ from: location }} />
    return <Outlet />
}

export function AdminRoute() {
    const { user, loading, isAdmin } = useAuth()
    const location = useLocation()
    if (loading) return <Loading />
    if (!user) return <Navigate to="/login" replace state={{ from: location }} />
    if (!isAdmin) return <Navigate to="/" replace />
    return <Outlet />
}
