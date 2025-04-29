import React from 'react';
import styles from './cardwelcome.module.css'

const CardWelcome = () => {
    return (
        <div className={styles.card_welcome}>
            <h1>Olá, Fulano! 😊 </h1>
            <h2>Como você está se sentido hoje?</h2>
        </div>
    );
};

export default CardWelcome;