import React from 'react'
import CardWelcome from '../../components/Card-Welcome/cardwelcome'
import CardAutoAvaliacao from '../../components/Card-AutoAvaliacao/cardautoavaliacao'
import CardHumor from '../../components/Card-Humor/cardhumor'
import CardAutoajuda from '../../components/Card-Autoajuda/cardautoajuda'

const Principal = () => {
  return (
    <div className='principal'>
      <CardWelcome />
      <CardAutoAvaliacao />
      <CardHumor />
      <CardAutoajuda />
    </div>
  )
}

export default Principal