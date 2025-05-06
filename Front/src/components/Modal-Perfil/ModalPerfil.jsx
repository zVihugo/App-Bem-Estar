import React, { useState } from 'react';
import styles from './ModalPerfil.module.css';

const ModalPerfil = ({ confirmar, cancelar }) => {
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [dataNascimento, setDataNascimento] = useState('');
    const [faculdade, setFaculdade] = useState('');
    const [curso, setCurso] = useState('');

    const handleSave = async () => {
        const data = {
            nome,

            dataNascimento,
            faculdade,
            curso,
        };



        console.log('Dados enviados:', data);
        console.log(typeof data.dataNascimento);
    };

    return (
        <div className={styles.modal}>
            <div className={styles.modalContent}>
                <label className={styles.label}>Nome:</label>
                <input
                    type="text"
                    className={styles.input}
                    placeholder="Digite seu nome"
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                />

                <label className={styles.label}>Data de Nascimento:</label>
                <input
                    type="date"
                    className={styles.input}
                    placeholder='Digita sua data de nascimento (dd/mm/aaaa)'
                    value={dataNascimento}
                    onChange={(e) => setDataNascimento(e.target.value)}
                />
                <label className={styles.label}>Faculdade:</label>
                <input
                    type="text"
                    className={styles.input}
                    placeholder="Digite sua faculdade"
                    value={faculdade}
                    onChange={(e) => setFaculdade(e.target.value)}
                />
                <label className={styles.label}>Curso:</label>
                <input
                    type="text"
                    className={styles.input}
                    placeholder="Digite seu curso"
                    value={curso}
                    onChange={(e) => setCurso(e.target.value)}
                />
                <button className={styles.botaoSalvar} onClick={() => { handleSave(); confirmar(); }}>
                    Salvar
                </button>
                <button className={styles.botaoCancelar} onClick={cancelar}>Cancelar</button>
            </div>
        </div>
    );
};

export default ModalPerfil;