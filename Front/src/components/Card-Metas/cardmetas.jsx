import React from 'react';
import styles from './cardmetas.module.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CardMetas = () => {
    const navigate = useNavigate();
    const [metas, setMetas] = useState([
        { id: 1, texto: 'Meditar por 10min', concluida: false },
        { id: 2, texto: 'Dormir 8h por noites', concluida: false },
      ]);
    
      const toggleMeta = (id) => {
        setMetas(metas.map(meta =>
          meta.id === id ? { ...meta, concluida: !meta.concluida } : meta
        ));
      };

      const handleClick = () => {
        navigate('/Metas');
      }
    
      return (
        <div className={styles.card_metas}>
          <p> 🎯 Metas em andamento </p>
          <ul className={styles.meta_list}>
            {metas.map(meta => (
              <li key={meta.id}>
                <label className={styles.meta_item}>
                  <input
                    type="checkbox"
                    checked={meta.concluida}
                    onChange={() => toggleMeta(meta.id)}
                    className={styles.checkbox}
                  />
                  <span className={meta.concluida ? 'concluida' : ''}>
                    {meta.texto}
                  </span>
                </label>
              </li>
            ))}
          </ul>
            <button className={styles.button} onClick={handleClick}>Ver todas as metas</button>
        </div>
      );
};

export default CardMetas;