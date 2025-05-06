import React from 'react'
import CardAutoajuda from '../../components/Card-Autoajuda/cardautoajuda'
import CardMetas from '../../components/Card-Metas/cardmetas'
import CardAutoavaliacao from '../../components/Card-AutoAvaliacao/cardautoavaliacao'
import CardHumor from '../../components/Card-Humor/cardhumor'
import styles from './principal.module.css'

const Principal = () => {

  return (
    <div className='principal'>
      <div className={styles.card_welcome}>
        <h1>Olá, Fulano! 😊 </h1>
        <h2>Como você está se sentido hoje?</h2>
      </div>
      <div className={styles.cardsGrid}>
        <CardAutoavaliacao />
        <CardHumor />
        <CardAutoajuda />
        <CardMetas />
      </div>
      <div className={styles.card_ajuda}>
        <p>💬 Precisa de ajuda agora?</p>
        <button>Falar com um profissional</button>
      </div>
    </div>
  )
}

export default Principal