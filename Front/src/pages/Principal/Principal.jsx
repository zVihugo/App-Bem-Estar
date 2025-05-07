import React from 'react'
import { useState, useEffect } from 'react'
import CardAutoajuda from '../../components/Card-Autoajuda/cardautoajuda'
import CardMetas from '../../components/Card-Metas/cardmetas'
import CardAutoavaliacao from '../../components/Card-AutoAvaliacao/cardautoavaliacao'
import CardHumor from '../../components/Card-Humor/cardhumor'
import styles from './principal.module.css'
import api from '../../services/api'

const Principal = () => {
  const [user, setUser] = useState(null)
  const token = localStorage.getItem('token')
  const id = JSON.parse(localStorage.getItem('Id')); 
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await api.get(`/users/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        setUser(response.data.user.name)
        
      } catch (error) {
        console.error('Erro ao buscar dados do usuário:', error)
      }
    }

    fetchUser()
  }, [token]) 


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
        <button>Falar com um profissional</button>
      </div>
    </div>
  )
}

export default Principal