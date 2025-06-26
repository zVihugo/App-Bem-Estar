import ImgRegistro from '../../components/Card-RegistroImagem/CardImgRegistro'
import FormRegistro from '../../components/Card-Registro/CardFormRegistro'
import styles from './Registro.module.css'

const Registro = () => {
  return (
    <div className={styles.registro} >
       <div className={styles.logo}>
              <img src="/Sun.svg" alt="Logo" className={styles.tam} />
              <h1 className={styles.title}>Bem Estar</h1>
            </div>
      <ImgRegistro />
      <FormRegistro />
    </div>
  )
}

export default Registro