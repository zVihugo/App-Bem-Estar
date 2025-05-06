import React from 'react';
import styles from './RedefinirSenha.module.css';

const ModalRedefinirSenha = ({
  novaSenha,
  confirmarSenha,
  setNovaSenha,
  setConfirmarSenha,
  confirmar,
  cancelar,
}) => (
  <div className={styles.modal}>
    <div className={styles.modalContent}>
      <h2>Redefinir Senha</h2>
      <label>Nova Senha:</label>
      <input
        type="password"
        value={novaSenha}
        onChange={(e) => setNovaSenha(e.target.value)}
      />
      <label>Confirmar Senha:</label>
      <input
        type="password"
        value={confirmarSenha}
        onChange={(e) => setConfirmarSenha(e.target.value)}
      />
      <div className={styles.modalActions}>
        <button className={styles.botao} onClick={confirmar}>
          Confirmar
        </button>
        <button className={styles.botaoCancelar} onClick={cancelar}>
          Cancelar
        </button>
      </div>
    </div>
  </div>
);

export default ModalRedefinirSenha;