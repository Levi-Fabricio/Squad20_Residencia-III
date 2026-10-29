import { useState } from 'react';
import styles from './RegistrarAbastecimento.module.scss';
import { Link } from 'react-router-dom';

export default function RegistrarAbastecimento() {
  // Estados para os campos
  const [volume, setVolume] = useState('');
  const [preco, setPreco] = useState('');
  const [hodometro, setHodometro] = useState('');
  const [dataHora, setDataHora] = useState(''); // Estado para a data e hora

  // Cálculo simples para o total
  const total = (parseFloat(volume.replace(',', '.')) * parseFloat(preco.replace(',', '.')) || 0).toFixed(2).replace('.', ',');

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div>
          <h1>Registrar abastecimento</h1>
          <p>Registre a despesa e mantenha o histórico do veículo atualizado.</p>
        </div>
      </header>

      <div className={styles.layoutGrid}>
        {/* Coluna Esquerda - Formulário */}
        <div className={styles.formColumn}>
          <section className={styles.card}>
            <h2>Veículo e responsável</h2>
            <p className={styles.subtitle}>Campos com * são obrigatórios.</p>
            
            <div className={styles.formGroup}>
              <label htmlFor="veiculo">Veículo *</label>
              <select id="veiculo" defaultValue="SVO-01">
                <option value="SVO-01">SVO-01 · Fiat Fiorino 1.4 · ABC-1D23</option>
              </select>
            </div>

            <div className={styles.row}>
              <div className={styles.formGroup}>
                <label htmlFor="motorista">Motorista *</label>
                <select id="motorista" defaultValue="Marina">
                  <option value="Marina">Marina Costa</option>
                </select>
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="dataHora">Data e horário *</label>
                {/* Campo nativo mostrando dd/mm/aaaa --:-- */}
                <input 
                  id="dataHora"
                  type="datetime-local" 
                  value={dataHora}
                  onChange={(e) => setDataHora(e.target.value)}
                />
              </div>
            </div>
          </section>

          <section className={styles.card}>
            <h2>Dados da despesa</h2>
            
            <div className={styles.row}>
              <div className={styles.formGroup}>
                <label htmlFor="combustivel">Combustível *</label>
                <select id="combustivel" defaultValue="">
                  <option value="" disabled>Selecione o combustível</option>
                  <option value="Gasolina">Gasolina</option>
                  <option value="Etanol">Etanol</option>
                  <option value="Diesel">Diesel</option>
                </select>
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="hodometro">Hodômetro *</label>
                <input 
                  id="hodometro"
                  type="text" 
                  placeholder="Ex.: 00.000 km" 
                  value={hodometro}
                  onChange={e => setHodometro(e.target.value)}
                />
              </div>
            </div>

            <div className={styles.row}>
              <div className={styles.formGroup}>
                <label htmlFor="volume">Volume abastecido *</label>
                <input 
                  id="volume"
                  type="text" 
                  placeholder="Ex.: 00,00 L" 
                  value={volume} 
                  onChange={e => setVolume(e.target.value)} 
                />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="preco">Preço por litro *</label>
                <input 
                  id="preco"
                  type="text" 
                  placeholder="Ex.: 00,00" 
                  value={preco} 
                  onChange={e => setPreco(e.target.value)} 
                />
              </div>
            </div>

            <div className={styles.totalBox}>
              <span>Total calculado</span>
              <span className={styles.totalValue}>R$ {total}</span>
            </div>

            <div className={styles.formGroup} style={{ marginTop: '1rem' }}>
              <label htmlFor="posto">Posto *</label>
              <input id="posto" type="text" placeholder="Ex.: Posto Sul" />
            </div>
          </section>

          <div className={styles.actions}>
            <Link to="/abastecimentos" className={styles.btnSecondary}>
              Cancelar
            </Link>
            <button className={styles.btnPrimary}>✓ Salvar abastecimento</button>
          </div>
        </div>

        {/* Coluna Direita - Resumos */}
        <div className={styles.summaryColumn}>
          <div className={styles.card}>
            <h3>SVO-01 · Fiat Fiorino 1.4</h3>
            <p className={styles.plate}>ABC-1D23</p>
            <p className={styles.vehicleInfo}>45.320 km · Administrativa · Flex · 58 L</p>
          </div>

          <div className={styles.card}>
            <h3>Impacto no teto mensal</h3>
            <p className={styles.subtitle}>Abastecimento · Outubro de 2026</p>
            <div className={styles.progressInfo}>
              <span>R$ 595,00</span> <span>59,5% do teto</span>
            </div>
            <div className={styles.progressBar}><div style={{ width: '59.5%' }}></div></div>
            
            <p className={styles.subtitle} style={{ marginTop: '1rem' }}>Este abastecimento</p>
            <strong style={{ color: '#1e40af' }}>+ R$ {total}</strong>

            <p className={styles.subtitle} style={{ marginTop: '1rem' }}>Após salvar</p>
            <div className={styles.progressInfo}>
              <span>R$ 850,00</span> <span>85% do teto</span>
            </div>
            <div className={styles.progressBarWarning}><div style={{ width: '85%' }}></div></div>
          </div>
        </div>
      </div>
    </div>
  );
}