import { useMemo } from 'react';
import { generateHeatmapData } from '../../data/mockData';
import styles from './Heatmap.module.css';

const HEAT_COLORS = ['transparent', '#EEEDFE', '#AFA9EC', '#7F77DD', '#534AB7'];

export default function Heatmap() {
  const data = useMemo(() => generateHeatmapData(), []);

  return (
    <>
      <div className={styles.grid}>
        {data.map((v, i) => (
          <div
            key={i}
            className={styles.cell}
            style={{ background: HEAT_COLORS[v] }}
            title={`${v} тестов`}
          />
        ))}
      </div>
      <div className={styles.legend}>
        <span className={styles.legendLabel}>Меньше</span>
        {HEAT_COLORS.slice(1).map((c) => (
          <div key={c} className={styles.legendBox} style={{ background: c }} />
        ))}
        <span className={styles.legendLabel}>Больше</span>
      </div>
    </>
  );
}
