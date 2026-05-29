import { useAuth } from '../hooks/useAuth';
import SectionTitle from '../components/ui/SectionTitle';
import StatCard from '../components/ui/StatCard';
import CardsGrid from '../components/ui/CardsGrid';
import Card from '../components/ui/Card';
import ProgressBar from '../components/ui/ProgressBar';
import BarChart from '../components/ui/BarChart';
import { courseResults, weekProgress } from '../data/mockData';
import styles from './AnalyticsPage.module.css';

export default function AnalyticsPage() {
  const { user } = useAuth();

  return (
    <>
      <SectionTitle>Личная аналитика</SectionTitle>
      <CardsGrid>
        <StatCard label="Тестов пройдено" value={user.testsCompleted} accent="indigo" valueColor="var(--indigo)" />
        <StatCard label="Средний балл" value={`${user.averageScore}%`} accent="teal" valueColor="var(--teal)" />
        <StatCard label="EduPoints" value={user.points} accent="amber" valueColor="var(--amber)" />
        <StatCard label="Группа" value={user.group || '—'} textValue />
      </CardsGrid>

      <div className={styles.grid}>
        <Card>
          <div className={styles.cardTitle}>Результаты по курсам</div>
          {courseResults.map((c) => (
            <div key={c.label} className={styles.barItem}>
              <div className={styles.barHead}>
                <span>{c.label}</span>
                <span style={{ color: c.color, fontWeight: 500 }}>{c.pct}%</span>
              </div>
              <ProgressBar percent={c.pct} color={c.color} large />
            </div>
          ))}
        </Card>
        <Card>
          <div className={styles.cardTitle}>Прогресс по неделям</div>
          <div className={styles.chartTall}>
            <BarChart
              labels={weekProgress.map((_, i) => `Н${i + 1}`)}
              values={weekProgress}
              formatValue={(v) => `${v}%`}
            />
          </div>
        </Card>
      </div>
    </>
  );
}
