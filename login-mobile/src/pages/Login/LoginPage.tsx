import { useMemo, useState, type FormEvent } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { BrandMark } from '@/components/BrandMark'
import { Button } from '@/components/Button'
import { TextField } from '@/components/TextField'
import { formatCpf, isValidIdentifier } from '@/utils/validators'
import { notifyAuthChange } from './hooks/useAuthSession'
import { login } from './services/authService'
import type { AuthStatus } from './types'
import styles from './LoginPage.module.scss'

interface LocationState {
  resetRequested?: boolean
}

const MIN_PASSWORD_LENGTH = 6

export function LoginPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const resetRequested = Boolean((location.state as LocationState | null)?.resetRequested)

  const [identifier, setIdentifier] = useState('')
  const [password, setPassword] = useState('')
  const [status, setStatus] = useState<AuthStatus>('idle')
  const [submitError, setSubmitError] = useState('')
  const [showFieldErrors, setShowFieldErrors] = useState(false)

  const identifierError = useMemo(() => {
    if (!showFieldErrors) {
      return undefined
    }
    if (!identifier.trim()) {
      return 'Informe o e-mail ou CPF.'
    }
    if (!isValidIdentifier(identifier)) {
      return 'Digite um e-mail ou CPF válido.'
    }
    return undefined
  }, [identifier, showFieldErrors])

  const passwordError = useMemo(() => {
    if (!showFieldErrors) {
      return undefined
    }
    if (!password) {
      return 'Informe a senha.'
    }
    if (password.length < MIN_PASSWORD_LENGTH) {
      return `A senha deve ter ao menos ${MIN_PASSWORD_LENGTH} caracteres.`
    }
    return undefined
  }, [password, showFieldErrors])

  function handleIdentifierChange(value: string) {
    const trimmedStart = value.replace(/^\s+/, '')
    const hasLetters = /[a-zA-Z@]/.test(trimmedStart)
    setIdentifier(hasLetters ? trimmedStart : formatCpf(trimmedStart))
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setShowFieldErrors(true)
    setSubmitError('')

    if (!isValidIdentifier(identifier) || password.length < MIN_PASSWORD_LENGTH) {
      return
    }

    setStatus('loading')
    try {
      await login({ identifier, password })
      notifyAuthChange()
      setStatus('success')
      navigate('/inicio', { replace: true })
    } catch (error) {
      setStatus('error')
      setSubmitError(error instanceof Error ? error.message : 'Não foi possível entrar.')
    }
  }

  return (
    <section className={styles.stack}>
      <div className={styles.brand}>
        <BrandMark />
      </div>

      <div className={styles.headingGroup}>
        <h2 className={styles.title}>Login</h2>
        <p className={styles.subtitle}>Acesse sua conta de motorista</p>
      </div>

      {resetRequested ? (
        <p className={styles.success}>Se o cadastro existir, enviaremos as instruções de redefinição.</p>
      ) : null}

      {submitError ? <p className={styles.error}>{submitError}</p> : null}

      <form className={styles.form} onSubmit={handleSubmit} noValidate>
        <TextField
          id="identifier"
          name="identifier"
          label="E-mail ou CPF"
          placeholder="Digite seu e-mail ou CPF"
          autoComplete="username"
          inputMode="text"
          value={identifier}
          onChange={(event) => handleIdentifierChange(event.target.value)}
          error={identifierError}
        />

        <TextField
          id="password"
          name="password"
          label="Senha"
          type="password"
          placeholder="Digite sua senha"
          autoComplete="current-password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          error={passwordError}
        />

        <div className={styles.actions}>
          <Button type="submit" isFullWidth isLoading={status === 'loading'}>
            Entrar
          </Button>
          <Link className={styles.forgot} to="/esqueci-a-senha">
            Esqueceu a senha?
          </Link>
        </div>
      </form>

      <p className={styles.help}>Problemas de acesso? Contate o gestor.</p>
    </section>
  )
}
