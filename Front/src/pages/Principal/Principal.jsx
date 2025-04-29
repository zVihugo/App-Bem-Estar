import React from 'react'
import CardWelcome from '../../components/Card-Welcome/cardwelcome'
import CardAutoAvaliacao from '../../components/Card-AutoAvaliacao/cardautoavaliacao'
import CardHumor from '../../components/Card-Humor/cardhumor'
const Principal = () => {
  return (
    <div className='principal'>
      <CardWelcome />
      <CardAutoAvaliacao />
      <CardHumor />
    </div>
  )
}

export default Principal