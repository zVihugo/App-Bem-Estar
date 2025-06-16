import React from 'react';
import styles from './cardhumor.module.css';
import { useNavigate } from 'react-router-dom';
const CardHumor = () => {
    const navigate = useNavigate();
    const handleClick = () => {
        navigate('/Relatorios');
    }
    return (
        <div className={styles.card_humor}>
            <p>📊 Seu humor nos últimos dias</p>
            <button onClick={handleClick}>Ver Relatórios</button>
            <span>Tendência: Você tem se sentido mais calmo 😊</span>
      </div>
    );
};

export default CardHumor;