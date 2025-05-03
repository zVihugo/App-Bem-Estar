import React, { useState } from 'react';
import styles from './Perfil.module.css';
import InformacaoUsuario from '../../components/Card-usuarios/InformacaoUsuario';
import ModalRedefinirSenha from '../../components/Modal-Senha/RedefinirSenha';
import ModalExcluirConta from '../../components/Modal-Excluir/Excluir';
import ModalSessao from '../../components/Model-Sessao/Sessao';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import ModalPerfil from '../../components/Modal-Perfil/modalPerfil';


const Perfil = () => {
  const [showModal, setShowModal] = useState(false);
  const [showModalExcluir, setShowModalExcluir] = useState(false);
  const [showModalSair, setShowModalSair] = useState(false);
  const [showModalPerfil, setShowModalPerfil] = useState(false);
  const [novaSenha, setNovaSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');

  const handleRedefinirSenha = () => {
    if (novaSenha !== confirmarSenha) {
      alert('As senhas não coincidem!');
      return;
    }

    console.log('Nova senha enviada:', novaSenha);

    setShowModal(false);
    setNovaSenha('');
    setConfirmarSenha('');
  };

  const handleExcluirConta = () => {
    console.log('Conta excluída!');
    setShowModalExcluir(false);
  };

  const handleSair = () => {
    console.log("Sessão encerrada!");
    setShowModalSair(false);
  }

  const handleModalPerfil = () => {
    console.log("Dados atualizado!");
    setShowModalPerfil(false);
  }

  return (
    <div className={styles.container}>
      <div className={styles.containerInformacao}>
        <h1 className={styles.titulo}>Minhas informações</h1>
        <FontAwesomeIcon icon={faEdit} className={styles.icon} onClick={() => setShowModalPerfil(true)}/>
      </div>
    
      <InformacaoUsuario label="Nome" valor="Victor Moreira" />
      <InformacaoUsuario label="Email" valor="victor@email.com" />
      <InformacaoUsuario label="Data de Nascimento" valor="06/04/2004" />
      <InformacaoUsuario label="Faculdade" valor="UTFPR" />
      <InformacaoUsuario label="Curso" valor="Análise e Desenvolvimento de Sistemas" />

      <h2 className={styles.subtitulo}>Configurações</h2>

      <div className={styles.seguranca}>
        <button className={styles.botao} onClick={() => setShowModal(true)}>
          Redefinir Senha
        </button>
        <button className={styles.botao} onClick={() => setShowModalExcluir(true)}>
          Excluir Conta
        </button>
        <button className={styles.botao} onClick={() => setShowModalSair(true)}>
          Sair
        </button>
      </div>

      {showModal && (
        <ModalRedefinirSenha
          novaSenha={novaSenha}
          confirmarSenha={confirmarSenha}
          setNovaSenha={setNovaSenha}
          setConfirmarSenha={setConfirmarSenha}
          confirmar={handleRedefinirSenha}
          cancelar={() => setShowModal(false)}
        />
      )}

      {showModalExcluir && (
        <ModalExcluirConta
          confirmar={handleExcluirConta}
          cancelar={() => setShowModalExcluir(false)}
        />
      )}
      {showModalSair && (
        <ModalSessao 
          confirmar={handleSair}
          cancelar={() => setShowModalSair(false)}
          />
      )}

      {
        showModalPerfil && (
          <ModalPerfil
            confirmar={handleModalPerfil}
            cancelar={() => setShowModalPerfil(false)}
          />
        )
      }

    </div>
  );
};

export default Perfil;