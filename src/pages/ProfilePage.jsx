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
        {isTeacher ? 'Профиль преподавателя' : 'Личный профиль'}
      </SectionTitle>
      <Card className={styles.card}>
        <div className={styles.head}>
          <div
            className={styles.avatar}
            style={{
              background: isTeacher ? 'var(--teal-lt)' : 'var(--indigo-lt)',
              border: `2px solid ${isTeacher ? 'var(--teal-md)' : 'var(--indigo-md)'}`,
            }}
          >
            {user.avatar || user.initials}
          </div>
          <div>
            <div className={styles.name}>{user.name}</div>
            <div className={styles.email}>{user.email}</div>
            <div className={styles.meta}>
              {isTeacher ? user.subject : user.group}
            </div>
            <Badge variant={isTeacher ? 'badge-teacher' : 'badge-purple'}>
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
              <StatCard label="Тестов" value={user.testsCompleted} accent="indigo" valueColor="var(--indigo)" />
              <StatCard label="EduPoints" value={user.points} accent="amber" valueColor="var(--amber)" />
              <StatCard label="Ср. балл" value={`${user.averageScore}%`} accent="teal" valueColor="var(--teal)" />
            </CardsGrid>
          )}
          {isTeacher && (
            <CardsGrid>
              <StatCard label="Предмет" value={user.subject || '—'} textValue />
              <StatCard
                label="Студентов"
                value={studentCount}
                accent="teal"
                valueColor="var(--teal)"
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
