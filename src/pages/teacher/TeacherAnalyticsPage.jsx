import { useMemo } from 'react';
import { getUsers } from '../../services/userStorage';
import SectionTitle from '../../components/ui/SectionTitle';
import CardsGrid from '../../components/ui/CardsGrid';
import StatCard from '../../components/ui/StatCard';
import Card from '../../components/ui/Card';
import ProgressBar from '../../components/ui/ProgressBar';
import BarChart from '../../components/ui/BarChart';
import styles from './TeacherPages.module.css';

const weekLabels = ['Нед 1', 'Нед 2', 'Нед 3', 'Нед 4', 'Нед 5', 'Нед 6'];
const weekData = [45, 58, 62, 60, 71, 75];

export default function TeacherAnalyticsPage() {
  const students = useMemo(() => getUsers().filter((u) => u.role === 'student'), []);
  const avg = students.length
    ? Math.round(students.reduce((s, u) => s + (u.avgScore || 0), 0) / students.length)
    : 0;

  return (
    <>
      <SectionTitle>Аналитика по группе</SectionTitle>
      <CardsGrid>
        <StatCard label="Студентов" value={students.length} />
        <StatCard label="Ср. балл группы" value={`${avg}%`} valueColor="#1D9E75" />
        <StatCard
          label="Всего тестов"
          value={students.reduce((s, u) => s + (u.tests || 0), 0)}
          valueColor="#534AB7"
        />
        <StatCard label="Активных тестов" value={3} />
      </CardsGrid>

      <div className={styles.twoCol}>
        <Card>
          <div className={styles.cardTitle}>Успеваемость студентов</div>
          {students.slice(0, 6).map((u) => (
            <div key={u.email} className={styles.barItem}>
              <div className={styles.barHead}>
                <span>{u.name.split(' ')[0]}</span>
                <span style={{ color: (u.avgScore || 0) >= 70 ? '#1D9E75' : '#BA7517' }}>
                  {u.avgScore || 0}%
                </span>
              </div>
              <ProgressBar
                percent={u.avgScore || 0}
                color={(u.avgScore || 0) >= 70 ? '#1D9E75' : '#BA7517'}
                large
              />
            </div>
          ))}
          {students.length === 0 && (
            <p className={styles.empty}>Нет данных</p>
          )}
        </Card>
        <Card>
          <div className={styles.cardTitle}>Динамика по неделям</div>
          <BarChart labels={weekLabels} values={weekData} color="#1D9E75" formatValue={(v) => `${v}%`} />
        </Card>
      </div>
    </>
  );
}
