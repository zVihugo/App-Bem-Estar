import styles from './Navbar.module.css'
import { NavLink } from 'react-router-dom'


const Navbar = () => {
    return (
        <nav className={styles.navbar}>
            <NavLink to="/Inicial" className={styles.brand}>
               <div className={styles.logo}>
                <img src="/Sun.svg" alt="Logo" className={styles.tam} />
                    <h1 className={styles.title}>Bem Estar</h1>
               </div>
            </NavLink>
            <ul className={styles.links_list}>
                <li>
                    <NavLink to="/Inicial" className={({ isActive }) => `${styles.noEffect} ${isActive ? styles.active : ""}`}>Inicio</NavLink>
                </li>
                <li>
                    <NavLink to="/Autoavaliacao" className={({ isActive }) => `${styles.noEffect} ${isActive ? styles.active : ""}`}>Auto Avaliação</NavLink>
                </li>
                <li>
                    <NavLink to="/Relatorios" className={({ isActive }) => `${styles.noEffect} ${isActive ? styles.active : ""}`}>Relatórios</NavLink>
                </li>
                <li>
                    <NavLink to="/Autoajuda" className={({ isActive }) => `${styles.noEffect} ${isActive ? styles.active : ""}`}>Auto ajuda</NavLink>
                </li>
                <li>
                    <NavLink to="/Metas" className={({ isActive }) => `${styles.noEffect} ${isActive ? styles.active : ""}`}>Metas</NavLink>
                </li>
                <li>
                    <NavLink to="/Suporte" className={({ isActive }) => `${styles.noEffect} ${isActive ? styles.active : ""}`}>Emergência</NavLink>
                </li>
                <li>
                    <NavLink to="/Perfil" className={({ isActive }) => `${styles.noEffect} ${isActive ? styles.active : ""}`}>Perfil</NavLink>
                </li>

            </ul>
        </nav>
    )
}

export default Navbar