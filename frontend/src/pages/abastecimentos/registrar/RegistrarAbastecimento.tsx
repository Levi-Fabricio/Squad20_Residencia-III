import { useState } from 'react'
import { PageHeader } from '@/components/PageHeader'
import { Button } from '@/components/Button'
import { ButtonLink } from '@/components/ButtonLink'
import { TextField } from '@/components/TextField'
import { SelectField } from '@/components/SelectField'
import styles from './RegistrarAbastecimento.module.scss'

export default function RegistrarAbastecimento() {
  const [volume, setVolume] = useState('')
  const [preco, setPreco] = useState('')
  const [hodometro, setHodometro] = useState('')
  const [dataHora, setDataHora] = useState('')
  const [posto, setPosto] = useState('')

  const total = (
    parseFloat(volume.replace(',', '.')) * parseFloat(preco.replace(',', '.')) || 0
  )
    .toFixed(2)
    .replace('.', ',')

  return (
    <div className={styles.page}>
      <PageHeader
        title="Registrar abastecimento"
        subtitle="Registre a despesa e mantenha o histórico do veículo atualizado."
      />

      <div className={styles.layoutGrid}>
        <form className={styles.formColumn}>
          <section className={styles.card}>
            <h2 className={styles.cardTitle}>Veículo e responsável</h2>

            <div className={styles.fieldsGrid}>
              <SelectField
                label="Veículo *"
                value="svo-01"
                options={[{ value: 'svo-01', label: 'SVO-01 · Fiat Fiorino 1.4' }]}
                onChange={() => {}}
              />
              <SelectField
                label="Motorista *"
                value="marina"
                options={[{ value: 'marina', label: 'Marina Costa' }]}
                onChange={() => {}}
              />
              <TextField
                label="Data e horário *"
                type="datetime-local"
                value={dataHora}
                onChange={setDataHora}
              />
            </div>
          </section>

          <section className={styles.card}>
            <h2 className={styles.cardTitle}>Dados da despesa</h2>

            <div className={styles.fieldsGrid}>
              <SelectField
                label="Combustível *"
                value=""
                options={[
                  { value: 'gasolina', label: 'Gasolina' },
                  { value: 'etanol', label: 'Etanol' },
                  { value: 'diesel', label: 'Diesel' },
                ]}
                onChange={() => {}}
              />
              <TextField
                label="Hodômetro *"
                placeholder="Ex.: 45.320 km"
                value={hodometro}
                onChange={setHodometro}
              />
              <TextField
                label="Volume abastecido *"
                placeholder="Ex.: 30,00 L"
                value={volume}
                onChange={setVolume}
              />
              <TextField
                label="Preço por litro *"
                placeholder="Ex.: 8,50"
                value={preco}
                onChange={setPreco}
              />
              <TextField
                label="Posto *"
                placeholder="Ex.: Posto Sul"
                value={posto}
                onChange={setPosto}
              />
            </div>

            <div className={styles.totalBox}>
              <span>Total calculado</span>
              <strong>R$ {total}</strong>
            </div>
          </section>

          <div className={styles.actions}>
            <ButtonLink to="/abastecimentos" variant="secondary">
              Cancelar
            </ButtonLink>
            <Button type="button" onClick={() => alert('Salvar clicado')}>
              Salvar abastecimento
            </Button>
          </div>
        </form>

        {/* Coluna Direita - Resumos */}
        <div className={styles.summaryColumn}>
          <div className={styles.card}>
            <h3 className={styles.cardTitle}>SVO-01 · Fiat Fiorino 1.4</h3>
            <p className={styles.subtitle}>Placa: ABC-1D23</p>
            <p className={styles.subtitle}>45.320 km · Administrativa · Flex · 58 L</p>
          </div>
          <div className={styles.card}>
            <h3 className={styles.cardTitle}>Impacto no teto mensal</h3>
            <div className={styles.progressInfo}>
              <span>R$ 595,00</span> <span>59,5% do teto</span>
            </div>
            <div className={styles.progressBar}>
              <div style={{ width: '59.5%' }}></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
