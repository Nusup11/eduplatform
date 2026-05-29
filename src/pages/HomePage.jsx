import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import StatCard from '../components/ui/StatCard';
import CardsGrid from '../components/ui/CardsGrid';
import SectionTitle from '../components/ui/SectionTitle';
import Card from '../components/ui/Card';
import BarChart from '../components/ui/BarChart';
import ProgressBar from '../components/ui/ProgressBar';
import { weekActivity } from '../data/mockData';
import styles from './HomePage.module.css';

const homeCourses = [
  { icon: '🧠', title: 'Теория принятия решений', meta: 'Проф. Миркин Е.Л.', pct: 65, color: '#7F77DD', bg: '#EEEDFE' },
  { icon: '💻', title: 'Операционные системы', meta: 'ИСИТ-1-22', pct: 80, color: '#1D9E75', bg: '#E1F5EE' },
  { icon: '🤖', title: 'Нейронные сети', meta: 'MATLAB, Python', pct: 45, color: '#378ADD', bg: '#E6F1FB' },
];

export default function HomePage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const isNew = !user.testsCompleted;

  return (
    <>
      <div className={styles.welcome}>
        <p className={styles.greeting}>
          Добро пожаловать обратно {user.avatar}
        </p>
        <h1 className={styles.name}>{user.name}</h1>
      </div>

      <CardsGrid>
        <StatCard
          label="Пройдено тестов"
          value={user.testsCompleted}
          sub={isNew ? 'Пройдите первый тест!' : '+3 за неделю'}
          valueColor="#534AB7"
        />
        <StatCard
          label="Средний балл"
          value={`${user.averageScore}%`}
          valueColor="#1D9E75"
        />
        <StatCard label="EduPoints" value={user.points} valueColor="#BA7517" />
        <StatCard label="Группа" value={user.group || '—'} />
      </CardsGrid>

      <SectionTitle>Курсы</SectionTitle>
      <div className={styles.courseGrid}>
        {homeCourses.map((c) => (
          <Card
            key={c.title}
            className={styles.miniCourse}
            onClick={() => navigate('/test')}
          >
            <div className={styles.miniIcon} style={{ background: c.bg }}>
              {c.icon}
            </div>
            <div className={styles.miniTitle}>{c.title}</div>
            <div className={styles.miniMeta}>{c.meta}</div>
            <ProgressBar percent={c.pct} color={c.color} />
            <div className={styles.miniPct}>{c.pct}%</div>
          </Card>
        ))}
      </div>

      <SectionTitle>Активность</SectionTitle>
      <Card>
        <BarChart labels={weekActivity.days} values={weekActivity.values} />
      </Card>
    </>
  );
}
