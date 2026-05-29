import SectionTitle from '../components/ui/SectionTitle';
import StatCard from '../components/ui/StatCard';
import CardsGrid from '../components/ui/CardsGrid';
import Card from '../components/ui/Card';
import BarChart from '../components/ui/BarChart';
import CourseResultBars from '../components/analytics/CourseResultBars';
import Heatmap from '../components/analytics/Heatmap';
import { analyticsStats, weekProgress } from '../data/mockData';
import styles from './AnalyticsPage.module.css';

export default function AnalyticsPage() {
  return (
    <>
      <SectionTitle>Аналитика успеваемости</SectionTitle>

      <CardsGrid>
        <StatCard
          label="Лучший результат"
          value={analyticsStats.bestResult.value}
          sub={analyticsStats.bestResult.sub}
          valueColor="#534AB7"
        />
        <StatCard label="Среднее время на тест" value={analyticsStats.avgTime.value} />
        <StatCard
          label="Тестов в этом месяце"
          value={analyticsStats.testsThisMonth.value}
          valueColor="#1D9E75"
        />
        <StatCard
          label="Серия дней"
          value={analyticsStats.streak.value}
          sub={analyticsStats.streak.sub}
          valueColor="#BA7517"
        />
      </CardsGrid>

      <div className={styles.grid}>
        <Card>
          <div className={styles.cardTitle}>Результаты по курсам</div>
          <CourseResultBars />
        </Card>
        <Card>
          <div className={styles.cardTitle}>Активность за месяц</div>
          <Heatmap />
        </Card>
      </div>

      <Card className={styles.progressCard}>
        <div className={styles.cardTitle}>Прогресс по неделям</div>
        <div className={styles.chartTall}>
          <BarChart
            labels={weekProgress.map((_, i) => `Нед ${i + 1}`)}
            values={weekProgress}
            formatValue={(v) => `${v}%`}
          />
        </div>
      </Card>
    </>
  );
}
