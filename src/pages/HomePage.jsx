import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { useAuth } from '../hooks/useAuth';
import StatCard from '../components/ui/StatCard';
import CardsGrid from '../components/ui/CardsGrid';
import SectionTitle from '../components/ui/SectionTitle';
import Card from '../components/ui/Card';
import BarChart from '../components/ui/BarChart';
import { CourseCardGrid } from '../components/course/CourseCard';
import { courses, weekActivity } from '../data/mockData';
import styles from './HomePage.module.css';

export default function HomePage() {
  const { state } = useApp();
  const { isAuthenticated } = useAuth();
  const activeCourses = courses.filter((c) => c.status === 'active');

  return (
    <>
      <div className={styles.welcome}>
        <p className={styles.greeting}>
          {isAuthenticated ? 'Добро пожаловать обратно 👋' : 'Добро пожаловать на EduPlatform 👋'}
        </p>
        <h1 className={styles.name}>{state.user.name}</h1>
      </div>

      {!isAuthenticated && (
        <div className={styles.guestBanner}>
          <p>Войдите или зарегистрируйтесь, чтобы проходить тесты и видеть аналитику.</p>
          <div className={styles.guestActions}>
            <Link to="/login" className={styles.guestBtnPrimary}>
              Войти
            </Link>
            <Link to="/register" className={styles.guestBtnSecondary}>
              Регистрация
            </Link>
          </div>
        </div>
      )}

      <CardsGrid>
        <StatCard
          label="Пройдено тестов"
          value={state.testsCompleted}
          sub="+3 за эту неделю"
          valueColor="#534AB7"
        />
        <StatCard
          label="Средний балл"
          value={`${state.user.averageScore}%`}
          sub="↑ 5% от прошлого месяца"
          valueColor="#1D9E75"
        />
        <StatCard
          label="Место в рейтинге"
          value={`🥈 ${state.user.rank}`}
          sub={`из ${state.user.totalStudents} студентов`}
          valueColor="#BA7517"
        />
        <StatCard
          label="Очков набрано"
          value={state.userPoints.toLocaleString('ru-RU')}
          sub="EduPoints"
        />
      </CardsGrid>

      <SectionTitle>Продолжить обучение</SectionTitle>
      <CourseCardGrid courses={activeCourses} />

      <SectionTitle>Активность за неделю</SectionTitle>
      <Card>
        <BarChart
          labels={weekActivity.days}
          values={weekActivity.values}
        />
      </Card>
    </>
  );
}
