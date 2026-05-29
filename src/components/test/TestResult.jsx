import Button from '../ui/Button';
import styles from './TestResult.module.css';

export default function TestResult({ result, onRetry, onRating }) {
  if (!result) return null;

  return (
    <div className={styles.wrap}>
      <div className={styles.circle}>
        <div className={styles.score}>{result.percent}%</div>
        <div className={styles.label}>баллов</div>
      </div>
      <div className={styles.title}>{result.title}</div>
      <div className={styles.sub}>{result.sub}</div>
      <div className={styles.actions}>
        <Button onClick={onRetry}>
          <i className="ti ti-refresh" aria-hidden="true" /> Повторить
        </Button>
        <Button primary onClick={onRating}>
          <i className="ti ti-trophy" aria-hidden="true" /> Рейтинг
        </Button>
      </div>
    </div>
  );
}
