import { useEffect, useState } from 'react';
import CardAutoAjuda from '../../components/CardAutoAjuda/CardAutoAjuda';
import { Plus } from 'lucide-react';
import styles from './autoajuda.module.css';
import AddContentModal from '../../components/addDicasModal/AddDicasModal';
import { getDicas, createDicas, deleteDicas, updateDicas, getUser } from '../../middleware/auth';

import Cookies  from 'js-cookie';
import ModalConfirmDelete from '../../components/Modal-Confirm-Delete/ModalConfirmDelete';

const Autoajuda = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [conteudo, setConteudo] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editingContent, setEditingContent] = useState(null);
    const [user, setUser] = useState({});
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [dicaParaExcluir, setDicaParaExcluir] = useState(null);
    const [mensagem, setMensagem] = useState('');
    const [tipoMensagem, setTipoMensagem] = useState(''); 
    
    const id = Cookies.get('Id');

    const fetchContent = async () => {
        try {
            setLoading(true);
            const response = await getDicas();
            setConteudo(Array.isArray(response) ? response : []);
        } catch (error) {
            console.error('Erro ao buscar conteúdo:', error);
            setConteudo([]);
        } finally {
            setLoading(false);
        }
    };
        
    useEffect(() => {
        const user = async () => {
            try {
                const response = await getUser(id);
                setUser(response.user);
            } catch (error) {
                console.error(error);
            }
        }
        user();
        fetchContent();
    }, []);

    const isAdmin = user.role === 'ADMIN' ? true : false;

    const handleSaveContent = async (formData) => {
        try {
            if (editingContent) {
                const { titulo, tipo, thumbnailUrl, link } = formData
                const id = editingContent.id;

                await updateDicas(
                    id,
                    titulo,      
                    tipo,         
                    thumbnailUrl,
                    link
                );
                mostrarMensagem('Dica atualizada com sucesso!', 'sucesso');
            } else {
                await createDicas(formData);
                mostrarMensagem('Dica adicionada com sucesso!', 'sucesso');
            }

            setEditingContent(null);
            setIsModalOpen(false);
            await fetchContent();

        } catch (error) {
            console.error('Erro ao salvar dica:', error);
            mostrarMensagem('Erro ao salvar dica!', 'erro');
        }
    };

    const confirmarExclusao = async () => {
        try {
            await deleteDicas(dicaParaExcluir);
            setConteudo(prev => prev.filter(item => item.id !== dicaParaExcluir));
            mostrarMensagem('Dica excluída com sucesso!', 'sucesso');
        } catch (error) {
            console.error('Erro ao excluir dica:', error);
            mostrarMensagem('Erro ao excluir dica.', 'erro');
        } finally {
            setIsDeleteModalOpen(false);
            setDicaParaExcluir(null);
        }
    };

    const handleOpenEditModal = (contentToEdit) => {
        setEditingContent(contentToEdit); 
        setIsModalOpen(true); 
    };

    const handleOpenCreateModal = () => {
        setEditingContent(null);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setEditingContent(null);
        setIsModalOpen(false);
    }

    const handleDeleteContent = (idToDelete) => {
        setDicaParaExcluir(idToDelete);
        setIsDeleteModalOpen(true);
    };

    const mostrarMensagem = (texto, tipo) => {
        setMensagem(texto);
        setTipoMensagem(tipo);
        setTimeout(() => {
            setMensagem('');
        }, 3000); 
    };

    return (
        <>
            <div className={styles.autoajuda_container}>
              <div className={styles.autoajuda_header}>
                <h1>Dicas & Autoajuda</h1>
              </div>    
              {mensagem && (
                <div className={`${styles.alerta} ${tipoMensagem === 'sucesso' ? styles.sucesso : styles.erro}`}>
                    {mensagem}
                </div>
              )}
                <p className={styles.autoajuda_subtitle}> Conteúdos para te ajudar a viver melhor 🌿</p>
                <h2 className={styles.autoajuda_secao_title}>Ultimas dicas lançadas</h2>
                <div className={styles.autoajuda_grid}>
                    {loading ? (
                        <p>Carregando dicas...</p>
                    ) : (
                        conteudo.length > 0 ? (
                            conteudo.map(content => (
                                <CardAutoAjuda
                                    key={content.id}
                                    content={content}
                                    onEdit={() => handleOpenEditModal(content)}
                                    onDelete={() => handleDeleteContent(content.id)}
                                />
                            ))
                        ) : (
                            <p>Nenhuma dica encontrada.</p>
                        )
                    )}
                </div>

                {isAdmin && (
                    <>
                        <div className={styles.autoajuda_add_button_container}>
                            <button className={styles.autoajuda_add_button} onClick={handleOpenCreateModal}>
                            <Plus size={40} />
                            </button>
                        </div>
                    </>
                )}
            </div>

            <AddContentModal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                onSave={handleSaveContent}
                editingContent={editingContent}
            />

            <ModalConfirmDelete
                isOpen={isDeleteModalOpen}
                onClose={() => setIsDeleteModalOpen(false)}
                onConfirm={confirmarExclusao}
            />
        </>
    );
}

export default Autoajuda;