import React from 'react'
import CardAutoAjuda from '../../components/CardAutoAjuda/cardautoajuda'
import { PlusCircle } from 'lucide-react';
import styles from './autoajuda.module.css';

const conteudo = [
  {
    id: '1',
    title: 'Exercício de Respiração Consciente',
    type: 'video',
    description: 'Aprenda técnicas simples para acalmar a mente através da respiração.',
    thumbnailUrl: 'https://images.pexels.com/photos/3822906/pexels-photo-3822906.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
  },
  {
    id: '2',
    title: 'Meditação guiada para ansiedade',
    type: 'audio',
    description: 'Uma meditação de 10 minutos para reduzir sintomas de ansiedade.',
    thumbnailUrl: 'https://images.pexels.com/photos/3560044/pexels-photo-3560044.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
  },
  {
    id: '3',
    title: 'Como identificar sinais de burnout',
    type: 'article',
    description: 'Aprenda a reconhecer os sinais precoces de esgotamento profissional.',
    thumbnailUrl: 'https://images.pexels.com/photos/897817/pexels-photo-897817.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
  },
  {
    id: '4',
    title: 'Exercício de Respiração Consciente - Parte 2',
    type: 'video',
    description: 'Técnicas avançadas de respiração para momentos de estresse.',
    thumbnailUrl: 'https://images.pexels.com/photos/3094230/pexels-photo-3094230.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
  },
  {
    id: '5',
    title: 'Exercício de Respiração Consciente - Parte 3',
    type: 'video',
    description: 'Exercícios de respiração para melhorar a concentração e foco.',
    thumbnailUrl: 'https://images.pexels.com/photos/3759657/pexels-photo-3759657.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
  },
  {
    id: '6',
    title: 'Exercício de Respiração Consciente - Avançado',
    type: 'video',
    description: 'Respiração profunda para relaxamento completo do corpo e mente.',
    thumbnailUrl: 'https://images.pexels.com/photos/3771836/pexels-photo-3771836.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
  }
];

const Autoajuda = () => {
  return (
    <div className={styles.autoajuda_container}>
      <div className={styles.autoajuda_header}>
        <h1>Dicas & Autoajuda</h1>
      </div>
      <p className={styles.autoajuda_subtitle}>
        Conteúdos para te ajudar a viver melhor 🌿
      </p>
      
      <h2 className={styles.autoajuda_secao_title}>Ultimas dicas lançadas</h2>
      
      <div className={styles.autoajuda_grid}>
        {conteudo.map(content => (
          <CardAutoAjuda key={content.id} content={content} />
        ))}
      </div>
      
      <div className={styles.autoajuda_add_button_container}>
        <button className={styles.autoajuda_add_button}>
          <PlusCircle size={24} />
        </button>
      </div>
    </div>
  );
}

export default Autoajuda