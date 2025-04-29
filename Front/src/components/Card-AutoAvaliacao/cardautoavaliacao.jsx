import React from 'react';
import styles from './cardautoavaliacao.module.css';

const CardAutoAvaliacao = () => {
    return (
        <div className={styles.card_autoavaliacao}>
            <p>😌 Faça sua autoavaliação de hoje</p>
            <button>Avaliar Agora</button>
            <p>Progresso: <span>1/3 Avaliações esta semana</span></p>
        </div>
    );
};

export default CardAutoAvaliacao;