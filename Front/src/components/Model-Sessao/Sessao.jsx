import React from 'react'
import styles from './Sessao.module.css'

const ModalSessao = ({confirmar, cancelar}) => {
  return (
    <div className={styles.modal}>
        <div className={styles.modalContent}>
            <h2>Deseja encerrar esta sessão?</h2>
            <p>
            Descanse um pouco, você merece. Volte quando estiver pronto — estaremos te esperando por aqui. 💖
            
            </p>
            <div className={styles.modalActions}>
                    <button className={styles.botao} onClick={confirmar}>
                    Sim
                    </button>
                    <button className={styles.botaoCancelar} onClick={cancelar}>
                    Não
                    </button>
            </div>
        </div>
    </div>
  )
}

export default ModalSessao