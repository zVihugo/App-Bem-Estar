import React, { useEffect, useState } from 'react';
import CardAutoAjuda from '../../components/CardAutoAjuda/cardautoajuda';
import { Plus } from 'lucide-react';
import styles from './autoajuda.module.css';
import AddContentModal from '../../components/addDicasModal/addDicasModal';
import { getDicas, createDicas, deleteDicas, updateDicas, getUser } from '../../middleware/auth';
import Cookies  from 'js-cookie';

const Autoajuda = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [conteudo, setConteudo] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editingContent, setEditingContent] = useState(null);

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

        const id = Cookies.get('Id');
        const [user, setUser] = useState({});
        
    
        

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
        console.log("Dados recebidos do modal:", formData);
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
                alert('Dica atualizada com sucesso!');
            } else {
                await createDicas(formData);
                alert('Dica adicionada com sucesso!');
            }

            setEditingContent(null);
            setIsModalOpen(false);
            await fetchContent();

        } catch (error) {
            console.error('Erro ao salvar dica:', error);
            alert('Não foi possível salvar a dica. Tente novamente.');
        }
    };

    const handleDeleteContent = async (idToDelete) => {
        if (window.confirm("Tem certeza que deseja excluir esta dica?")) {
            try {
                await deleteDicas(idToDelete);
                setConteudo(prevConteudo => prevConteudo.filter(item => item.id !== idToDelete));
            } catch (error) {
                console.error('Erro ao deletar conteúdo:', error);
                alert('Não foi possível excluir a dica. Tente novamente.');
            }
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

    return (
        <>
            <div className={styles.autoajuda_container}>
              <div className={styles.autoajuda_header}>
                <h1>Dicas & Autoajuda</h1>
              </div>
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
        </>
    );
}

export default Autoajuda;