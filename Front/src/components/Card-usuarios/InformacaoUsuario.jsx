import React from 'react'
import styles from './InformacaoUsuario.module.css'

const InformacaoUsuario = ({label, valor}) => {
  return (
    <div className={styles.secao}>
        <label>{label}: </label>
        <p>{valor}</p>
    </div>
  )
}

export default InformacaoUsuario