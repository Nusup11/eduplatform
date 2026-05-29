import { useNavigate } from 'react-router-dom';
import Card from '../ui/Card';
import ProgressBar from '../ui/ProgressBar';
import styles from './CourseListItem.module.css';

export default function CourseListItem({ course }) {
  const navigate = useNavigate();

  return (
    <Card className={styles.row} onClick={() => navigate('/test')}>
      <div className={styles.icon} style={{ background: course.bg }}>
        {course.icon}
      </div>
      <div className={styles.body}>
        <div className={styles.title}>{course.title}</div>
        <div className={styles.teacher}>{course.teacher}</div>
        <ProgressBar percent={course.pct} color={course.color} large />
      </div>
      <div className={styles.side}>
        <div className={styles.pct} style={{ color: course.color }}>
          {course.pct}%
        </div>
        <div className={styles.topics}>
          {course.done}/{course.topics}
        </div>
      </div>
    </Card>
  );
}
