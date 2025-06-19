import React, { useState } from 'react'
import CardSuasmetas from '../../components/Card-Suasmetas/cardsuasmetas'
import CardAddmetas from '../../components/Card-Metasadd/cardaddmetas'


const Metas = () => {
  

  return (
    <div className='metas'>
      <CardSuasmetas />
      <CardAddmetas />

    </div>
 
  )
}

export default Metas