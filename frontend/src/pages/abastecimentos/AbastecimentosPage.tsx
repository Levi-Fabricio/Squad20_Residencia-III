import { PageHeader } from '@/components/PageHeader'
import { ButtonLink } from '@/components/ButtonLink'
import { DataTable } from '@/components/DataTable'
import type { DataTableColumn } from '@/components/DataTable'
import { Toolbar } from '@/components/Toolbar'
import { TextField } from '@/components/TextField'
import { SelectField } from '@/components/SelectField'
import { Badge } from '@/components/Badge'
import styles from './AbastecimentosPage.module.scss'

// Tipagem provisória (depois você pode mover para a pasta types)
interface Abastecimento {
  id: string
  veiculo: string
  placa: string
  motorista: string
  data: string
  litros: string
  total: string
  status: 'ok' | 'alerta'
}

const MOCK_DATA: Abastecimento[] = [
  {
    id: '1',
    veiculo: 'SVO-01',
    placa: 'ABC-1D23',
    motorista: 'Marina Costa',
    data: '21/10/2026',
    litros: '30,00 L',
    total: 'R$ 255,00',
    status: 'ok',
  },
  {
    id: '2',
    veiculo: 'SVO-01',
    placa: 'ABC-1D23',
    motorista: 'Paulo Lima',
    data: '14/10/2026',
    litros: '35,00 L',
    total: 'R$ 297,50',
    status: 'alerta',
  },
]

const COLUMNS: DataTableColumn<Abastecimento>[] = [
  {
    key: 'veiculo',
    header: 'Veículo',
    isPrimary: true,
    render: (item) => (
      <>
        {item.veiculo} <br />
        <small style={{ color: 'var(--text-muted)' }}>{item.placa}</small>
      </>
    ),
  },
  { key: 'motorista', header: 'Motorista', render: (item) => item.motorista },
  { key: 'data', header: 'Data', render: (item) => item.data },
  { key: 'litros', header: 'Litros', render: (item) => item.litros },
  { key: 'total', header: 'Valor Total', render: (item) => item.total },
  {
    key: 'status',
    header: 'Status',
    render: (item) => (
      <Badge variant={item.status === 'ok' ? 'success' : 'warning'}>
        {item.status === 'ok' ? 'Dentro do teto' : 'Atenção'}
      </Badge>
    ),
  },
]

export default function AbastecimentosPage() {
  return (
    <div className={styles.page}>
      <PageHeader
        title="Gerenciamento de Abastecimentos"
        subtitle="Acompanhe os registros, volumes e teto de gastos da frota."
      />

      {/* Cards de KPI (Simulando a estrutura do DriverStats) */}
      <div className={styles.statsGrid}>
        <div className={styles.statCard}>
          <p className={styles.statLabel}>Gasto no período</p>
          <h2 className={styles.statValue}>R$ 850,00</h2>
          <p className={styles.statDesc}>SVO-01 · Outubro de 2026</p>
        </div>
        <div className={styles.statCard}>
          <p className={styles.statLabel}>Volume abastecido</p>
          <h2 className={styles.statValue}>100,00 L</h2>
          <p className={styles.statDesc}>Gasolina · 3 registros</p>
        </div>
        <div className={styles.statCard}>
          <p className={styles.statLabel}>Preço médio por litro</p>
          <h2 className={styles.statValue}>R$ 8,50</h2>
          <p className={styles.statDesc}>R$ 850,00 ÷ 100,00 L</p>
        </div>
      </div>

      <Toolbar>
        <TextField
          label="Buscar abastecimentos"
          isLabelHidden
          type="search"
          placeholder="Buscar por veículo, placa ou motorista..."
          value=""
          onChange={() => {}}
          autoComplete="off"
        />
        <SelectField
          label="Filtrar por veículo"
          isLabelHidden
          value="todos"
          options={[
            { value: 'todos', label: 'Veículo: Todos' },
            { value: 'svo01', label: 'SVO-01' },
          ]}
          onChange={() => {}}
        />
        <ButtonLink to="/abastecimentos/registrar">+ Novo Abastecimento</ButtonLink>
      </Toolbar>

      <section className={styles.list} aria-label="Abastecimentos">
        <DataTable
          caption="Lista de abastecimentos da frota"
          rows={MOCK_DATA}
          columns={COLUMNS}
          getRowKey={(item) => item.id}
          /*
          renderActions={(item) => (
            <>
              <ButtonLink variant="secondary" to={`/abastecimentos/${item.id}`}>
                Ver
              </ButtonLink>
              <ButtonLink variant="secondary" to={`/abastecimentos/editar/${item.id}`}>
                Editar
              </ButtonLink>
            </>
          )}
          */
        />
      </section>
    </div>
  )
}
