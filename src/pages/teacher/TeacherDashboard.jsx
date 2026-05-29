import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { getUsers } from '../../services/userStorage';
import SectionTitle from '../../components/ui/SectionTitle';
import CardsGrid from '../../components/ui/CardsGrid';
import StatCard from '../../components/ui/StatCard';
import Card from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';
import BarChart from '../../components/ui/BarChart';
import styles from './TeacherPages.module.css';

export default function TeacherDashboard() {
  const { user } = useAuth();
  const students = useMemo(() => getUsers().filter((u) => u.role === 'student'), []);

  const avg = students.length
    ? Math.round(students.reduce((s, u) => s + (u.avgScore || 0), 0) / students.length)
    : 0;
  const totalTests = students.reduce((s, u) => s + (u.tests || 0), 0);

  const ranges = ['0–40', '41–60', '61–80', '81–100'];
  const counts = [0, 0, 0, 0];
  students.forEach((u) => {
    const s = u.avgScore || 0;
    if (s <= 40) counts[0]++;
    else if (s <= 60) counts[1]++;
    else if (s <= 80) counts[2]++;
    else counts[3]++;
  });

  return (
    <>
      <div className={styles.welcome}>
        <p className={styles.greeting}>Панель преподавателя</p>
        <h1 className={styles.name}>{user.name}</h1>
        <Badge variant="badge-teacher">
          <i className="ti ti-chalkboard" aria-hidden="true" /> {user.subject || 'Преподаватель'}
        </Badge>
      </div>

      <CardsGrid>
        <StatCard label="Студентов всего" value={students.length} valueColor="#1D9E75" />
        <StatCard label="Тестов сдано" value={totalTests} valueColor="#534AB7" />
        <StatCard label="Средний балл" value={`${avg}%`} valueColor="#BA7517" />
        <StatCard label="Активных курсов" value={3} />
      </CardsGrid>

      <SectionTitle>Успеваемость студентов</SectionTitle>
      <Card>
        {students.length === 0 ? (
          <p className={styles.empty}>Студенты ещё не зарегистрированы.</p>
        ) : (
          students.slice(0, 5).map((u) => (
            <div key={u.email} className={styles.studentRow}>
              <div className={styles.stAvatar}>{u.avatar || u.initials}</div>
              <div className={styles.stBody}>
                <div className={styles.stName}>{u.name}</div>
                <div className={styles.stGroup}>{u.group || '—'}</div>
              </div>
              <div className={styles.stScore}>
                <div
                  style={{
                    color:
                      (u.avgScore || 0) >= 70
                        ? '#1D9E75'
                        : (u.avgScore || 0) >= 50
                          ? '#BA7517'
                          : '#A32D2D',
                  }}
                >
                  {u.avgScore || 0}%
                </div>
                <div className={styles.stMeta}>{u.tests || 0} тестов</div>
              </div>
            </div>
          ))
        )}
        {students.length > 5 && (
          <Link to="/students" className={styles.moreLink}>
            Посмотреть всех →
          </Link>
        )}
      </Card>

      <SectionTitle>Распределение баллов</SectionTitle>
      <Card>
        <BarChart labels={ranges} values={counts} color="#1D9E75" />
      </Card>
    </>
  );
}
