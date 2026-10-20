import styles from './HomePage.module.scss'

export interface HomePageProps {
  displayName: string
}

export function HomePage({ displayName }: HomePageProps) {
  return (
    <section className={styles.card}>
      <h2 className={styles.title}>Olá, {displayName}</h2>
      <p className={styles.text}>Você está autenticado na conta de motorista.</p>
    </section>
  )
}
