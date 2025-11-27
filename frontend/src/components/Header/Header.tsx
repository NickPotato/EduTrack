import { Link, useLocation } from 'react-router-dom';
import styles from './Header.module.css';

export function Header() {
  const location = useLocation();

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        
        {/* LOGO / TÍTULO */}
        <Link to="/" className={styles.logo}>
          EduTrack
        </Link>

        {/* NAV */}
        <nav className={styles.nav}>
          <Link 
            to="/gestao" 
            className={`${styles.navItem} ${location.pathname.startsWith('/gestao') ? styles.active : ''}`}
          >
            Gestão
          </Link>

          <Link 
            to="/sobre" 
            className={`${styles.navItem} ${location.pathname === '/sobre' ? styles.active : ''}`}
          >
            Sobre
          </Link>
        </nav>
      </div>
    </header>
  );
}
