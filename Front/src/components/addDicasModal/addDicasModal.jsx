import React, { useState, useEffect } from 'react';
import styles from './addDicasModal.module.css';

const AddContentModal = ({ isOpen, onClose, onSave, editingContent }) => {
  const [titulo, setTitulo] = useState('');
  const [tipo, setTipo] = useState('video');
  const [thumbnailUrl, setThumbnailUrl] = useState('');
  const [link, setLink] = useState('');

  useEffect(() => {
    if (editingContent && isOpen) {
      setTitulo(editingContent.titulo || '');
      setTipo(editingContent.tipo || 'video');
      setThumbnailUrl(editingContent.thumbnailUrl || '');
      setLink(editingContent.link || '');
    } else {
      setTitulo('');
      setTipo('video');
      setThumbnailUrl('');
      setLink('');
    }
  }, [editingContent, isOpen]); 

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ titulo, tipo, thumbnailUrl, link });
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <h2>{editingContent ? 'Editar Conteúdo' : 'Adicionar Novo Conteúdo'}</h2>
        <form onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label htmlFor="titulo">Título</label>
            <input type="text" id="titulo" value={titulo} onChange={(e) => setTitulo(e.target.value)} required />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="tipo">Tipo</label>
            <select id="tipo" value={tipo} onChange={(e) => setTipo(e.target.value)}>
              <option value="video">Vídeo</option>
              <option value="artigo">Artigo</option>
              <option value="audio">Áudio</option>
            </select>
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="thumbnailUrl">URL da Thumbnail</label>
            <input type="text" id="thumbnailUrl" value={thumbnailUrl} onChange={(e) => setThumbnailUrl(e.target.value)} required />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="link">Link do Conteúdo</label>
            <input type="url" id="link" value={link} onChange={(e) => setLink(e.target.value)} placeholder="https://exemplo.com" required />
          </div>
          <div className={styles.formActions}>
            <button type="button" onClick={onClose} className={styles.cancelButton}>
              Cancelar
            </button>
            <button type="submit" className={styles.addButton}>
              {editingContent ? 'Salvar Alterações' : 'Adicionar'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddContentModal;