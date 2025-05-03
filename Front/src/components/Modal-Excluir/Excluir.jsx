import React from 'react'
import styles from './Excluir.module.css'

const ModalExcluirConta = ({ confirmar, cancelar }) => (
    <div className={styles.modal}>
      <div className={styles.modalContent}>
        <h2>Excluir conta permanentemente?</h2>
        <p>
          Esta ação é permanente e todos os seus dados serão apagados.
          Sabemos que momentos difíceis acontecem, mas você não está sozinho.
          Estamos aqui para te apoiar. 💙
        </p>
        <p>
          Se estiver passando por algo, considere conversar conosco antes de tomar uma decisão.
          Sua saúde mental importa!
        </p>
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

export default ModalExcluirConta;