import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import styles from './UserMenu.module.css';

export default function UserMenu({ open, onClose }) {
  const { user, logout, isTeacher } = useAuth();
  const navigate = useNavigate();
  const ref = useRef(null);

  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) onClose();
    };
    if (open) document.addEventListener('click', handler);
    return () => document.removeEventListener('click', handler);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className={styles.menu} ref={ref}>
      <div className={styles.header}>
        <div className={styles.name}>{user.name}</div>
        <div className={styles.email}>{user.email}</div>
        <div className={styles.meta}>
          {isTeacher ? user.subject || 'Преподаватель' : user.group || 'Студент'}
        </div>
      </div>
      <button
        type="button"
        className={styles.item}
        onClick={() => {
          navigate('/profile');
          onClose();
        }}
      >
        <i className="ti ti-user" aria-hidden="true" /> Профиль
      </button>
      <button type="button" className={`${styles.item} ${styles.danger}`} onClick={logout}>
        <i className="ti ti-logout" aria-hidden="true" /> Выйти из системы
      </button>
    </div>
  );
}
