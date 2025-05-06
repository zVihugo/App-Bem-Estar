import React from 'react'
import CardHumor from '../../components/Card-Humor/cardhumor'
import CardAutoajuda from '../../components/Card-Autoajuda/cardautoajuda'
import CardMetas from '../../components/Card-Metas/cardmetas'
import styles from './principal.module.css'
import { useNavigate } from 'react-router-dom';

const Principal = () => {
  const navigate = useNavigate();
    const handleClick = () => {
        navigate('/Autoavaliacao');
    }
  return (
    <div className='principal'>
      <div className={styles.card_welcome}>
        <h1>Olá, Fulano! 😊 </h1>
        <h2>Como você está se sentido hoje?</h2>
      </div>
      <div className={styles.card_autoavaliacao}>
        <p>😌 Faça sua autoavaliação de hoje</p>
        <button onClick={handleClick}>Avaliar Agora</button>
        <p>Progresso: <span>1/3 Avaliações esta semana</span></p>
      </div>
      <CardHumor />
      <CardAutoajuda />
      <CardMetas />
    </div>
  )
}

export default Principal