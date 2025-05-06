import React from 'react'
import CardAutoAvaliacao from '../../components/Card-AutoAvaliacao/cardautoavaliacao'
import CardHumor from '../../components/Card-Humor/cardhumor'
import CardAutoajuda from '../../components/Card-Autoajuda/cardautoajuda'
import CardMetas from '../../components/Card-Metas/cardmetas'
import styles from './principal.module.css'

const Principal = () => {
  return (
    <div className='principal'>
      <div className={styles.card_welcome}>
                  <h1>Olá, Fulano! 😊 </h1>
                  <h2>Como você está se sentido hoje?</h2>
      </div>
      <CardAutoAvaliacao />
      <CardHumor />
      <CardAutoajuda />
      <CardMetas />
    </div>
  )
}

export default Principal