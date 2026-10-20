import { useCallback, useSyncExternalStore } from 'react'
import { clearSession, readSession } from '../services/authService'
import type { AuthSession } from '../types'

const SESSION_EVENT = 'svo-auth-change'

let cachedRaw: string | null | undefined
let cachedSession: AuthSession | null = null

function emitChange() {
  window.dispatchEvent(new Event(SESSION_EVENT))
}

function subscribe(onStoreChange: () => void) {
  window.addEventListener(SESSION_EVENT, onStoreChange)
  window.addEventListener('storage', onStoreChange)
  return () => {
    window.removeEventListener(SESSION_EVENT, onStoreChange)
    window.removeEventListener('storage', onStoreChange)
  }
}

function getSnapshot(): AuthSession | null {
  const raw = window.sessionStorage.getItem('svo-driver-session')
  if (raw === cachedRaw) {
    return cachedSession
  }
  cachedRaw = raw
  cachedSession = readSession()
  return cachedSession
}

export function notifyAuthChange() {
  cachedRaw = undefined
  emitChange()
}

export function useAuthSession() {
  const session = useSyncExternalStore(subscribe, getSnapshot, () => null)

  const logout = useCallback(() => {
    clearSession()
    notifyAuthChange()
  }, [])

  return { session, logout, isAuthenticated: Boolean(session) }
}
