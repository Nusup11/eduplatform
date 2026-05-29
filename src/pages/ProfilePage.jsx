import { useMemo } from 'react';
import { useAuth } from '../hooks/useAuth';
import { getUsers } from '../services/userStorage';
import SectionTitle from '../components/ui/SectionTitle';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import StatCard from '../components/ui/StatCard';
import CardsGrid from '../components/ui/CardsGrid';
import styles from './ProfilePage.module.css';

export default function ProfilePage() {
  const { user, isTeacher, logout } = useAuth();
  const studentCount = useMemo(
    () => getUsers().filter((u) => u.role === 'student').length,
    [],
  );

  return (
    <>
      <SectionTitle>
        {isTeacher ? 'Профиль преподавателя' : 'Профиль'}
      </SectionTitle>
      <Card className={styles.card}>
        <div className={styles.head}>
          <div
            className={styles.avatar}
            style={{ background: isTeacher ? '#9FE1CB' : '#CECBF6' }}
          >
            {user.avatar || user.initials}
          </div>
          <div>
            <div className={styles.name}>{user.name}</div>
            <div className={styles.email}>{user.email}</div>
            <div className={styles.meta}>
              {isTeacher ? user.subject : user.group}
            </div>
            <Badge variant={isTeacher ? 'badge-amber' : 'badge-purple'}>
              {isTeacher ? (
                <>
                  <i className="ti ti-chalkboard" aria-hidden="true" /> Преподаватель
                </>
              ) : (
                <>
                  <i className="ti ti-user" aria-hidden="true" /> Студент
                </>
              )}
            </Badge>
          </div>
        </div>
        <div className={styles.body}>
          {!isTeacher && (
            <CardsGrid>
              <StatCard label="Тестов" value={user.testsCompleted} valueColor="#534AB7" />
              <StatCard label="EduPoints" value={user.points} valueColor="#BA7517" />
              <StatCard label="Ср. балл" value={`${user.averageScore}%`} valueColor="#1D9E75" />
            </CardsGrid>
          )}
          {isTeacher && (
            <CardsGrid>
              <StatCard label="Предмет" value={user.subject || '—'} />
              <StatCard
                label="Студентов"
                value={studentCount}
                valueColor="#1D9E75"
              />
            </CardsGrid>
          )}
          <button type="button" className={styles.logout} onClick={logout}>
            <i className="ti ti-logout" aria-hidden="true" /> Выйти из аккаунта
          </button>
        </div>
      </Card>
    </>
  );
}
