import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { studentNav, teacherNav } from '../../config/navigation';
import UserMenu from './UserMenu';
import styles from './Header.module.css';

export default function Header() {
  const { user, isAuthenticated, isTeacher } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  const navItems = isTeacher ? teacherNav : studentNav;
  const accent = isTeacher ? '#1D9E75' : '#7F77DD';
  const avBg = isTeacher ? '#9FE1CB' : '#CECBF6';
  const avColor = isTeacher ? '#085041' : '#3C3489';

  if (!isAuthenticated) {
    return (
      <header className={styles.header}>
        <NavLink to="/login" className={styles.logo}>
          <div className={styles.logoIcon} style={{ background: '#7F77DD' }}>
            <i className="ti ti-school" aria-hidden="true" />
          </div>
          EduPlatform
        </NavLink>
        <div className={styles.authLinks}>
          <NavLink to="/login">Войти</NavLink>
          <NavLink to="/register" className={styles.regBtn}>
            Регистрация
          </NavLink>
        </div>
      </header>
    );
  }

  return (
    <header className={styles.header}>
      <NavLink to={isTeacher ? '/dashboard' : '/'} className={styles.logo}>
        <div className={styles.logoIcon} style={{ background: accent }}>
          <i className={`ti ti-${isTeacher ? 'chalkboard' : 'school'}`} aria-hidden="true" />
        </div>
        EduPlatform
      </NavLink>
      <nav className={styles.nav}>
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.end}
            className={({ isActive }) =>
              `${styles.navBtn} ${isActive ? (isTeacher ? styles.navBtnTeacher : styles.navBtnStudent) : ''}`
            }
          >
            <i className={`ti ${item.icon}`} aria-hidden="true" />
            {item.label}
          </NavLink>
        ))}
      </nav>
      <div className={styles.userWrap}>
        <button
          type="button"
          className={styles.userAvatar}
          style={{ background: avBg, color: avColor }}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {user.avatar || user.initials}
        </button>
        <UserMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
      </div>
    </header>
  );
}
