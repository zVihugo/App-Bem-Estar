import React from 'react'
import CardSuasmetas from '../../components/Card-Suasmetas/cardsuasmetas'
import CardMaismetas from '../../components/Card-Maismetas/cardmaismetas'
import CardAddmetas from '../../components/Card-Metasadd/cardaddmetas'

const Metas = () => {
  return (
    <div className='metas'>
      <CardSuasmetas />
      <CardMaismetas />
      <CardAddmetas />

    </div>
  )
}

export default Metas