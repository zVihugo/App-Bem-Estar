import React from 'react';
import styles from './cardcrise.module.css';

const CardCrise = () => {
  return (
    <div className={styles.card_crise}>
      <div className={styles.card_contenudo}>
        <h2>🚨 Estou em crise </h2>

        <div className={styles.botao_grupo}>
          <button className={styles.btn}>Ligar para 188 (CVV)</button>
          <button className={styles.btn}>
            <a href="https://www.cvv.org.br/chat/" target="_blank" rel="noopener noreferrer">Chat de apoio</a>
          </button>
        </div>
      </div>
    </div>
  );
};

export default CardCrise;
