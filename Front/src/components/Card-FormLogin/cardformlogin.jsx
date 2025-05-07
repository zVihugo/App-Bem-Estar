import React from 'react';
import styles from './cardformlogin.module.css'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import api from '../../services/api';

const CardForm = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [senha,setSenha] = useState('');
    const [erro, setErro] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
      
        try {
            const response = await api.post('/auth/login', {
                email,
                password: senha,
            });

            if (response.status === 200) {
                console.log('Login bem-sucedido:', response.data);
                localStorage.setItem('token', response.data.user.token); 
                localStorage.setItem('Id', JSON.stringify(response.data.user.user.id));

                navigate('/Inicial'); 
            }
        } catch (error) {
            if (error.response) {
                setErro(error.response.data.error || 'Erro ao realizar o login.');
            } else {
                setErro('Erro de rede. Tente novamente mais tarde.');
            }
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

