import React, { useState } from 'react'
import Cardsetedias from '../../components/Card-Rel7Dias/cardsetedias'
import Cardtrintadias from '../../components/Card-Rel30Dias/cardtrintadias'
import styles from './Relatorios.module.css'

const Relatorios = () => {
  const [relatorio, setRelatorio] = useState(null)

  const handleClick = (tipo) => {
    setRelatorio(relatorio === tipo ? null : tipo)
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.titulo}>Relatórios de Bem-Estar</h1>
      <div className={styles.botoes}>
        <button
          onClick={() => handleClick('7dias')}
          className={`${styles.botao} ${relatorio === '7dias' ? styles.isActive : ''}`}
        >
          Últimos 7 dias
        </button>
        <button
          onClick={() => handleClick('30dias')}
          className={`${styles.botao} ${relatorio === '30dias' ? styles.isActive : ''}`}
        >
          Últimos 30 dias
        </button>
      </div>
      {relatorio === '7dias' && <Cardsetedias />}
      {relatorio === '30dias' && <Cardtrintadias />}
    </div>
  )
}

export default Relatorios