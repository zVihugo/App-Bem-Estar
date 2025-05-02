import React from 'react'
import './Login.css'
import CardFormulario from '../../components/Card-FormLogin/cardformlogin'
import CardImage from '../../components/Card-ImgLogin/cardimglogin'

const Login = () => {
  return (
    <div className='login'>
      <CardFormulario />
      <CardImage />
    </div>
  )
}

export default Login