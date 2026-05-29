import { NavLink, Link, useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { useAuth } from '../../hooks/useAuth';
import styles from './Header.module.css';

const navItems = [
  { to: '/', label: 'Главная', icon: 'ti-home' },
  { to: '/courses', label: 'Курсы', icon: 'ti-books' },
  { to: '/test', label: 'Тест', icon: 'ti-clipboard-check' },
  { to: '/rating', label: 'Рейтинг', icon: 'ti-trophy' },
  { to: '/analytics', label: 'Аналитика', icon: 'ti-chart-bar' },
];

export default function Header() {
  const { state } = useApp();
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className={styles.header}>
      <NavLink to="/" className={styles.logo}>
        <div className={styles.logoIcon}>
          <i className="ti ti-school" aria-hidden="true" />
        </div>
        EduPlatform
      </NavLink>
      <nav className={styles.nav}>
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.to === '/'}
            className={({ isActive }) =>
              `${styles.navBtn} ${isActive ? styles.navBtnActive : ''}`
            }
          >
            <i className={`ti ${item.icon}`} aria-hidden="true" />
            {item.label}
          </NavLink>
        ))}
      </nav>
      <div className={styles.userBlock}>
        {isAuthenticated ? (
          <>
            <div className={styles.userAvatar} title={state.user.name}>
              {state.user.initials}
            </div>
            <button type="button" className={styles.logoutBtn} onClick={handleLogout}>
              Выйти
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className={styles.authLink}>
              Войти
            </Link>
            <Link to="/register" className={styles.authBtnPrimary}>
              Регистрация
            </Link>
          </>
        )}
      </div>
    </header>
  );
}
