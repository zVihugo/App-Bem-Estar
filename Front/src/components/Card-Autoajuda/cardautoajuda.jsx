import styles from './cardautoajuda.module.css';
import { useNavigate } from 'react-router-dom';

const CardAutoajuda = () => {
    const navigate = useNavigate();
    const handleClick = () => {
        navigate('/Autoajuda');
    }
    return (
        <div className={styles.card_autoajuda}>
            <p>✨ Dica de hoje: Respiração consciente</p>
            <span>“Pare por 3 minutos e respire fundo. Inspire... expire...”</span>
            <button onClick={handleClick}>Ver exercício completo</button>
        </div>
    );
};

export default CardAutoajuda;