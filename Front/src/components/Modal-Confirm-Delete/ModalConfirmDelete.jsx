import styles from './ModalConfirmDelete.module.css';

const ModalConfirmDelete = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay}>
    <div className={styles.modalContent}>
      <h2>Confirmar Exclusão</h2>
      <p>Tem certeza que deseja excluir esta dica? Esta ação não pode ser desfeita.</p>
      <div className={styles.actions}>
        <button className={styles.cancelButton} onClick={onClose}>Cancelar</button>
        <button className={styles.confirmButton} onClick={onConfirm}>Confirmar</button>
      </div>
    </div>
  </div>
  );
}

export default ModalConfirmDelete;