import { Outlet } from 'react-router-dom';
import Header from './Header';
import styles from './AppLayout.module.css';

export default function AppLayout() {
  return (
    <div className={styles.app}>
      <h2 className="sr-only">
        Обучающая онлайн-платформа с тестами, рейтингами и аналитикой успеваемости
      </h2>
      <Header />
      <main className={styles.main}>
        <Outlet />
      </main>
    </div>
  );
}
