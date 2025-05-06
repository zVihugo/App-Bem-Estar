import React from 'react';
import styles from './cardformlogin.module.css'

const CardForm = () => {
    return(
        <div className={styles.card_formlogin}>
            <form className={styles.form}>
                <h2 className={styles.title}> Login</h2>
                <label htmlFor='email' className={styles.label}>Email</label>
                <input 
                    type='Email'
                    id='Email'
                    name='email'
                    className={styles.input}
                    onInvalid={(e) => e.target.setCustomValidity('Por favor, insira um endereço de email válido.')}
                    onInput={(e) => e.target.setCustomValidity('')}
                    required
                />  

                <label htmlFor='senha' className={styles.label} >Senha</label>
                <input
                    type='password'
                    id='senha'
                    name='senha'
                    className={styles.input}
                    onInvalid={(e) => e.target.setCustomValidity('Por favor, insira uma senha válida.')}
                    onInput={(e) => e.target.setCustomValidity('')}
                    required
                />

                <button type='submit' className={styles.button}>Entrar</button>
            
                <p className={styles.registro}>
                    Não possui conta? <a href='/Register'>Criar</a>
                </p>
            </form>
        </div>
    )
}

export default CardForm

