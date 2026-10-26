import { UsersPage } from '@/pages/users/UsersPage'
import { RequireAuth } from '@/components/RequireAuth/RequireAuth'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { AppLayout } from '@/layouts/AppLayout'
import { LoginPage } from '@/pages/auth/LoginPage'
import { DriverDetailsPage } from '@/pages/drivers/DriverDetailsPage'
import { DriverFormPage } from '@/pages/drivers/DriverFormPage'
import { DriversPage } from '@/pages/drivers/DriversPage'
import { HomePage } from '@/pages/home/HomePage'
import { ComingSoonPage } from '@/pages/placeholder/ComingSoonPage'
import { NotFoundPage } from '@/pages/placeholder/NotFoundPage'
import ProfilePage from '@/pages/perfil'
import { RequestFormPage } from '@/pages/requests/RequestFormPage'
import { RequestTrackingPage } from '@/pages/requests/RequestTrackingPage'
import { VehiclesPage } from '@/pages/vehicles/VehiclesPage'

// Módulos ainda sem tela própria: mesma página provisória, só muda o título.
const COMING_SOON_ROUTES = [
  { path: 'abastecimentos', title: 'Abastecimentos' },
  { path: 'manutencoes', title: 'Manutenções' },
  { path: 'relatorios', title: 'Relatórios' },
]

/** Rotas da aplicação (separadas do BrowserRouter para poderem ser testadas). */
export function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />

      <Route element={<RequireAuth />}>
        <Route element={<AppLayout />}>
          <Route index element={<HomePage />} />
          <Route path="veiculos" element={<VehiclesPage />} />
          <Route path="motoristas" element={<DriversPage />} />
          <Route path="motoristas/novo" element={<DriverFormPage />} />
          <Route path="motoristas/editar/:id" element={<DriverFormPage />} />
          <Route path="motoristas/:id" element={<DriverDetailsPage />} />
          <Route path="viagens" element={<RequestFormPage />} />
          <Route path="viagens/:id" element={<RequestTrackingPage />} />
          <Route path="perfil" element={<ProfilePage />} />
          <Route path="usuarios" element={<UsersPage />} />
          {COMING_SOON_ROUTES.map(({ path, title }) => (
            <Route key={path} path={path} element={<ComingSoonPage title={title} />} />
          ))}
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Route>
    </Routes>
  )
}

export function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  )
}
