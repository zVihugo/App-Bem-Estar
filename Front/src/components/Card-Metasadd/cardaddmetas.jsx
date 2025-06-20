import React, { useState } from 'react'
import styles from './cardaddmetas.module.css'
import { Pencil } from 'lucide-react';
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
                console.log(data)
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
            const nova = await createMeta(metaData);

            console.log('Metas adicionadas.', nova)

            setMetas((prev) => [...prev, nova]);
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
        const atualizada = await updateMeta(id, {
            userId: meta.userId,
            descricao: meta.descricao,
            isCompleted: !meta.isCompleted,
        });

        setMetas((prev) =>
            prev.map((m) => (m.id === id ? atualizada : m))
        );
        window.location.reload();
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
                console.error('Meta não encontrada para edição:', id);
                return;
            }

            const atualizada = await updateMeta(id, {
                userId: metaOriginal.userId,
                descricao: textoEditado,
                isCompleted: metaOriginal.isCompleted,
            });

            setMetas((prev) =>
                prev.map((m) => (m.id === id ? atualizada : m))
            );

            setEditandoId(null);
            setTextoEditado('');
            window.location.reload();
        } catch (err) {
            console.error('Erro ao editar meta:', err);
        }
    };



    const handleEditKeyDown = (e, id) => {
        if (e.key === 'Enter') {
            salvarEdicao(id)
        } else if (e.key === 'Escape') {
            setEditandoId(null)
        }
    }

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            adicionarMeta();
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
                                <input
                                    type="text"
                                    value={textoEditado}
                                    onChange={(e) => setTextoEditado(e.target.value)}
                                    onKeyDown={(e) => handleEditKeyDown(e, meta.id)}
                                    className={styles.inputEdicao}
                                    autoFocus
                                />
                            ) : (
                                <>
                                    <span className={styles.texto}>{meta.descricao}</span>
                                    <span className={meta.isCompleted ? styles.statusConcluido : styles.statusPendente}>
                                        {meta.isCompleted ? 'concluído' : 'pendente'}
                                    </span>
                                </>
                            )}
                        </div>
                        <div className={styles.botoesAcoes}>
                            <button className={styles.botaoEditar} onClick={() => iniciarEdicao(meta)}>
                                <Pencil size={13} color="#3a3a3a" />
                            </button>
                            <button onClick={() => excluirMeta(meta.id)}>🗑</button>
                        </div>
                    </li>
                ))}
            </ul>

            <div className={styles.input_area}>


                {!mostrarInput && (
                    <button onClick={() => setMostrarInput(true)}>+</button>
                )}

                {mostrarInput && (
                    <>
                        <input
                            type='text'
                            placeholder='Digite uma meta'
                            value={novaMeta}
                            onChange={(e) => setNovaMeta(e.target.value)}
                        />
                        <button onClick={adicionarMeta}>✔</button>
                        <button onClick={() => setMostrarInput(false)}>✖</button>
                    </>
                )}
            </div>
        </div>
    )
}

export default CardAddmetas
