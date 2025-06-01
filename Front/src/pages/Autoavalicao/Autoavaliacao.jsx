import React, { useState } from 'react';
import styles from './autoavalicao.module.css';
import { reviewCreate } from '../../middleware/auth';
import Cookies from 'js-cookie';

const Autoavaliacao = () => {
  const [respostas, setRespostas] = useState({});
  const id = Cookies.get('Id');
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
      id: 'DificuldadeParaDormir',
      texto: 'Com que frequência você tem dificuldade para pegar no sono?',
      opcoes: ['nunca', 'raramente', 'algumas_Vezes', 'frequentemente', 'quase_Sempre'],
    },
    {
      id: 'AcordaDescansado',
      texto: 'Você sente que acorda descansado(a) pela manhã?',
      opcoes: ['sempre', 'algumas_Vezes', 'raramento', 'nunca'],
    },
    {
      id: 'SofreComSonoDuranteODia',
      texto: 'Durante o dia, você sente muito sono ou dificuldade de concentração?',
      opcoes: ['nunca', 'raramento', 'frequentemente', 'sempre'],
    },
    {
      id: 'UsaTelaAntesDeDormir',
      texto: 'Você costuma usar celular ou computador na cama antes de dormir?',
      opcoes: ['nunca', 'raramente', 'algumas_Vezes', 'frequentemente', 'quase_Sempre'],
    },
    {
      id: 'TemRotinaDeSono',
      texto: 'Você tem uma rotina de horários regulares para dormir e acordar?',
      opcoes: [{
        label: 'Sim', value: true
      }, {
        label: 'Não', value: false

      }],
    },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRespostas((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e, { }) => {
    e.preventDefault();
    if (Object.keys(respostas).length !== 6) {
      alert('Por favor, responda todas as perguntas antes de enviar.');
      return;
    }
    console.log('Respostas enviadas:', { ...respostas, data: new Date().toISOString().split('T')[0] });

    try {
      const response = await reviewCreate({ id, ...respostas });
      if (response) {
        alert('Autoavaliação enviada com sucesso!');
      } else {
        alert('Erro ao enviar a autoavaliação. Tente novamente mais tarde.');
      }

    } catch (error) {
      console.error('Erro ao enviar a autoavaliação:', error);
      alert('Ocorreu um erro ao enviar a autoavaliação. Por favor, tente novamente mais tarde.');
    }

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