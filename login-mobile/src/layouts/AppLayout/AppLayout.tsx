import type { ReactNode } from 'react'
import styles from './AppLayout.module.scss'

export interface AppLayoutProps {
  children: ReactNode
  onLogout: () => void
}

export function AppLayout({ children, onLogout }: AppLayoutProps) {
  return (
    <div className={styles.shell}>
      <header className={styles.header}>
        <h1 className={styles.title}>Driver</h1>
        <button className={styles.logout} type="button" onClick={onLogout}>
          Sair
        </button>
      </header>
      <main className={styles.main}>
        <div className={styles.content}>{children}</div>
      </main>
    </div>
  )
}
