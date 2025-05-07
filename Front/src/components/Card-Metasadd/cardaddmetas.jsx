import React, { useState } from 'react'
import styles from './cardaddmetas.module.css'
import { Pencil } from 'lucide-react';

const CardAddmetas = () => {
    const [metas, setMetas] = useState([]) 
    const [novaMeta, setNovaMeta] = useState('') 
    const [mostrarInput, setMostrarInput] = useState(false)
    const [editandoId, setEditandoId] = useState(null)
    const [textoEditado, setTextoEditado] = useState('')

    const adicionarMeta = () => {
        if (novaMeta.trim() === '') return 
        setMetas([...metas, { id: Date.now(), texto: novaMeta, concluida: false }]) 
        setNovaMeta('') 
        setMostrarInput(false) 
    }

    const concluirMeta = (id) => {
        setMetas(metas.map(meta =>
            meta.id === id ? { ...meta, concluida: !meta.concluida } : meta
        ))
    }

    const iniciarEdicao = (meta) => {
        setEditandoId(meta.id)
        setTextoEditado(meta.texto)
    }

    const salvarEdicao = (id) => {
        setMetas(metas.map(meta =>
            meta.id === id ? { ...meta, texto: textoEditado } : meta
        ))
        setEditandoId(null)
        setTextoEditado('')
    }

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

    return (
        <div className={styles.card_addmetas}>
            <ul className={styles.lista}>
                {metas.map(meta => (
                    <li key={meta.id} className={styles.item}>
                        <div
                            className={`${styles.statusIcon} ${
                                meta.concluida ? styles.concluido : styles.pendente
                            }`}
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
                                    onBlur={() => salvarEdicao(meta.id)}
                                    className={styles.inputEdicao}
                                    autoFocus
                                />
                            ) : (
                                <>
                                    <span className={styles.texto}>{meta.texto}</span>
                                    <span className={
                                        meta.concluida ? styles.statusConcluido : styles.statusPendente
                                    }>
                                        {meta.concluida ? 'concluído' : 'pendente'}
                                    </span>
                                </>
                            )}
                        </div>
                        <button className={styles.botaoEditar} onClick={() => iniciarEdicao(meta)}>
                            <Pencil size={13} color="#3a3a3a" />
                        </button>
                    </li>
                ))}
            </ul>

            <div className={styles.input_area}>
                {mostrarInput && (
                    <input
                        type='text'
                        placeholder='Digite uma meta'
                        value={novaMeta}
                        onChange={(e) => setNovaMeta(e.target.value)} 
                        onKeyDown={handleKeyDown}
                    />
                )}

                {!mostrarInput && (
                    <button onClick={() => setMostrarInput(true)}>+</button>
                )}
            </div>
        </div>
    )
}

export default CardAddmetas
