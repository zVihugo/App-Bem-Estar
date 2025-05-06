import React, { useState } from 'react';
import styles from './cardformregistro.module.css';

const CardFormRegistro = () => {
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    senha: '',
    confirmarSenha: '',
  });

  const [erro, setErro] = useState('');

  const handleChange = (e) => {
    setFormData({ 
      ...formData, 
      [e.target.name]: e.target.value 
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.senha !== formData.confirmarSenha) {
      setErro('As senhas não coincidem');
      return;
    }

    setErro('');
    console.log('Dados cadastrados:', formData);
    alert('Cadastro realizado com sucesso!');
  };

  return (
    <div className={styles.card_formlogin}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h2 className={styles.title}>Cadastro</h2>

        <label htmlFor='nome' className={styles.label}>Nome completo</label>
        <input 
          type='text'
          id='nome'
          name='nome'
          className={styles.input}
          value={formData.nome}
          onChange={handleChange}
          placeholder='Nome completo'
          onInvalid={(e) => e.target.setCustomValidity('Por favor, insira um nome válido.')}
          onInput={(e) => e.target.setCustomValidity('')}
          required
        />

        <label htmlFor='email' className={styles.label}>E-mail</label>
        <input 
          type='email'
          id='email'
          name='email'
          className={styles.input}
           placeholder='E-mail'
          value={formData.email}
          onInvalid={(e) => e.target.setCustomValidity('Por favor, insira um endereço de email válido.')} 
          onInput={(e) => e.target.setCustomValidity('')}
          onChange={handleChange}
          required
        />

        <label htmlFor='date' className={styles.label}>Data de nascimento</label>
        <input 
          type='text'
          id='date'
          name='date'
          placeholder='Data de nascimento'
          className={styles.input}
          value={formData.data}
          onChange={handleChange}
          onInvalid={(e) => e.target.setCustomValidity('Por favor, insira uma data válida.')}
          onInput={(e) => e.target.setCustomValidity('')}
          required
        />

        <label htmlFor='nome' className={styles.label}>Faculdade</label>
        <input 
          type='text'
          id='faculdade'
          name='faculdade'
          placeholder='Faculdade'
          className={styles.input}
          value={formData.faculdade}
          onChange={handleChange}
          onInvalid={(e) => e.target.setCustomValidity('Por favor, insira um nome válido.')}
          onInput={(e) => e.target.setCustomValidity('')}
          required
        />

        <label htmlFor='senha' className={styles.label}>Senha</label>
        <input
          type='password'
          id='senha'
          name='senha'
          placeholder='Senha'
          className={styles.input}
          value={formData.senha}
          onChange={handleChange}
          onInvalid={(e) => e.target.setCustomValidity('Por favor, insira uma senha válida.')}
          onInput={(e) => e.target.setCustomValidity('')}
          required
        />

        <label htmlFor='confirmarSenha' className={styles.label}>Confirmar senha</label>
        <input
          type='password'
          id='confirmarSenha'
          name='confirmarSenha'
          placeholder='Confirmar senha'
          className={styles.input}
          value={formData.confirmarSenha}
          onChange={handleChange}
          required
        />

        {erro && <p className={styles.erro}>{erro}</p>}

        <button type='submit' className={styles.button}>Cadastrar</button>

        <p className={styles.registro}>
                    Já possui conta? <a href='/Auth'>Entrar</a>
        </p>
      </form>
    </div>
  );
};

export default CardFormRegistro;
