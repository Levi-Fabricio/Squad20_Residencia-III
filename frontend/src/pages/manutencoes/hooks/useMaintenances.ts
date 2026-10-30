import { useCallback, useEffect, useState } from 'react'
import { maintenanceService, vehicleService } from '../services/maintenanceService'
import type { Maintenance } from '../types/maintenance'

/** Reads maintenances on the client and re-syncs whenever the store changes. */
export function useMaintenances() {
  // 1. Inicializa o estado com os dados atuais (Lazy Initialization)
  const [maintenances, setMaintenances] = useState<Maintenance[]>(() =>
    maintenanceService.list(),
  )

  // 2. Como os dados são síncronos, não precisamos começar com loading=true
  const [loading] = useState(false)

  const refresh = useCallback(() => {
    setMaintenances(maintenanceService.list())
  }, [])

  useEffect(() => {
    // 3. O refresh() inicial foi removido daqui, pois já foi feito no useState

    // Apenas configuramos os "ouvintes" para quando os dados mudarem
    window.addEventListener(maintenanceService.CHANGE_EVENT, refresh)
    window.addEventListener('storage', refresh)

    return () => {
      window.removeEventListener(maintenanceService.CHANGE_EVENT, refresh)
      window.removeEventListener('storage', refresh)
    }
  }, [refresh])

  return { maintenances, vehicles: vehicleService.list(), loading, refresh }
}
