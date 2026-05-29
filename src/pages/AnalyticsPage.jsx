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
      <SectionTitle>Аналитика</SectionTitle>
      <CardsGrid>
        <StatCard label="Тестов пройдено" value={user.testsCompleted} valueColor="#534AB7" />
        <StatCard label="Средний балл" value={`${user.averageScore}%`} valueColor="#1D9E75" />
        <StatCard label="EduPoints" value={user.points} valueColor="#BA7517" />
        <StatCard label="Группа" value={user.group || '—'} />
      </CardsGrid>

      <div className={styles.grid}>
        <Card>
          <div className={styles.cardTitle}>По курсам</div>
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
          <div className={styles.cardTitle}>Прогресс</div>
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
