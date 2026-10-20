import { useMemo, useState, type FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { BrandMark } from '@/components/BrandMark'
import { Button } from '@/components/Button'
import { TextField } from '@/components/TextField'
import { formatCpf, isValidIdentifier } from '@/utils/validators'
import { requestPasswordReset } from '../Login/services/authService'
import type { AuthStatus } from '../Login/types'
import styles from '../Login/LoginPage.module.scss'

export function ForgotPasswordPage() {
  const navigate = useNavigate()
  const [identifier, setIdentifier] = useState('')
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

  function handleIdentifierChange(value: string) {
    const trimmedStart = value.replace(/^\s+/, '')
    const hasLetters = /[a-zA-Z@]/.test(trimmedStart)
    setIdentifier(hasLetters ? trimmedStart : formatCpf(trimmedStart))
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setShowFieldErrors(true)
    setSubmitError('')

    if (!isValidIdentifier(identifier)) {
      return
    }

    setStatus('loading')
    try {
      await requestPasswordReset(identifier)
      setStatus('success')
      navigate('/', { replace: true, state: { resetRequested: true } })
    } catch (error) {
      setStatus('error')
      setSubmitError(error instanceof Error ? error.message : 'Não foi possível enviar a solicitação.')
    }
  }

  return (
    <section className={styles.stack}>
      <div className={styles.brand}>
        <BrandMark />
      </div>

      <div className={styles.headingGroup}>
        <h2 className={styles.title}>Recuperar senha</h2>
        <p className={styles.subtitle}>Informe o e-mail ou CPF da sua conta de motorista</p>
      </div>

      {submitError ? <p className={styles.error}>{submitError}</p> : null}

      <form className={styles.form} onSubmit={handleSubmit} noValidate>
        <TextField
          id="identifier"
          name="identifier"
          label="E-mail ou CPF"
          placeholder="Digite seu e-mail ou CPF"
          autoComplete="username"
          value={identifier}
          onChange={(event) => handleIdentifierChange(event.target.value)}
          error={identifierError}
        />

        <div className={styles.actions}>
          <Button type="submit" isFullWidth isLoading={status === 'loading'}>
            Enviar
          </Button>
          <Link className={styles.forgot} to="/">
            Voltar ao login
          </Link>
        </div>
      </form>

      <p className={styles.help}>Problemas de acesso? Contate o gestor.</p>
    </section>
  )
}
