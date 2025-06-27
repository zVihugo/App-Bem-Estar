import React from 'react'
import './Suporte.css'
import CardSuporte from '../../components/Card-SuporteImediato/cardsuporte.jsx'
import CardCrise from '../../components/Card-Crise/cardcrise.jsx'
import CardDicasrapidas from '../../components/Card-DicasRapidas/carddicasrapidas.jsx'
import CardMensagemautoajuda from '../../components/Card-Mensagemautoajuda/cardmensagemautoajuda.jsx'

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