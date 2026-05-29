import styles from './StatCard.module.css';

const accents = {
  indigo: styles.accentIndigo,
  teal: styles.accentTeal,
  amber: styles.accentAmber,
  red: styles.accentRed,
};

export default function StatCard({ label, value, sub, valueColor, accent, textValue }) {
  return (
    <div className={`${styles.statCard} ${accent ? accents[accent] || '' : ''}`}>
      <div className={styles.statLabel}>{label}</div>
      {textValue ? (
        <div className={styles.statText}>{value}</div>
      ) : (
        <div className={styles.statValue} style={valueColor ? { color: valueColor } : undefined}>
          {value}
        </div>
      )}
      {sub && <div className={styles.statSub}>{sub}</div>}
    </div>
  );
}
