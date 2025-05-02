import React, { useState } from 'react';
import styles from './cardmensagemautoajuda.module.css'
import { FaEdit } from 'react-icons/fa';

const CardMensagemautoajuda = () => {
    const [editando, setEditando] = useState(false);
    const [texto, setTexto] = useState(
        `"Isso vai passar.Você é mais forte do que imagina." 💚`
    );

    return(
        <div className={styles.card_mensagemautoajuda}>
            <FaEdit className={styles.icone_editar} onClick={() => setEditando(!editando)} />
            <div className={styles.card_dicas}>
                {editando ? (
                    <textarea
                        className={styles.textarea}
                        value={texto}
                        onChange={(e) => setTexto(e.target.value)}
                    />
                ) : (
                    texto.split('\n').map((linha, idx) => <p key={idx}>{linha}</p>)
                )}
            </div>
        </div>
    )
}

export default CardMensagemautoajuda