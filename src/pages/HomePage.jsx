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
  {
    icon: '🧠',
    title: 'Теория принятия решений',
    meta: 'Проф. Миркин Е.Л.',
    pct: 65,
    color: 'var(--indigo)',
    bg: 'var(--indigo-lt)',
    brd: 'var(--indigo-md)',
  },
  {
    icon: '💻',
    title: 'Операционные системы',
    meta: 'ИСИТ-1-22',
    pct: 80,
    color: 'var(--teal)',
    bg: 'var(--teal-lt)',
    brd: 'var(--teal-md)',
  },
  {
    icon: '🤖',
    title: 'Нейронные сети',
    meta: 'MATLAB, Python',
    pct: 45,
    color: '#1a4a7a',
    bg: '#e5eef9',
    brd: '#a3c2e0',
  },
];

export default function HomePage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const isNew = !user.testsCompleted;

  return (
    <>
      <div className={styles.welcome}>
        <p className={styles.eyebrow}>Добро пожаловать обратно</p>
        <h1 className={styles.name}>
          {user.name} {user.avatar}
        </h1>
        <p className={styles.group}>{user.group}</p>
      </div>

      <CardsGrid>
        <StatCard
          label="Пройдено тестов"
          value={user.testsCompleted}
          sub={isNew ? 'Пройдите первый тест' : '+3 за неделю'}
          accent="indigo"
          valueColor="var(--indigo)"
        />
        <StatCard
          label="Средний балл"
          value={`${user.averageScore}%`}
          accent="teal"
          valueColor="var(--teal)"
        />
        <StatCard
          label="EduPoints"
          value={user.points}
          accent="amber"
          valueColor="var(--amber)"
        />
        <StatCard label="Группа" value={user.group || '—'} textValue />
      </CardsGrid>

      <SectionTitle>Активные курсы</SectionTitle>
      <div className={styles.courseGrid}>
        {homeCourses.map((c) => (
          <Card
            key={c.title}
            className={styles.miniCourse}
            onClick={() => navigate('/test')}
          >
            <div
              className={styles.miniIcon}
              style={{ background: c.bg, border: `1px solid ${c.brd}` }}
            >
              {c.icon}
            </div>
            <div className={styles.miniTitle}>{c.title}</div>
            <div className={styles.miniMeta}>{c.meta}</div>
            <ProgressBar percent={c.pct} color={c.color} />
            <div className={styles.miniPct}>{c.pct}% завершено</div>
          </Card>
        ))}
      </div>

      <SectionTitle>Активность за неделю</SectionTitle>
      <Card>
        <BarChart
          labels={weekActivity.days}
          values={weekActivity.values}
          color="var(--indigo)"
        />
      </Card>
    </>
  );
}
