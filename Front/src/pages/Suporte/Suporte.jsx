import React from 'react'
import './Suporte.css'
import CardSuporte from '../../components/Card-SuporteImediato/cardsuporte'
import CardCrise from '../../components/Card-Crise/cardcrise'
import CardDicasrapidas from '../../components/Card-DicasRapidas/carddicasrapidas'
import CardMensagemautoajuda from '../../components/Card-Mensagemautoajuda/cardmensagemautoajuda'

const Suporte = () => {
  return (
    <div className='suporte'>
          <CardSuporte />
          <CardCrise />
          <CardDicasrapidas />
          <CardMensagemautoajuda />
    </div>
  )
}

export default Suporte