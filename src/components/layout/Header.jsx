import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { studentNav, teacherNav } from '../../config/navigation';
import UserMenu from './UserMenu';
import styles from './Header.module.css';

export default function Header() {
  const { user, isAuthenticated, isTeacher, logout } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const navItems = isTeacher ? teacherNav : studentNav;
  const homeTo = isTeacher ? '/dashboard' : '/';

  if (!isAuthenticated) {
    return (
      <header className={styles.header}>
        <NavLink to="/login" className={styles.logo}>
          <div className={styles.logoCrest}>
            <i className="ti ti-school" aria-hidden="true" />
          </div>
          <div className={styles.logoText}>
            <span className={styles.logoName}>EduPlatform</span>
            <span className={styles.logoSub}>МУК — Академическая система</span>
          </div>
        </NavLink>
        <div className={styles.hdrAuth}>
          <button type="button" className={styles.btnHdrLogin} onClick={() => navigate('/login')}>
            <i className="ti ti-login" aria-hidden="true" />
            Войти
          </button>
        </div>
      </header>
    );
  }

  return (
    <header className={styles.header}>
      <NavLink to={homeTo} className={styles.logo}>
        <div className={styles.logoCrest}>
          <i className={`ti ti-${isTeacher ? 'chalkboard' : 'school'}`} aria-hidden="true" />
        </div>
        <div className={styles.logoText}>
          <span className={styles.logoName}>EduPlatform</span>
          <span className={styles.logoSub}>МУК — Академическая система</span>
        </div>
      </NavLink>

      <nav className={styles.nav} aria-label="Навигация">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.end}
            className={({ isActive }) => `${styles.navBtn} ${isActive ? styles.navBtnOn : ''}`}
          >
            <i className={`ti ${item.icon}`} aria-hidden="true" />
            {item.label}
          </NavLink>
        ))}
      </nav>

      <div className={styles.userBlock}>
        <div className={styles.umenuWrap}>
          <button
            type="button"
            className={styles.userAvatar}
            style={{
              background: isTeacher ? 'var(--teal)' : 'var(--indigo)',
              color: '#fff',
            }}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Меню пользователя"
          >
            {user.avatar || user.initials}
          </button>
          <UserMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
        </div>
        <button type="button" className={styles.btnHdrLogout} onClick={logout} title="Выйти из системы">
          <i className="ti ti-logout" aria-hidden="true" />
          <span className={styles.logoutLabel}>Выйти</span>
        </button>
      </div>
    </header>
  );
}
