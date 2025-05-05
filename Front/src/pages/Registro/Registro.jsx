import React from 'react'
import './Registro.css'
import ImgRegistro from '../../components/Card-RegistroImagem/cardimgregistro'
import FormRegistro from '../../components/Card-Registro/cardformregistro'

const Registro = () => {
  return (
    <div className='registro'>
      <ImgRegistro />
      <FormRegistro />
    </div>
  )
}

export default Registro