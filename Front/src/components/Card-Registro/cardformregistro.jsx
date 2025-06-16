import React, { useState, useEffect } from 'react';
import styles from './cardformregistro.module.css';
import { useNavigate } from 'react-router-dom'
import { register } from '../../middleware/auth';

const CardFormRegistro = () => {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [nome, setNome] = useState('');
  const [data, setData] = useState('');
  const [faculdade, setFaculdade] = useState('');
  const [curso, setCurso] = useState('');
  const [erro, setErro] = useState('');
  const [sucesso, setSucesso] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (sucesso) {
      const timer = setTimeout(() => {
        navigate('/Auth');
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [sucesso, navigate]);

  const handleSubmit = async (e) => {
  e.preventDefault();
  setErro('');

  if (senha !== confirmarSenha) {
    setErro('As senhas não coincidem.');
    return;
  }

  try {
    const response = await register({
      name: nome,
      email: email,
      senha: senha, 
      dataDeNascimento: data,
      faculdade: faculdade,   
      curso: curso,    
    });

    if (response) {
      setSucesso(true);
      setEmail('');
      setSenha('');
      setConfirmarSenha('');
      setNome('');
      setData('');
      setFaculdade('');
      setCurso('');
    }
  } catch (response) {
    if (Array.isArray(response) && response[0]?.message) {
      setErro(response[0].message);
    } else if (response?.message) {
      setErro(response.message);
    } else {
      setErro('Ocorreu um erro ao registrar. Por favor, tente novamente.');
    }
    console.log(response);
  }
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
          value={nome}
          onChange={(e) => setNome(e.target.value)}
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
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onInvalid={(e) => e.target.setCustomValidity('Por favor, insira um endereço de email válido.')}
          onInput={(e) => e.target.setCustomValidity('')}

          required
        />

        <label htmlFor='date' className={styles.label}>Data de nascimento</label>
        <input
          type='text'
          id='date'
          name='date'
          placeholder='Data de nascimento'
          className={styles.input}
          value={data}
          onChange={(e) => setData(e.target.value)}
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
          value={faculdade}
          onChange={(e) => setFaculdade(e.target.value)}
          onInvalid={(e) => e.target.setCustomValidity('Por favor, insira um nome válido.')}
          onInput={(e) => e.target.setCustomValidity('')}
          required
        />
        <label htmlFor='curso' className={styles.label}>Curso</label>
        <input
          type='text'
          id='curso'
          name='curso'
          placeholder='Insira seu curso'
          className={styles.input}
          value={curso}
          onChange={(e) => setCurso(e.target.value)}
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
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
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
          value={confirmarSenha}
          onChange={(e) => setConfirmarSenha(e.target.value)}
          onInvalid={(e) => e.target.setCustomValidity('Por favor, insira uma senha válida.')}
          onInput={(e) => e.target.setCustomValidity('')}
          required
        />

        {erro && <p className={styles.erro}>{erro}</p>}
        {sucesso && (
          <div className={styles.sucesso}>
            Registro realizado com sucesso!<br />
            Redirecionando...
          </div>
        )}
        <button type='submit' className={styles.button}>Cadastrar</button>

        <p className={styles.registro}>
          Já possui conta? <a href='/Auth'>Entrar</a>
        </p>
      </form>
    </div>
  );
};

export default CardFormRegistro;
