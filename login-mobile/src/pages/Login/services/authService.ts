import { isValidIdentifier } from '@/utils/validators'
import type { AuthSession, LoginPayload } from '../types'

const SESSION_KEY = 'svo-driver-session'
const MIN_PASSWORD_LENGTH = 6

function wait(ms: number) {
  return new Promise((resolve) => {
    window.setTimeout(resolve, ms)
  })
}

export async function login(payload: LoginPayload): Promise<AuthSession> {
  await wait(700)

  const identifier = payload.identifier.trim()
  const password = payload.password

  if (!isValidIdentifier(identifier) || password.length < MIN_PASSWORD_LENGTH) {
    throw new Error('E-mail/CPF ou senha inválidos.')
  }

  const session: AuthSession = {
    token: 'demo-session',
    user: {
      identifier,
      displayName: 'Motorista',
    },
  }

  window.sessionStorage.setItem(SESSION_KEY, JSON.stringify(session))
  return session
}

export async function requestPasswordReset(identifier: string) {
  await wait(700)
  if (!isValidIdentifier(identifier)) {
    throw new Error('Informe um e-mail ou CPF válido.')
  }
}

export function readSession(): AuthSession | null {
  const raw = window.sessionStorage.getItem(SESSION_KEY)
  if (!raw) {
    return null
  }

  try {
    return JSON.parse(raw) as AuthSession
  } catch {
    window.sessionStorage.removeItem(SESSION_KEY)
    return null
  }
}

export function clearSession() {
  window.sessionStorage.removeItem(SESSION_KEY)
}
