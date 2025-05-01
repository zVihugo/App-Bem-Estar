import React from 'react';
import styles from './cardcrise.module.css';

const CardCrise = () => {
  return (
    <div className={styles.card_crise}>
      <div className={styles.card_contenudo}>
        <h2>🚨 Estou em crise </h2>

        <div className={styles.botao_grupo}>
          <button className={styles.btn}>Ligar para 188 (CVV)</button>
          <button className={styles.btn}>Chat de apoio</button>
        </div>
      </div>
    </div>
  );
};

export default CardCrise;
