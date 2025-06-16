import React from 'react'
import { useState, useEffect } from 'react'
import CardAutoajuda from '../../components/Card-Autoajuda/cardautoajuda'
import CardMetas from '../../components/Card-Metas/cardmetas'
import CardAutoavaliacao from '../../components/Card-AutoAvaliacao/cardautoavaliacao'
import CardHumor from '../../components/Card-Humor/cardhumor'
import styles from './principal.module.css'

import { useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'
import { getUser } from '../../middleware/auth'

const Principal = () => {
  const navigate = useNavigate()
  const [user, setUser] = useState(null)

  const id = Cookies.get('Id')

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await getUser(id)

        setUser(response.user.name)

      } catch (error) {
        console.error('Erro ao buscar dados do usuário:', error)
      }
    }

    fetchUser()
  }, [id])


  return (
    <div className='principal'>
      <div className={styles.card_welcome}>
        {user && <h1>Olá, {user}!</h1>}

        <h2>Como você está se sentido hoje?</h2>
      </div>
      <div className={styles.cardsGrid}>
        <CardAutoavaliacao />
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