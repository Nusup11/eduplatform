import styles from './StatCard.module.css';

export default function StatCard({ label, value, sub, valueColor }) {
  return (
    <div className={styles.statCard}>
      <div className={styles.statLabel}>{label}</div>
      <div className={styles.statValue} style={valueColor ? { color: valueColor } : undefined}>
        {value}
      </div>
      {sub && <div className={styles.statSub}>{sub}</div>}
    </div>
  );
}
