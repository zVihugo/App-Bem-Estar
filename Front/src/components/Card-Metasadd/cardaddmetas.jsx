import { useState } from 'react'
import styles from './cardaddmetas.module.css'
import { Check, Pencil, Plus, Trash, X } from 'lucide-react';
import Cookies from 'js-cookie'
import { useEffect } from 'react'
import { getAllMetasByUserId, createMeta, updateMeta, deleteMeta } from '../../middleware/auth'

const CardAddmetas = () => {
    const [novaMeta, setNovaMeta] = useState('')
    const [mostrarInput, setMostrarInput] = useState(false)
    const [editandoId, setEditandoId] = useState(null)
    const [textoEditado, setTextoEditado] = useState('')
    const [metas, setMetas] = useState([])
    const userId = Cookies.get('Id');

    useEffect(() => {
        const fetchMetas = async () => {
            try {
                const data = await getAllMetasByUserId(userId);
                setMetas(data);
                
            } catch (err) {
                console.error('Erro ao buscar metas:', err);
            }
        };
        fetchMetas();
    }, [userId]);

    const adicionarMeta = async () => {
        if (novaMeta.trim() === '') return;

        try {
            const metaData = {
                userId,
                descricao: novaMeta,
                isCompleted: false,
            };
            await createMeta(metaData);

            const atualizadas = await getAllMetasByUserId(userId);
            setMetas(atualizadas);
            
            setNovaMeta('');
            setMostrarInput(false);
        } catch (err) {
            console.error('Erro ao adicionar meta:', err);
        }
    };

    const concluirMeta = async (id) => {
        const meta = metas.find((m) => m.id === id);
        if (!meta) return;

        try {
            await updateMeta(id, {
                userId: meta.userId,
                descricao: meta.descricao,
                isCompleted: !meta.isCompleted,
            });

            const atualizadas = await getAllMetasByUserId(userId);
            setMetas(atualizadas);
        } catch (err) {
            console.error('Erro ao concluir meta:', err);
        }
    };

    const iniciarEdicao = (meta) => {
        setEditandoId(meta.id)
        setTextoEditado(meta.descricao)
    }

    const salvarEdicao = async (id) => {
        try {
            const metaOriginal = metas.find((m) => m.id === id);

            if (!metaOriginal) {
                return;
            }

            await updateMeta(id, {
                userId: metaOriginal.userId,
                descricao: textoEditado,
                isCompleted: metaOriginal.isCompleted,
            });

            const atualizadas = await getAllMetasByUserId(userId);
            setMetas(atualizadas);

            setEditandoId(null);
            setTextoEditado('');
        } catch (err) {
            console.error('Erro ao editar meta:', err);
        }
    };
    const cancelarEdicao = () => {
        setEditandoId(null);
        setTextoEditado('');
    };

    const handleEditKeyDown = (e, id) => {
        if (e.key === 'Enter') {
            salvarEdicao(id)
        } else if (e.key === 'Escape') {
            setEditandoId(null)
        }
    }

    const excluirMeta = async (id) => {
        try {
            await deleteMeta(id);
            setMetas((prev) => prev.filter((m) => m.id !== id));
        } catch (err) {
            console.error('Erro ao excluir meta:', err);
        }
    };

    return (
        <div className={styles.card_addmetas}>
            <ul className={styles.lista}>
                {metas.map(meta => (
                    <li key={meta.id} className={styles.item}>
                        <div
                            className={`${styles.statusIcon} ${meta.isCompleted ? styles.concluido : styles.pendente}`}
                            onClick={() => concluirMeta(meta.id)}
                        >
                            ✓
                        </div>
                        <div className={styles.metaTexto}>
                            {editandoId === meta.id ? (         
                                <div className={styles.inputEditandoComAcoes}>
                                    <input
                                        type="text"
                                        value={textoEditado}
                                        onChange={(e) => setTextoEditado(e.target.value)}
                                        onKeyDown={(e) => handleEditKeyDown(e, meta.id)}
                                        className={styles.inputEdicao}
                                        autoFocus
                                    />
                                    <div className={styles.botoesAcoes}>
                                        <button className={styles.botaoEditar} onClick={() => salvarEdicao(meta.id)}>
                                            <Check size={20} color="#3a3a3a"/>
                                        </button>
                                        <button className={styles.botaoCancelar} onClick={cancelarEdicao}>
                                            <X size={20} color="#3a3a3a"/>
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <div className={styles.statusContainer}>
                                    <span className={styles.texto}>{meta.descricao}</span>
                                    <span className={meta.isCompleted ? styles.statusConcluido : styles.statusPendente}>
                                        {meta.isCompleted ? 'concluído' : 'pendente'}
                                    </span>
                                </div>
                            )}
                            </div>

                            {editandoId !== meta.id && (
                                <div className={styles.botoesAcoes}>
                                    <button onClick={() => iniciarEdicao(meta)}>
                                        <Pencil size={20} color="#3a3a3a" />
                                    </button>
                                    <button onClick={() => excluirMeta(meta.id)}>
                                        <Trash size={20} color="#3a3a3a" />
                                    </button>
                                </div>

                            )}
                    </li>
                ))}
            </ul>

            <div>
                {!mostrarInput && (
                    <div className={styles.metas_add_button_container}>
                        <button className={styles.metas_add_button} onClick={() => setMostrarInput(true)}>
                            <Plus size={40} />
                        </button>
                    </div>
                )}
                {mostrarInput && (
                    <div className={styles.input_area}>
                        <input 
                            type='text'
                            placeholder='Digite uma meta'
                            value={novaMeta}
                            onChange={(e) => setNovaMeta(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') adicionarMeta();
                            }}
                        />
                        <button onClick={adicionarMeta}>✔</button>
                        <button onClick={() => setMostrarInput(false)}>✖</button>
                    </div>    
    
                )}
            </div>
        </div>
    )
}

export default CardAddmetas
