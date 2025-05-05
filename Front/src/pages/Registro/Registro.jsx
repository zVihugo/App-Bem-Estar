import React, { useState } from 'react'
import './Registro.css'

const Registro = () => {

  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    senha: '',
    confirmarSenha: '',
  });

  const [erro, setErro] = useState('')

  // Atualiza os valores do formulário conforme o usuário digita
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Trata o envio do formulário
  const handleSubmit = (e) => {
    e.preventDefault();

    if(formData.senha != formData.confirmarSenha) {
      setErro('As senhas não coincidem')
      return
    }

    setErro('')

    console.log('Dados cadastrados:', formData)
    alert('Cadastro realizado com sucesso!')
  }

  return (
    <div className='register-container'>
      <form className='register-form' onSubmit={handleSubmit}>
        <h2>Cadastro</h2>

        <label htmlFor='nome'>Nome completo</label>
        <input 
          type='text'
          id='nome'
          name='nome'
          value={formData.nome}
          onChange={handleChange}
          required
        />

        <label htmlFor='email'>E-mail</label>
        <input
          type='email'
          id='email'
          name='email'
          value={formData.email}
          onChange={handleChange}
          required
        />

        <label htmlFor='senha'>Senha</label>
        <input
          type='password'
          id='senha'
          name='senha'
          value={formData.senha}
          onChange={handleChange}
          required
        />

        <label htmlFor='confirmarSenha'>Confirmar senha</label>
        <input
          type='password'
          id='confirmarSenha'
          name='confirmarSenha'
          value={formData.confirmarSenha}
          onChange={handleChange}
          required
        />

        {erro && <p className='erro'>{erro}</p>}

        <button type='submit'>Cadastrar</button>
      </form>
    </div>
  )
}

export default Registro