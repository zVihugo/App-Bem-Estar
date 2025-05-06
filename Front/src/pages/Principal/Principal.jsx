import React from 'react'
import CardAutoajuda from '../../components/Card-Autoajuda/cardautoajuda'
import CardMetas from '../../components/Card-Metas/cardmetas'
import CardAutoavaliacao from '../../components/Card-AutoAvaliacao/cardautoavaliacao'
import CardHumor from '../../components/Card-Humor/cardhumor'
import styles from './principal.module.css'
import { useNavigate } from 'react-router-dom';

const Principal = () => {
  const navigate = useNavigate();

    const handleClick_relatorio = () => {
        navigate('/Relatorios');
    }
  return (
    <div className='principal'>
      <div className={styles.card_welcome}>
        <h1>Olá, Fulano! 😊 </h1>
        <h2>Como você está se sentido hoje?</h2>
      </div>
      <CardAutoavaliacao />
      <CardHumor />
      <CardAutoajuda />
      <CardMetas />
    </div>
  )
}

export default Principal