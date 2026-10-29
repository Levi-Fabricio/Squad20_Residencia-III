import styles from './AbastecimentosPage.module.scss'
import { Link } from 'react-router-dom'

export default function AbastecimentosPage() {
  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div>
          <h1>Abastecimentos</h1>
          <p>Acompanhe os registros, os volumes e o teto de gastos de cada veículo.</p>
        </div>
        <Link to="/abastecimentos/registrar" className={styles.btnPrimary}>
          Registrar abastecimento
        </Link>
      </header>

      {/* Cards de KPI */}
      <div className={styles.kpiGrid}>
        <div className={styles.card}>
          <p className={styles.kpiTitle}>Gasto no período</p>
          <h2>R$ 850,00</h2>
          <p className={styles.kpiSub}>SVO-01 · Outubro de 2026</p>
        </div>
        <div className={styles.card}>
          <p className={styles.kpiTitle}>Volume abastecido</p>
          <h2>100,00 L</h2>
          <p className={styles.kpiSub}>Gasolina · 3 registros</p>
        </div>
        <div className={styles.card}>
          <p className={styles.kpiTitle}>Preço médio por litro</p>
          <h2>R$ 8,50</h2>
          <p className={styles.kpiSub}>R$ 850,00 ÷ 100,00 L</p>
        </div>
      </div>

      {/* Barra de Teto */}
      <div className={styles.card} style={{ marginBottom: '1.5rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div>
            <h3>Teto de abastecimento · SVO-01</h3>
            <p className={styles.kpiSub}>ABC-1D23 · Outubro de 2026</p>
          </div>
          <span
            style={{
              background: '#fef3c7',
              color: '#b45309',
              padding: '0.2rem 0.6rem',
              borderRadius: '12px',
              fontSize: '0.8rem',
              fontWeight: 'bold',
            }}
          >
            Atenção · 85% utilizado
          </span>
        </div>
        <h2 style={{ margin: '1rem 0 0.5rem 0' }}>
          R$ 850,00{' '}
          <span style={{ fontSize: '0.8rem', color: '#64748b', fontWeight: 'normal' }}>
            85% do teto
          </span>
        </h2>
        <div className={styles.progressBarWarning}>
          <div style={{ width: '85%' }}></div>
        </div>
        <p className={styles.kpiSub} style={{ color: '#b45309', marginTop: '0.5rem' }}>
          Restam R$ 150,00 para abastecimento neste mês.
        </p>
      </div>

      {/* Filtros */}
      <div className={styles.filterGrid}>
        <div className={styles.formGroup}>
          <label htmlFor="filtroVeiculo">Veículo</label>
          <select id="filtroVeiculo">
            <option>SVO-01 · Fiat Fiorino · ABC-1D23</option>
          </select>
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="filtroPeriodo">Período</label>
          <select id="filtroPeriodo">
            <option>01/10 a 31/10/2026</option>
          </select>
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="filtroBusca">Buscar motorista ou posto</label>
          <input id="filtroBusca" type="text" placeholder="Buscar nos registros..." />
        </div>
        <button
          className={styles.btnSecondary}
          style={{ height: '40px', marginTop: '1.4rem' }}
        >
          Filtrar
        </button>
      </div>

      {/* Tabela */}
      <div className={styles.card}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginBottom: '1rem',
          }}
        >
          <h3>Histórico de abastecimentos</h3>
          <span className={styles.kpiSub}>3 registros</span>
        </div>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Veículo / placa</th>
              <th>Motorista</th>
              <th>Data</th>
              <th>Combustível</th>
              <th>Litros</th>
              <th>Preço / L</th>
              <th>Total</th>
              <th>Hodômetro</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <strong>SVO-01 · Fiorino</strong>
                <br />
                <span className={styles.subText}>ABC-1D23</span>
              </td>
              <td>Marina Costa</td>
              <td>
                21/10/2026
                <br />
                <span className={styles.subText}>09:40</span>
              </td>
              <td>Gasolina</td>
              <td>30,00 L</td>
              <td>R$ 8,50</td>
              <td>R$ 255,00</td>
              <td>45.320 km</td>
            </tr>
            <tr>
              <td>
                <strong>SVO-01 · Fiorino</strong>
                <br />
                <span className={styles.subText}>ABC-1D23</span>
              </td>
              <td>Paulo Lima</td>
              <td>
                14/10/2026
                <br />
                <span className={styles.subText}>08:15</span>
              </td>
              <td>Gasolina</td>
              <td>35,00 L</td>
              <td>R$ 8,50</td>
              <td>R$ 297,50</td>
              <td>45.010 km</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}
