import { useState, useEffect } from 'react'
import CardAutoajuda from '../../components/Card-Autoajuda/CardAutoAjuda'
import CardMetas from '../../components/Card-Metas/CardMetas'
import CardAutoavaliacao from '../../components/Card-AutoAvaliacao/CardAutoAvaliacao'
import CardHumor from '../../components/Card-Humor/cardhumor'
import styles from './principal.module.css'
import { allReport } from '../../middleware/auth'
import { useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'
import { getUser } from '../../middleware/auth'

const Principal = () => {
  const navigate = useNavigate()
  const [user, setUser] = useState(null)
  const [relatorios, setRelatorios] = useState([])
  const id = Cookies.get('Id')

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await getUser(id);
        const responseReports = await allReport(id);
        setRelatorios(
          Array.isArray(responseReports.relatorios)
            ? responseReports.relatorios.length
            : 0
        );
        setUser(response.user.name);
      } catch (error) {
        console.error('Erro ao buscar dados do usuário:', error);
      }
    };

    if (id) fetchUser();
  }, [id]);


  return (
    <div className='principal'>
      <div className={styles.card_welcome}>
        {user && <h1>Olá, {user}!</h1>}

        <h2>Como você está se sentido hoje?</h2>
      </div>
      <div className={styles.cardsGrid}>
        <CardAutoavaliacao quantidade={relatorios} />
        <CardHumor />
        <CardAutoajuda />
        <CardMetas />
      </div>
      <div className={styles.card_ajuda}>
        <p>💬 Precisa de ajuda agora?</p>
        <button onClick={() => navigate("/Suporte")}>Falar com um profissional</button>
      </div>
    </div>
  )
}

export default Principal