import React, { useState } from 'react';
import styles from './addDicasModal.module.css'; 

const AddContentModal = ({ isOpen, onClose, onAddContent }) => {
  const [title, setTitle] = useState('');
  const [type, setType] = useState('video');
  const [thumbnailUrl, setThumbnailUrl] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddContent({ title, type, thumbnailUrl });
    setTitle('');
    setType('video');
    setThumbnailUrl('');
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
            <label htmlFor="title">Título</label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="type">Tipo</label>
            <select
              id="type"
              value={type}
              onChange={(e) => setType(e.target.value)}
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