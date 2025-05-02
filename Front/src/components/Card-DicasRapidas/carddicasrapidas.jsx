import React, { useState } from 'react';
import styles from './carddicasrapidas.module.css';
import { FaEdit } from 'react-icons/fa';

const CardDicasrapidas = () => {
  const [editando, setEditando] = useState(false);
  const [texto, setTexto] = useState(
    `- Inspire profundamente por 4 segundos\n- Segure por 4 segundos\n- Expire lentamente por 6 segundos\n- Respire fundo e diga para si mesmo: "Estou seguro agora."\n- Nomeie mentalmente 3 coisas pelas quais você é grato neste momento.`
  );

  return (
    <div className={styles.card_dicasrapidas}>
      <FaEdit className={styles.icone_editar} onClick={() => setEditando(!editando)} />
      <div className={styles.card_conteudo}>
        <h2>💡 Dicas rápidas</h2>
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
    </div>
  );
};


export default CardDicasrapidas;
