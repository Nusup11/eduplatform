import styles from './BarChart.module.css';

export default function BarChart({ labels, values, color = '#7F77DD', formatValue }) {
  const max = Math.max(...values, 1);

  return (
    <div className={styles.wrap}>
      {values.map((v, i) => {
        const pct = Math.round((v / max) * 100);
        const opacity = 0.4 + (v / max) * 0.6;
        return (
          <div key={labels[i]} className={styles.col}>
            <div className={styles.barVal}>{formatValue ? formatValue(v) : v}</div>
            <div
              className={styles.bar}
              style={{ height: `${pct}%`, background: color, opacity }}
            />
            <div className={styles.barLabel}>{labels[i]}</div>
          </div>
        );
      })}
    </div>
  );
}
