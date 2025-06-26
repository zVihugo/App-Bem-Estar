import { useState, useEffect } from 'react';
import styles from './addDicasModal.module.css';

const AddContentModal = ({ isOpen, onClose, onSave, editingContent }) => {
  const [titulo, setTitulo] = useState('');
  const [tipo, setTipo] = useState('video');
  const [thumbnailUrl, setThumbnailUrl] = useState('');
  const [link, setLink] = useState('');
  const [erro, setErro] = useState({});

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
    const novoErro = {};
    if (!titulo) novoErro.titulo = 'O campo título é obrigatório';
    if (!link) novoErro.link = 'O campo link é obrigatório';

    const defaultThumbnail = 'https://plus.unsplash.com/premium_photo-1682310144714-cb77b1e6d64a?q=80&w=1212&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';

    setErro(novoErro);

    if (Object.keys(novoErro).length === 0) {
      onSave({ titulo, tipo, thumbnailUrl: thumbnailUrl || defaultThumbnail, link });
    }  
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
            <input type="text" id="titulo" value={titulo} onChange={(e) => setTitulo(e.target.value)} />
            {erro.titulo && <p className={styles.erro}>{erro.titulo}</p>}
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
            <input type="text" id="thumbnailUrl" value={thumbnailUrl} onChange={(e) => setThumbnailUrl(e.target.value)} placeholder="https://thumbnail.com"/>
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="link">Link do Conteúdo</label>
            <input type="url" id="link" value={link} onChange={(e) => setLink(e.target.value)} placeholder="https://exemplo.com" />
            {erro.link && <p className={styles.erro}>{erro.link}</p>}
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