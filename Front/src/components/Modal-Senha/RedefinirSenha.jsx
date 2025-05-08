import React, { useState } from 'react';
import styles from './RedefinirSenha.module.css';

const ModalRedefinirSenha = ({ confirmar, cancelar, erro }) => {
  const [senhaAntiga, setSenhaAntiga] = useState('');
  const [novaSenha, setNovaSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [validacaoErro, setValidacaoErro] = useState(''); 

  const handleConfirmar = () => {
    if (!senhaAntiga || !novaSenha || !confirmarSenha) {
      setValidacaoErro('Todos os campos são obrigatórios.');
      return;
    }

    if (novaSenha !== confirmarSenha) {
      setValidacaoErro('As senhas não coincidem.');
      return;
    }

    setValidacaoErro('');
    confirmar({ senhaAntiga, novaSenha });
  };

  return (
    <div className={styles.modal}>
      <div className={styles.modalContent}>
        <h2>Redefinir Senha</h2>
        <label>Senha antiga:</label>
        <input
          type="password"
          placeholder="Insira sua senha antiga"
          value={senhaAntiga}
          onChange={(e) => setSenhaAntiga(e.target.value)}
        />
        <label>Nova senha:</label>
        <input
          type="password"
          placeholder="Insira sua nova senha"
          value={novaSenha}
          onChange={(e) => setNovaSenha(e.target.value)}
        />
        <label>Confirmar senha:</label>
        <input
          type="password"
          placeholder="Confirmar senha"
          value={confirmarSenha}
          onChange={(e) => setConfirmarSenha(e.target.value)}
        />
        {validacaoErro && <p className={styles.erro}>{validacaoErro}</p>}
        {erro && <p className={styles.erro}>{erro}</p>} 
        <div className={styles.modalActions}>
          <button className={styles.botao} onClick={handleConfirmar}>
            Confirmar
          </button>
          <button className={styles.botaoCancelar} onClick={cancelar}>
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
};
export default ModalRedefinirSenha;