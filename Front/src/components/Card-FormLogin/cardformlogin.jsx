import React from 'react';
import styles from './cardformlogin.module.css'

const CardForm = () => {
    return(
        <div className={styles.card_formlogin}>
            <form className={styles.form}>
                <h2 className={styles.title}> Login</h2>

                <label htmlFor='email' className={styles.label}>email</label>
                <input 
                    type='email'
                    id='emial'
                    name='email'
                    className={styles.input}
                    required
                />  

                <label htmlFor='senha' className={styles.label} >senha</label>
                <input
                    type='password'
                    id='senha'
                    name='senha'
                    className={styles.input}
                    required
                />

                <button type='submit' className={styles.button}>entrar</button>
            
                <p className={styles.registro}>
                    não pussi conta? <a href='/cadastro'>Crirar</a>
                </p>
            </form>
        </div>
    )
}

export default CardForm

