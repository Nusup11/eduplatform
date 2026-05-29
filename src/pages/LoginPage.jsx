import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import styles from './AuthForm.module.css';

export default function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, isAuthLoading, authError, clearAuthError, isAuthenticated } =
    useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const from = location.state?.from || '/';

  useEffect(() => {
    if (isAuthenticated) navigate(from, { replace: true });
  }, [isAuthenticated, from, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    clearAuthError();
    try {
      await login({ email, password });
      navigate(from, { replace: true });
    } catch {
      /* ошибка в authError */
    }
  };

  return (
    <>
      <h1 className={styles.title}>Вход</h1>
      <p className={styles.subtitle}>Войдите в свой аккаунт EduPlatform</p>

      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.field}>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            autoComplete="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
          />
        </div>
        <div className={styles.field}>
          <label htmlFor="password">Пароль</label>
          <input
            id="password"
            type="password"
            autoComplete="current-password"
            required
            minLength={6}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {authError && <p className={styles.error}>{authError}</p>}

        <p className={styles.hint}>
          Демо: <strong>admin@teach.local</strong> / <strong>password123</strong>
        </p>

        <button type="submit" className={styles.submit} disabled={isAuthLoading}>
          {isAuthLoading ? 'Вход…' : 'Войти'}
        </button>
      </form>

      <p className={styles.footer}>
        Нет аккаунта? <Link to="/register">Зарегистрироваться</Link>
      </p>
    </>
  );
}
