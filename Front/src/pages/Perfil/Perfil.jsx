import { useState, useEffect } from 'react';
import styles from './Perfil.module.css';
import { useNavigate } from 'react-router-dom'
import InformacaoUsuario from '../../components/Card-usuarios/InformacaoUsuario.jsx';
import ModalRedefinirSenha from '../../components/Modal-Senha/RedefinirSenha.jsx';
import ModalExcluirConta from '../../components/Modal-Excluir/Excluir.jsx';
import ModalSessao from '../../components/Model-Sessao/Sessao.jsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { getUser, deleteUser, logout, updatePassword } from '../../middleware/auth';
import ModalPerfil from '../../components/Modal-Perfil/ModalPerfil.jsx';
import Cookies from 'js-cookie';

const Perfil = () => {
  const id = Cookies.get('Id');
  const navigate = useNavigate();
  const [user, setUser] = useState("");
  const [erroSenha, setErroSenha] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [showModalExcluir, setShowModalExcluir] = useState(false);
  const [showModalSair, setShowModalSair] = useState(false);
  const [showModalPerfil, setShowModalPerfil] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await getUser(id)
        setUser(response.user)
      } catch (error) {
        console.error('Erro ao buscar dados do usuário:', error)
      }
    }
    fetchUser()
  }, [id])

  const handleExcluirConta = async () => {
  
    navigate('/Auth')
    await deleteUser(id)
  };

  const handleRedefinirSenha = async ({ senhaAntiga, novaSenha }) => {
    try {

      await updatePassword(id, senhaAntiga, novaSenha);
      alert('Senha redefinida com sucesso!');
      setShowModal(false);
      setErroSenha('');
    } catch (error) {
      setErroSenha(error.error);
    }
  };

  const handleSair = () => {

    setShowModalSair(false);
    logout();
    navigate('/Auth')
  }

  const handleModalPerfil = () => {
    setShowModalPerfil(false);
    window.location.reload();
  }

  return (
    <div className={styles.container}>
      <div className={styles.containerInformacao}>
        <h1 className={styles.titulo}>Minhas informações</h1>
        <FontAwesomeIcon icon={faEdit} className={styles.icon} onClick={() => setShowModalPerfil(true)} />
      </div>

      <InformacaoUsuario label="Nome" valor={user.name} />
      <InformacaoUsuario label="Email" valor={user.email} />
      <InformacaoUsuario label="Data de Nascimento" valor={user.dataDeNascimento} />
      <InformacaoUsuario label="Faculdade" valor={user.faculdade} />
      <InformacaoUsuario label="Curso" valor={user.curso} />

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
          erro={erroSenha}
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
            id={id}
            data={user}
            confirmar={handleModalPerfil}
            cancelar={() => setShowModalPerfil(false)}
          />
        )
      }

    </div>
  );
};

export default Perfil;