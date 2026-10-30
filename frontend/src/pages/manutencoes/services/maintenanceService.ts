import { mockMaintenances } from '../data/mockMaintenances'
import { mockVehicles } from '../data/mockVehicles'
import type { Maintenance, MaintenanceInput } from '../types/maintenance'
import type { Vehicle } from '../types/vehicle'

/**
 * Data access layer for the Manutenções module.
 * Currently backed by localStorage. To integrate with the team backend,
 * replace the bodies of these functions with API calls keeping the same signatures.
 */

const STORAGE_KEY = 'frotamanager:manutencoes'
const CHANGE_EVENT = 'frotamanager:manutencoes-changed'

const hasStorage = () => typeof window !== 'undefined' && !!window.localStorage

function read(): Maintenance[] {
  if (!hasStorage()) return []
  const raw = window.localStorage.getItem(STORAGE_KEY)
  if (raw === null) {
    // Seed only on first run — never overwrite user data.
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(mockMaintenances))
    return [...mockMaintenances]
  }
  try {
    return JSON.parse(raw) as Maintenance[]
  } catch {
    return []
  }
}

function write(list: Maintenance[]) {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(list))
  window.dispatchEvent(new Event(CHANGE_EVENT))
}

const newId = () =>
  typeof crypto !== 'undefined' && 'randomUUID' in crypto
    ? crypto.randomUUID()
    : `m_${Date.now()}_${Math.random().toString(36).slice(2)}`

export const maintenanceService = {
  CHANGE_EVENT,
  list(): Maintenance[] {
    return read()
  },
  getById(id: string) {
    return read().find((m) => m.id === id)
  },
  create(input: MaintenanceInput): Maintenance {
    const now = new Date().toISOString()
    const record: Maintenance = {
      ...input,
      id: newId(),
      criadoEm: now,
      atualizadoEm: now,
    }
    write([record, ...read()])
    return record
  },
  update(id: string, input: MaintenanceInput): Maintenance | undefined {
    const list = read()
    const idx = list.findIndex((m) => m.id === id)
    if (idx < 0) return undefined
    const previous = list[idx]
    if (!previous) return undefined
    const updated: Maintenance = {
      ...previous,
      ...input,
      id,
      criadoEm: previous.criadoEm,
      atualizadoEm: new Date().toISOString(),
    }
    list[idx] = updated
    write(list)
    return updated
  },
  remove(id: string) {
    write(read().filter((m) => m.id !== id))
  },
}

export const vehicleService = {
  /** Replace with the existing vehicles API on integration. */
  list(): Vehicle[] {
    return mockVehicles
  },
}
