import { useNavigate } from 'react-router-dom';
import ProgressBar from '../ui/ProgressBar';
import Badge from '../ui/Badge';
import styles from './CourseCard.module.css';

function badgeVariant(pct, color) {
  if (color === '#1D9E75') return 'badge-teal';
  if (color === '#378ADD') return 'badge-blue';
  return 'badge-purple';
}

export default function CourseCard({ course }) {
  const navigate = useNavigate();

  return (
    <div
      className={styles.card}
      onClick={() => navigate('/test')}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && navigate('/test')}
    >
      <div className={styles.icon} style={{ background: course.bg }}>
        {course.icon}
      </div>
      <div className={styles.title}>{course.title}</div>
      <div className={styles.meta}>{course.teacher}</div>
      <div className={styles.progressWrap}>
        <ProgressBar percent={course.pct} color={course.color} />
      </div>
      <div className={styles.footer}>
        <Badge variant={badgeVariant(course.pct, course.color)}>
          {course.pct}% завершено
        </Badge>
        <span className={styles.metaSmall}>
          {course.done}/{course.topics} тем
        </span>
      </div>
    </div>
  );
}

export function CourseCardGrid({ courses }) {
  return (
    <div className={styles.grid}>
      {courses.map((c) => (
        <CourseCard key={c.id} course={c} />
      ))}
    </div>
  );
}
