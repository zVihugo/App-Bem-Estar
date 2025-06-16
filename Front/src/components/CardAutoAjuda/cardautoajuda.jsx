import React, { useEffect, useState } from 'react';
import { Play, Headphones, FileText, Pencil, Trash2 } from 'lucide-react';
import styles from './cardautoajuda.module.css';
import Cookies  from 'js-cookie';
import { getUser } from '../../middleware/auth';

const CardAutoAjuda = ({ content, onEdit, onDelete }) => {

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
    }, [id]);

    const isAdmin = user.role === 'ADMIN' ? true : false;

    const getActionIcon = (tipo) => {
        switch (tipo) {
            case 'video': return <Play size={16} />;
            case 'audio': return <Headphones size={16} />;
            case 'artigo': return <FileText size={16} />;
            default: return <Play size={16} />;
        }
    };

    const getActionLabel = (tipo) => {
        switch (tipo) {
            case 'video': return 'Assistir';
            case 'audio': return 'Ouvir';
            case 'artigo': return 'Ler artigo';
            default: return 'Ver mais';
        }
    };

    const handleAction = () => {
        if (content.link) {
            window.open(content.link, '_blank', 'noopener,noreferrer');
        } else {
            console.log(`Nenhum link disponível para: ${content.titulo}`);
        }
    };

    return (
        <div className={styles.autoajuda_card}>
            {content.thumbnailUrl && (
                <div className={styles.autoajuda_card_image}>
                    <img src={content.thumbnailUrl} alt={content.titulo} />
                </div>
            )}
            <div className={styles.autoajuda_card_content}>
                <h3 className={styles.autoajuda_card_titulo}>{content.titulo}</h3>
                <button
                    onClick={handleAction}
                    className={`${styles.autoajuda_action_button} ${styles[content.tipo]}`}
                    disabled={!content.link}
                >
                    {getActionIcon(content.tipo)}
                    <span>{getActionLabel(content.tipo)}</span>
                </button>
                <div className={styles.card_actions}>
                    {isAdmin && (
                        <>
                            <button onClick={onEdit} className={styles.action_icon_button}>
                                <Pencil size={18} />
                            </button>
                            <button onClick={onDelete} className={styles.action_icon_button}>
                                <Trash2 size={18} />
                            </button>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CardAutoAjuda;