import { useState, useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import RoleTabs from '../components/auth/RoleTabs';
import { AVATARS } from '../data/avatars';
import { useAuth } from '../hooks/useAuth';
import styles from '../components/auth/AuthPages.module.css';

function passwordStrength(v) {
  if (!v.length) return { width: 0, label: '', color: '' };
  let s = 0;
  if (v.length >= 8) s++;
  if (/[A-Z]/.test(v)) s++;
  if (/[0-9]/.test(v)) s++;
  if (/[^A-Za-z0-9]/.test(v)) s++;
  const cols = ['#E24B4A', '#EF9F27', '#1D9E75', '#1D9E75'];
  const labs = ['Слабый', 'Средний', 'Хороший', 'Сильный'];
  const pts = [25, 50, 75, 100];
  const i = Math.max(0, s - 1);
  return { width: pts[i], label: labs[i], color: cols[i] };
}

export default function RegisterPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { register, isAuthenticated, user, authError, clearAuthError } = useAuth();

  const [role, setRole] = useState(searchParams.get('role') === 'teacher' ? 'teacher' : 'student');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [group, setGroup] = useState('');
  const [subject, setSubject] = useState('');
  const [avatar, setAvatar] = useState(AVATARS[0]);
  const [errors, setErrors] = useState({});

  const isTeacher = role === 'teacher';
  const accent = isTeacher ? '#1D9E75' : '#7F77DD';
  const str = passwordStrength(password);

  useEffect(() => {
    if (isAuthenticated && user) {
      navigate(user.role === 'teacher' ? '/dashboard' : '/', { replace: true });
    }
  }, [isAuthenticated, user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    clearAuthError();
    const next = {};
    if (name.trim().length < 2) next.name = 'Имя минимум 2 символа';
    if (!email || !/\S+@\S+\.\S+/.test(email)) next.email = 'Некорректный email';
    if (password.length < 8) next.password = 'Минимум 8 символов';
    if (password !== password2) next.password2 = 'Пароли не совпадают';
    setErrors(next);
    if (Object.keys(next).length) return;

    try {
      await register({
        name: name.trim(),
        email: email.trim(),
        password,
        role,
        avatar,
        group: isTeacher ? '' : group,
        subject: isTeacher ? subject : '',
      });
      navigate(`/login?role=${role}`, { replace: true, state: { registered: true } });
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

        <div className={styles.title}>Регистрация</div>
        <div className={styles.subtitle}>Выберите роль и заполните данные</div>

        <RoleTabs role={role} onChange={setRole} />

        <form onSubmit={handleSubmit}>
          <div className={styles.field}>
            <label className={styles.label}>Полное имя</label>
            <div className={styles.inputWrap}>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder={isTeacher ? 'Иванова А.Б.' : 'Иванов Иван'}
              />
              <i className="ti ti-user fieldIcon" aria-hidden="true" />
            </div>
            {errors.name && <div className={styles.error}>{errors.name}</div>}
          </div>

          {isTeacher ? (
            <div className={styles.field}>
              <label className={styles.label}>Предмет / дисциплина</label>
              <div className={styles.inputWrap}>
                <input
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="Теория принятия решений"
                />
                <i className="ti ti-book fieldIcon" aria-hidden="true" />
              </div>
            </div>
          ) : (
            <div className={styles.field}>
              <label className={styles.label}>Группа</label>
              <div className={styles.inputWrap}>
                <input
                  value={group}
                  onChange={(e) => setGroup(e.target.value)}
                  placeholder="ИСИТ-1-22"
                />
                <i className="ti ti-building-community fieldIcon" aria-hidden="true" />
              </div>
            </div>
          )}

          <div className={styles.field}>
            <label className={styles.label}>Email</label>
            <div className={styles.inputWrap}>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <i className="ti ti-mail fieldIcon" aria-hidden="true" />
            </div>
            {errors.email && <div className={styles.error}>{errors.email}</div>}
            {authError?.includes('занят') && (
              <div className={styles.error}>{authError}</div>
            )}
          </div>

          <div className={styles.field}>
            <label className={styles.label}>Аватар</label>
            <div className={styles.avPick}>
              {AVATARS.map((a) => (
                <button
                  key={a}
                  type="button"
                  className={`${styles.avOpt} ${avatar === a ? styles.avOptOn : ''}`}
                  onClick={() => setAvatar(a)}
                >
                  {a}
                </button>
              ))}
            </div>
          </div>

          <div className={styles.field}>
            <label className={styles.label}>Пароль</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Минимум 8 символов"
              style={{
                width: '100%',
                padding: '10px 12px',
                border: '0.5px solid var(--color-border-secondary)',
                borderRadius: 'var(--border-radius-md)',
              }}
            />
            <div className={styles.strBar}>
              <div
                className={styles.strFill}
                style={{ width: `${str.width}%`, background: str.color }}
              />
            </div>
            {str.label && (
              <div className={styles.strLabel} style={{ color: str.color }}>
                {str.label}
              </div>
            )}
            {errors.password && <div className={styles.error}>{errors.password}</div>}
          </div>

          <div className={styles.field}>
            <label className={styles.label}>Подтверждение пароля</label>
            <input
              type="password"
              value={password2}
              onChange={(e) => setPassword2(e.target.value)}
              style={{
                width: '100%',
                padding: '10px 12px',
                border: '0.5px solid var(--color-border-secondary)',
                borderRadius: 'var(--border-radius-md)',
              }}
            />
            {errors.password2 && <div className={styles.error}>{errors.password2}</div>}
          </div>

          {authError && !authError.includes('занят') && (
            <div className={styles.errorBox}>{authError}</div>
          )}

          <button
            type="submit"
            className={`${styles.btnPrimary} ${isTeacher ? styles.btnPrimaryTeacher : styles.btnPrimaryStudent}`}
          >
            <i className="ti ti-user-plus" aria-hidden="true" />
            Зарегистрироваться
          </button>
        </form>

        <p className={styles.footer}>
          Уже есть аккаунт? <Link to={`/login?role=${role}`}>Войти</Link>
        </p>
      </div>
    </div>
  );
}
