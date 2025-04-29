import React from 'react';
import styles from './cardautoajuda.module.css';
const CardAutoajuda = () => {
    return (
        <div className={styles.card_autoajuda}>
            <p>✨ Dica de hoje: Respiração consciente</p>
            <span>“Pare por 3 minutos e respire fundo. Inspire... expire...”</span>
            <button>Ver exercício completo</button>
        </div>
    );
};

export default CardAutoajuda;