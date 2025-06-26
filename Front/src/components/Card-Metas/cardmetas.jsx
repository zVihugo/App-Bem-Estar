import styles from './cardmetas.module.css';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { getAllMetasByUserId } from '../../middleware/auth';

const CardMetas = () => {
  const navigate = useNavigate();
  const userId = Cookies.get('Id');
  const [metas, setMetas] = useState([]);

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


  const handleClick = () => {
    navigate('/Metas');
  }

  return (
    <div className={styles.card_metas}>
      <p> 🎯 Metas em andamento </p>
      <ul className={styles.meta_list}>
        {metas.length === 0 ? (
          <li>
            <span className={styles.sem_metas}>
              Você ainda não cadastrou nenhuma meta. Que tal criar sua primeira?
            </span>
          </li>
        ) : (
          metas.slice(0, 3).map(meta => (
            <li key={meta.id}>
              <label className={styles.meta_item}>
                <p>
                  - {meta.descricao}
                </p>
              </label>
            </li>
          ))
        )}
      </ul>
      <button className={styles.button} onClick={handleClick}>Ver todas as metas</button>
    </div>
  );
};

export default CardMetas;