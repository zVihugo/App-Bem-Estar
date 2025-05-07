import React, { useState } from 'react'
import styles from './cardaddmetas.module.css'

const CardAddmetas = () => {
    const [metas, setMetas] = useState([])
    const [novaMeta, setNovaMeta] = useState('')
    const [mostrarInput, setMostrarInput] = useState(false)

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

    const excluirMeta = (id) => {
        setMetas(metas.filter(meta => meta.id !== id))
    }

    return (
        <div className={styles.card_addmetas}>
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

            {metas.length > 0 && (
                <ul className={styles.lista}>
                    {metas.map(meta => (
                        <li key={meta.id} className={meta.concluida ? styles.concluida : ''}>
                            <span>{meta.texto}</span>
                            <div>
                                <button onClick={() => concluirMeta(meta.id)}>✔</button>
                                <button onClick={() => excluirMeta(meta.id)}>🗑</button>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )
}

export default CardAddmetas
