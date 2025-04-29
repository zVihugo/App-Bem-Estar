import React from 'react';
import styles from './cardhumor.module.css';
const CardHumor = () => {
    return (
        <div className={styles.card_humor}>
            <p>📊 Seu humor nos últimos dias</p>
            <button>Ver Relatórios</button>
            <span>Tendência: Você tem se sentido mais calmo 😊</span>
        </div>
    );
};

export default CardHumor;