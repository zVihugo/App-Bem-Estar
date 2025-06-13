import React, { useState }  from 'react'
import CardAutoAjuda from '../../components/CardAutoAjuda/cardautoajuda'
import { Plus } from 'lucide-react';
import styles from './autoajuda.module.css';
import AddContentModal from '../../components/addDicasModal/addDicasModal';
import { v4 as uuidv4 } from 'uuid';

const initialConteudo = [
  {
    id: '1',
    title: 'Exercício de Respiração Consciente',
    type: 'video',
    thumbnailUrl: 'https://images.pexels.com/photos/3822906/pexels-photo-3822906.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    link: 'https://www.youtube.com/watch?v=sJ6gDy_ge3U' 
  },
  {
    id: '2',
    title: 'Meditação guiada para ansiedade',
    type: 'audio',
    thumbnailUrl: 'https://images.pexels.com/photos/3560044/pexels-photo-3560044.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    link: 'https://open.spotify.com/episode/3GTRgR3p1b5fC5y0r7KjL8' 
  },
  {
    id: '3',
    title: 'Como identificar sinais de burnout',
    type: 'article',
    thumbnailUrl: 'https://images.pexels.com/photos/897817/pexels-photo-897817.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    link: 'https://www.tuasaude.com/sindrome-de-burnout/' 
  },
  {
    id: '4',
    title: 'Exercício de Respiração Consciente - Parte 2',
    type: 'video',
    thumbnailUrl: 'https://images.pexels.com/photos/3094230/pexels-photo-3094230.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    link: 'https://www.youtube.com/watch?v=UJBknAsxfrA'
  },
  {
    id: '5',
    title: 'Exercício de Respiração Consciente - Parte 3',
    type: 'video',
    thumbnailUrl: 'https://images.pexels.com/photos/3759657/pexels-photo-3759657.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    link: 'https://www.youtube.com/watch?v=UJBknAsxfrA',
  },
  {
    id: '6',
    title: 'Exercício de Respiração Consciente - Avançado',
    type: 'video',
    thumbnailUrl: 'https://images.pexels.com/photos/3771836/pexels-photo-3771836.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    link: 'https://www.youtube.com/watch?v=UJBknAsxfrA',
  }
];

const Autoajuda = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [conteudo, setConteudo] = useState(initialConteudo);

  const handleAddContent = (newContent) => {
    setConteudo(prevConteudo => [...prevConteudo, { ...newContent, id: uuidv4() }]);
  };


  return (
    <>
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
          <button className={styles.autoajuda_add_button} onClick={() => setIsModalOpen(true)}> 
            <Plus size={25}/>
          </button>
        </div>
      </div>
      <AddContentModal 
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onAddContent={handleAddContent}
        />
    </>
  );
}

export default Autoajuda