import styles from './ProgressBar.module.css';

export default function ProgressBar({ percent, color, large }) {
  return (
    <div className={`${styles.progressBar} ${large ? styles.progressBarLg : ''}`}>
      <div
        className={styles.progressFill}
        style={{ width: `${percent}%`, background: color }}
      />
    </div>
  );
}
