import styles from './Login.module.css'
import CardFormulario from '../../components/Card-FormLogin/CardFormLogin'
import CardImage from '../../components/Card-ImgLogin/CardImgLogin'


const Login = () => {
  return (
    <div className={styles.login} >
      <div className={styles.logo}>
        <img src="/Sun.svg" alt="Logo" className={styles.tam} />
        <h1 className={styles.title}>Bem Estar</h1>
      </div>
      <CardFormulario />
      <CardImage />
    </div>
  )
}

export default Login