import React from 'react';
import styles from './cardformlogin.module.css'
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { login } from '../../middleware/auth';


const CardForm = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [senha,setSenha] = useState('');
    const [erro, setErro] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErro('');

        try{
            const response = await login({
                email: email,
                password: senha,
            })

            if(response){
               
                alert('Login realizado com sucesso!');
                navigate('/Inicial')
            }
        }catch(error){
            setErro(error);

        }
    }

    return(
        <div className={styles.card_formlogin}>
            <form className={styles.form}>
                <h2 className={styles.title}> Login</h2>
                <label htmlFor='email' className={styles.label}>Email</label>
                <input 
                    type='Email'
                    id='Email'
                    name='email'
                    placeholder='Email'
                    onChange={(e) => setEmail(e.target.value)}
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
                    onChange={(e) => setSenha(e.target.value)}
                    placeholder='Senha'
                    onInvalid={(e) => e.target.setCustomValidity('Por favor, insira uma senha válida.')}
                    onInput={(e) => e.target.setCustomValidity('')}
                    required
                />

                <button type='submit' onClick={handleSubmit} className={styles.button}>Entrar</button>
                  {erro && <p className={styles.erro}>{erro}</p>}
                <p className={styles.registro}>
                    Não possui conta? <a href='/Register'>Criar</a>
                </p>
            </form>
        </div>
    )
}

export default CardForm

