import ProgressBar from '../ui/ProgressBar';
import { courseResults } from '../../data/mockData';
import styles from './CourseResultBars.module.css';

export default function CourseResultBars() {
  return (
    <>
      {courseResults.map((c) => (
        <div key={c.label} className={styles.item}>
          <div className={styles.header}>
            <span className={styles.label}>{c.label}</span>
            <span className={styles.pct} style={{ color: c.color }}>
              {c.pct}%
            </span>
          </div>
          <ProgressBar percent={c.pct} color={c.color} large />
        </div>
      ))}
    </>
  );
}
