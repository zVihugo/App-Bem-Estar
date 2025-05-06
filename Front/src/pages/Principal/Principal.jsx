import React from 'react'
import CardAutoajuda from '../../components/Card-Autoajuda/cardautoajuda'
import CardMetas from '../../components/Card-Metas/cardmetas'
import styles from './principal.module.css'
import { useNavigate } from 'react-router-dom';

const Principal = () => {
  const navigate = useNavigate();
    const handleClick_autoavaliacao = () => {
        navigate('/Autoavaliacao');
    }
    const handleClick_relatorio = () => {
        navigate('/Relatorios');
    }
  return (
    <div className='principal'>
      <div className={styles.card_welcome}>
        <h1>Olá, Fulano! 😊 </h1>
        <h2>Como você está se sentido hoje?</h2>
      </div>
      <div className={styles.card_autoavaliacao}>
        <p>😌 Faça sua autoavaliação de hoje</p>
        <button onClick={handleClick_autoavaliacao}>Avaliar Agora</button>
        <p>Progresso: <span>1/3 Avaliações esta semana</span></p>
      </div>
      <div className={styles.card_humor}>
            <p>📊 Seu humor nos últimos dias</p>
            <button onClick={handleClick_relatorio}>Ver Relatórios</button>
            <span>Tendência: Você tem se sentido mais calmo 😊</span>
      </div>
      <CardAutoajuda />
      <CardMetas />
    </div>
  )
}

export default Principal