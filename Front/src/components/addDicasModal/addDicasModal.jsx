import React, { useState } from 'react';
import styles from './addDicasModal.module.css';

const AddContentModal = ({ isOpen, onClose, onAddContent }) => {
  const [titulo, setTitulo] = useState('');
  const [tipo, setTipo] = useState('video');
  const [thumbnailUrl, setThumbnailUrl] = useState('');
  const [link, setLink] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddContent({ titulo, tipo, thumbnailUrl, link });
    setTitulo('');
    setTipo('video');
    setThumbnailUrl('');
    setLink('');
    onClose();
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <h2>Adicionar Novo Conteúdo</h2>
        <form onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label htmlFor="titulo">Título</label>
            <input
              type="text"
              id="titulo"
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="tipo">Tipo</label>
            <select
              id="tipo"
              value={tipo}
              onChange={(e) => setTipo(e.target.value)}
            >
              <option value="video">Vídeo</option>
              <option value="audio">Áudio</option>
              <option value="article">Artigo</option>
            </select>
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="thumbnailUrl">URL da Thumbnail</label>
            <input
              type="text"
              id="thumbnailUrl"
              value={thumbnailUrl}
              onChange={(e) => setThumbnailUrl(e.target.value)}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="link">Link do Conteúdo</label>
            <input
              type="url"
              id="link"
              value={link}
              onChange={(e) => setLink(e.target.value)}
              placeholder="https://exemplo.com"
              required
            />
          </div>
          <div className={styles.formActions}>
            <button type="button" onClick={onClose} className={styles.cancelButton}>
              Cancelar
            </button>
            <button type="submit" className={styles.addButton}>
              Adicionar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddContentModal;