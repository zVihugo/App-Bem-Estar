import React, { useState, useEffect } from 'react';
import styles from './autoavalicao.module.css';
import { reviewCreate } from '../../middleware/auth';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const Autoavaliacao = () => {
  const [respostas, setRespostas] = useState({});
  const [sucesso, setSucesso] = useState(false);
  const navigate = useNavigate();
  const id = Cookies.get('Id');

  useEffect(() => {
    if (sucesso) {
      const timer = setTimeout(() => {
        navigate('/Autoavaliacao');
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [sucesso, navigate]);

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
      opcoes: [
        { label: 'Nunca', value: 'nunca' },
        { label: 'Raramente', value: 'raramente' },
        { label: 'Algumas vezes', value: 'algumas_vezes' },
        { label: 'Frequentemente', value: 'frequentemente' },
        { label: 'Quase sempre', value: 'quase_sempre' },
      ]
    },
    {


      id: 'AcordaDescansado',
      texto: 'Você sente que acorda descansado(a) pela manhã?',
      opcoes: [
        { label: 'Sempre', value: 'sempre' },
        { label: 'Algumas vezes', value: 'algumas_vezes' },
        { label: 'Raramente', value: 'raramente' },
        { label: 'Nunca', value: 'nunca' },
      ]

    },
    {

      id: 'SofreComSonoDuranteODia',
      texto: 'Durante o dia, você sente muito sono ou dificuldade de concentração?',
      opcoes: [
        { label: 'Nunca', value: 'nunca' },
        { label: 'Raramente', value: 'raramente' },
        { label: 'Frequentemente', value: 'frequentemente' },
        { label: 'Sempre', value: 'sempre' },
      ]

    },
    {
      id: 'UsaTelaAntesDeDormir',
      texto: 'Você costuma usar celular ou computador na cama antes de dormir?',
      opcoes: [
        { label: 'Nunca', value: 'nunca' },
        { label: 'Raramente', value: 'raramente' },
        { label: 'Algumas vezes', value: 'algumas_vezes' },
        { label: 'Frequentemente', value: 'frequentemente' },
        { label: 'Quase sempre', value: 'quase_sempre' },
      ]
    },
    {
      id: 'TemRotinaDeSono',
      texto: 'Você tem uma rotina de horários regulares para dormir e acordar?',
      opcoes: [{
        label: 'Sim', value: "true"
      }, {
        label: 'Não', value: "false"

      }],
    },
  ];
  const handleChange = (e) => {
    const { name, value } = e.target;
    setRespostas((prev) => ({
      ...prev,
      [name]: name === "sonoHoras"
        ? Number(value)
        : name === "TemRotinaDeSono"
          ? value
          : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (Object.keys(respostas).length !== 6) {
      alert('Por favor, responda todas as perguntas antes de enviar.');
      return;
    }

    const payload = {
      userId: id,
      mediaSono: respostas.sonoHoras,
      dificuldadeParaDormir: respostas.DificuldadeParaDormir,
      acordaDescansado: respostas.AcordaDescansado,
      sofreComSonoDuranteODia: respostas.SofreComSonoDuranteODia,
      usaTelaAntesDeDormir: respostas.UsaTelaAntesDeDormir,
      temRotinaDeSono: respostas.TemRotinaDeSono === "true" ? true : false,
      data: new Date().toISOString().split('T')[0]
    };

    try {
      const response = await reviewCreate(payload);
      console.log('Resposta do servidor:', response);
      if (response) {
        setSucesso(true); 
        setTimeout(() => {
          window.location.reload();
        }, 1500);
      } else {
        alert('Ocorreu um erro ao enviar a autoavaliação.');
      }
    } catch (error) {
      console.error('Erro ao enviar a autoavaliação:', error);
      alert('Ocorreu um erro ao enviar a autoavaliação. ');
    }

    setRespostas({});
  };

  return (
    <div className={styles.autoavaliacaoContainer}>
      <form onSubmit={handleSubmit}>

        {perguntas.map((pergunta) => (
          <div key={pergunta.id} className={styles.card}>
            <h1>{pergunta.texto}</h1>
            {pergunta.opcoes.map((opcao) => {
              const value = typeof opcao === 'object' ? opcao.value : opcao;
              const label = typeof opcao === 'object' ? opcao.label : opcao;
              return (
                <label key={value}>
                  <input
                    type="radio"
                    name={pergunta.id}
                    value={value}
                    onChange={handleChange}
                    checked={respostas[pergunta.id] === value}
                  />
                  {label}
                </label>
              );
            })}
          </div>
        ))}
        {sucesso && (
          <div className={styles.sucesso}>
            Avaliação registrada com sucesso!<br />
            
          </div>
        )}
        <button type="submit" className={styles.submitButton}>Enviar</button>
      </form>
    </div>
  );
};

export default Autoavaliacao;