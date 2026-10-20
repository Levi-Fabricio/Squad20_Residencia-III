import { Navigate, Route, Routes } from 'react-router-dom'
import { ForgotPasswordPage } from '@/pages/ForgotPassword/ForgotPasswordPage'
import { useAuthSession } from '@/pages/Login/hooks/useAuthSession'
import { LoginPage } from '@/pages/Login/LoginPage'
import { HomePage } from '@/pages/Home/HomePage'
import { AppLayout } from '@/layouts/AppLayout'
import { AuthLayout } from '@/layouts/AuthLayout'

export function AppRoutes() {
  const { session, logout, isAuthenticated } = useAuthSession()

  return (
    <Routes>
      <Route
        path="/"
        element={
          isAuthenticated ? (
            <Navigate to="/inicio" replace />
          ) : (
            <AuthLayout>
              <LoginPage />
            </AuthLayout>
          )
        }
      />
      <Route
        path="/esqueci-a-senha"
        element={
          isAuthenticated ? (
            <Navigate to="/inicio" replace />
          ) : (
            <AuthLayout>
              <ForgotPasswordPage />
            </AuthLayout>
          )
        }
      />
      <Route
        path="/inicio"
        element={
          isAuthenticated && session ? (
            <AppLayout onLogout={logout}>
              <HomePage displayName={session.user.displayName} />
            </AppLayout>
          ) : (
            <Navigate to="/" replace />
          )
        }
      />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
