import styles from './cardautoavaliacao.module.css';
import { useNavigate } from 'react-router-dom';

const CardAutoAvaliacao = ({quantidade}) => {
    const navigate = useNavigate();
    const handleClick = () => {
        navigate('/Autoavaliacao');
    }
    return (
        <div className={styles.card_autoavaliacao}>
            <p>😌 Faça sua autoavaliação de hoje</p>
            <button onClick={handleClick}>Avaliar Agora</button>
            <p>Progresso: <span>Você já realizou {quantidade} avaliações</span></p>
        </div>
    );
};

export default CardAutoAvaliacao;