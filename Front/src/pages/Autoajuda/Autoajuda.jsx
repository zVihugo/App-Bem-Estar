import React, { useEffect, useState } from 'react';
import CardAutoAjuda from '../../components/CardAutoAjuda/cardautoajuda';
import { Plus } from 'lucide-react';
import styles from './autoajuda.module.css';
import AddContentModal from '../../components/addDicasModal/addDicasModal';
import { getDicas, createDicas, deleteDicas } from '../../middleware/auth';
import { jwtDecode } from 'jwt-decode';
import Cookies from 'js-cookie';


const Autoajuda = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [conteudo, setConteudo] = useState([]);
    const [loading, setLoading] = useState(true);

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
        fetchContent();
    }, []);

    const handleAddContent = async (newContentData) => {
        try {
            await createDicas(newContentData);

            setIsModalOpen(false);

            await fetchContent();

        } catch (error) {
            console.error('Erro ao adicionar novo conteúdo:', error);
            alert('Não foi possível adicionar a dica. Tente novamente.');
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


    return (
        <>
            <div className={styles.autoajuda_container}>
                <div className={styles.autoajuda_header}>
                    <h1>Dicas & Autoajuda</h1>
                </div>
                <p className={styles.autoajuda_subtitle}>
                    Conteúdos para te ajudar a viver melhor 🌿
                </p>

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
                                    onDelete={() => handleDeleteContent(content.id)}
                                />
                            ))
                        ) : (
                            <p>Nenhuma dica encontrada.</p>
                        )
                    )}
                </div>

                <div className={styles.autoajuda_add_button_container}>
                    <button className={styles.autoajuda_add_button} onClick={() => setIsModalOpen(true)}>
                        <Plus size={25} />
                    </button>
                </div>
            </div>

            <AddContentModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onAddContent={handleAddContent}
            />
        </>
    );
}

export default Autoajuda;