import React from 'react';
import { Play, Headphones, FileText } from 'lucide-react';
import styles from './cardautoajuda.module.css';

const AutoajudaCard = ({ content }) => {
  const getActionIcon = (type) => {
    switch (type) {
      case 'video':
        return <Play size={16} />;
      case 'audio':
        return <Headphones size={16} />;
      case 'article':
        return <FileText size={16} />;
      default:
        return <Play size={16} />;
    }
  };

  const getActionLabel = (type) => {
    switch (type) {
      case 'video':
        return 'Assistir';
      case 'audio':
        return 'Ouvir';
      case 'article':
        return 'Ler artigo';
      default:
        return 'Ver mais';
    }
  };

 const handleAction = () => {
    if (content.link) {
      window.open(content.link, '_blank', 'noopener,noreferrer');
    } else {
      console.log(`Nenhum link disponível para: ${content.title}`);
    }
  };
  return (
    <div className={styles.autoajuda_card}>
      {content.thumbnailUrl && (
        <div className={styles.autoajuda_card_image}>
          <img src={content.thumbnailUrl} alt={content.title} />
        </div>
      )}
      <div className={styles.autoajuda_card_content}>
        <h3 className={styles.autoajuda_card_title}>{content.title}</h3>
        <button 
          onClick={handleAction}
          className={`${styles.autoajuda_action_button} ${content.type}`} 
          disabled={!content.link}
        >
          {getActionIcon(content.type)}
          <span>{getActionLabel(content.type)}</span>
        </button>
      </div>
    </div>
  );
};

export default AutoajudaCard;