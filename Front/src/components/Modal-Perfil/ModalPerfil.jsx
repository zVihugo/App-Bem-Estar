import { useState } from 'react';
import styles from './ModalPerfil.module.css';

import { updateUser } from '../../middleware/auth';

const ModalPerfil = ({ confirmar, cancelar, data, id}) => {
    const [user, setUser] = useState(data);
    const [nome, setNome] = useState('');
    const [dataNascimento, setDataNascimento] = useState('');
    const [faculdade, setFaculdade] = useState('');
    const [curso, setCurso] = useState('');

    const handleSave = async () => {
        const dados = {
            name: nome || user.name,
            dataDeNascimento: dataNascimento || user.dataDeNascimento, 
            faculdade: faculdade || user.faculdade,
            curso: curso || user.curso,
        };
    
        try {
            const response = await updateUser(id, dados.name, dados.dataDeNascimento, dados.faculdade, dados.curso);
            
            confirmar(); 
        } catch (error) {
          console.error('Erro ao atualizar usuário:', error);
        }
    };

    return (
        <div className={styles.modal}>
            <div className={styles.modalContent}>
                <label className={styles.label}>Nome:</label>
                <input
                    type="text"
                    className={styles.input}
                    placeholder={user.name}
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                />

                <label className={styles.label}>Data de Nascimento:</label>
                <input
                    type="string"
                    className={styles.input}
                    placeholder={user.dataDeNascimento}
                    value={dataNascimento}
                    onChange={(e) => setDataNascimento(e.target.value)}
                />
                <label className={styles.label}>Faculdade:</label>
                <input
                    type="text"
                    className={styles.input}
                    placeholder={user.faculdade}
                    value={faculdade}
                    onChange={(e) => setFaculdade(e.target.value)}
                />
                <label className={styles.label}>Curso:</label>
                <input
                    type="text"
                    className={styles.input}
                    placeholder={user.curso}
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