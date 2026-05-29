import { Link, Outlet } from 'react-router-dom';
import styles from './AuthLayout.module.css';

export default function AuthLayout() {
  return (
    <div className={styles.wrap}>
      <div className={styles.card}>
        <Link to="/" className={styles.logo}>
          <div className={styles.logoIcon}>
            <i className="ti ti-school" aria-hidden="true" />
          </div>
          EduPlatform
        </Link>
        <Outlet />
      </div>
    </div>
  );
}
