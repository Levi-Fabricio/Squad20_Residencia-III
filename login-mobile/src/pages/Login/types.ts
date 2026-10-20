export type AuthStatus = 'idle' | 'loading' | 'success' | 'error'

export interface AuthUser {
  identifier: string
  displayName: string
}

export interface LoginPayload {
  identifier: string
  password: string
}

export interface AuthSession {
  user: AuthUser
  token: string
}
