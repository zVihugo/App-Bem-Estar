import React, { useState } from 'react';
import styles from './autoavalicao.module.css';

const Autoavaliacao = () => {
  const [respostas, setRespostas] = useState({});
  const perguntas = [
    {
      id: 'sonoHoras',
      texto: 'Você costuma dormir, em média, quantas horas por noite?',
      opcoes: [
        { label: 'Menos de 4h', value: 3.5 },
        { label: 'Entre 4h e 6h', value: 5 },
        { label: 'Entre 6h e 8h', value: 7 },
        { label: 'Mais de 8h', value: 9 },
      ],
    },
    {
      id: 'dificuldadeSonoFrequencia',
      texto: 'Com que frequência você tem dificuldade para pegar no sono?',
      opcoes: ['Nunca', 'Raramente', 'Às vezes', 'Frequentemente', 'Quase sempre'],
    },
    {
      id: 'acordaDescansado',
      texto: 'Você sente que acorda descansado(a) pela manhã?',
      opcoes: ['Sempre', 'Às vezes', 'Raramente', 'Nunca'],
    },
    {
      id: 'sonolenciaDiurna',
      texto: 'Durante o dia, você sente muito sono ou dificuldade de concentração?',
      opcoes: ['Nunca', 'Raramente', 'Frequentemente', 'Sempre'],
    },
    {
      id: 'usoTelaAntesDormir',
      texto: 'Você costuma usar celular ou computador na cama antes de dormir?',
      opcoes: ['Nunca', 'Raramente', 'Às vezes', 'Quase sempre', 'Sempre'],
    },
    {
      id: 'temRotinaSono',
      texto: 'Você tem uma rotina de horários regulares para dormir e acordar?',
      opcoes: ['Sim', 'Não'],
    },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRespostas((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if(Object.keys(respostas).length !== 6) {
      alert('Por favor, responda todas as perguntas antes de enviar.');
      return;
    }
    console.log('Respostas enviadas:', { ...respostas, data: new Date().toISOString().split('T')[0] });
    setRespostas({}); 
  };

  return (
    <div className={styles.autoavaliacaoContainer}>
      <form onSubmit={handleSubmit}>
        {perguntas.map((pergunta) => (
          <div key={pergunta.id} className={styles.card}>
            <h1>{pergunta.texto}</h1>
            {pergunta.opcoes.map((opcao) => (
              <label key={opcao.value || opcao}>
                <input
                  type="radio"
                  name={pergunta.id}
                  value={opcao.value || opcao}
                  onChange={handleChange}
                />
                {opcao.label || opcao}
              </label>
            ))}
          </div>
        ))}
        <button type="submit" className={styles.submitButton}>Enviar</button>
      </form>
    </div>
  );
};

export default Autoavaliacao;