import { useState, useEffect } from 'react';
import { Link, useNavigate, useSearchParams, useLocation } from 'react-router-dom';
import RoleTabs from '../components/auth/RoleTabs';
import { useAuth } from '../hooks/useAuth';
import { getHomePath } from '../config/navigation';
import styles from '../components/auth/AuthPages.module.css';

const DEMO = {
  student: { email: 'nusup@muk.edu.kg', password: 'Nusup123', label: 'Жумагулов Нусуп (студент)' },
  teacher: { email: 'mirkin@muk.edu.kg', password: 'Teacher123', label: 'Миркин Е.Л. (учитель)' },
};

export default function LoginPage() {
  const [searchParams] = useSearchParams();
  const location = useLocation();
  const navigate = useNavigate();
  const showOk = location.state?.registered;
  const { login, isAuthenticated, user, authError, clearAuthError } = useAuth();

  const [role, setRole] = useState(searchParams.get('role') === 'teacher' ? 'teacher' : 'student');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [fieldError, setFieldError] = useState('');

  const isTeacher = role === 'teacher';
  const accent = isTeacher ? '#1D9E75' : '#7F77DD';

  useEffect(() => {
    if (isAuthenticated && user) {
      navigate(getHomePath(user.role), { replace: true });
    }
  }, [isAuthenticated, user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    clearAuthError();
    setFieldError('');
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      setFieldError('Введите корректный email');
      return;
    }
    try {
      const u = await login(email.trim(), password, role);
      navigate(getHomePath(u.role), { replace: true });
    } catch {
      /* authError */
    }
  };

  const handleDemo = async () => {
    const d = DEMO[role];
    setEmail(d.email);
    setPassword(d.password);
    try {
      const u = await login(d.email, d.password, role);
      navigate(getHomePath(u.role), { replace: true });
    } catch {
      /* */
    }
  };

  return (
    <div className={styles.wrap}>
      <div className={styles.card}>
        <div className={styles.logo}>
          <div className={styles.logoIcon} style={{ background: accent }}>
            <i className={`ti ti-${isTeacher ? 'chalkboard' : 'school'}`} aria-hidden="true" />
          </div>
          <span className={styles.logoText}>EduPlatform</span>
        </div>

        <div className={styles.title}>Добро пожаловать!</div>
        <div className={styles.subtitle}>Выберите роль и войдите в систему</div>

        <RoleTabs role={role} onChange={setRole} />

        {showOk && (
          <div className={styles.okBanner}>
            <i className="ti ti-circle-check" aria-hidden="true" />
            Аккаунт создан! Войдите.
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className={styles.field}>
            <label className={styles.label}>Email</label>
            <div className={`${styles.inputWrap} ${isTeacher ? styles.inputWrapTeacher : ''}`}>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={isTeacher ? 'teacher@muk.edu.kg' : 'you@example.com'}
              />
              <i className="ti ti-mail fieldIcon" aria-hidden="true" />
            </div>
            {fieldError && <div className={styles.error}>{fieldError}</div>}
          </div>

          <div className={styles.field}>
            <label className={styles.label}>Пароль</label>
            <div className={`${styles.inputWrap} ${isTeacher ? styles.inputWrapTeacher : ''}`}>
              <input
                type={showPw ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Введите пароль"
              />
              <button
                type="button"
                className={styles.fieldIcon}
                onClick={() => setShowPw(!showPw)}
                aria-label="Показать пароль"
              >
                <i className={`ti ti-eye${showPw ? '-off' : ''}`} />
              </button>
            </div>
          </div>

          {authError && <div className={styles.errorBox}>{authError}</div>}

          <button
            type="submit"
            className={`${styles.btnPrimary} ${isTeacher ? styles.btnPrimaryTeacher : styles.btnPrimaryStudent}`}
          >
            <i className="ti ti-login" aria-hidden="true" />
            Войти как {isTeacher ? 'учитель' : 'студент'}
          </button>

          <div className={styles.divider}>
            <div className={styles.dividerLine} />
            или
            <div className={styles.dividerLine} />
          </div>

          <button type="button" className={styles.btnDemo} onClick={handleDemo}>
            <i className="ti ti-bolt" aria-hidden="true" />
            Демо: {DEMO[role].label}
          </button>
        </form>

        <p className={styles.footer}>
          Нет аккаунта?{' '}
          <Link to={`/register?role=${role}`}>Зарегистрироваться</Link>
        </p>
      </div>
    </div>
  );
}
