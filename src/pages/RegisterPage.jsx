import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import styles from './AuthForm.module.css';

export default function RegisterPage() {
  const navigate = useNavigate();
  const { register, isAuthLoading, authError, clearAuthError, isAuthenticated } =
    useAuth();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    if (isAuthenticated) navigate('/', { replace: true });
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    clearAuthError();
    try {
      await register({ name, email, password });
      navigate('/', { replace: true });
    } catch {
      /* ошибка в authError */
    }
  };

  return (
    <>
      <h1 className={styles.title}>Регистрация</h1>
      <p className={styles.subtitle}>Создайте аккаунт студента</p>

      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.field}>
          <label htmlFor="name">Имя</label>
          <input
            id="name"
            type="text"
            autoComplete="name"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Иван Иванов"
          />
        </div>
        <div className={styles.field}>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            autoComplete="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className={styles.field}>
          <label htmlFor="password">Пароль</label>
          <input
            id="password"
            type="password"
            autoComplete="new-password"
            required
            minLength={6}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {authError && <p className={styles.error}>{authError}</p>}

        <button type="submit" className={styles.submit} disabled={isAuthLoading}>
          {isAuthLoading ? 'Создание…' : 'Зарегистрироваться'}
        </button>
      </form>

      <p className={styles.footer}>
        Уже есть аккаунт? <Link to="/login">Войти</Link>
      </p>
    </>
  );
}
