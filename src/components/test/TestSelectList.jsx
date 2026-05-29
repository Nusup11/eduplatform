import Card from '../ui/Card';
import Badge from '../ui/Badge';
import { tests } from '../../data/mockData';
import styles from './TestSelectList.module.css';

export default function TestSelectList({ onSelect }) {
  return (
    <>
      {tests.map((t) => (
        <Card key={t.id} className={styles.row} onClick={() => onSelect(t.id)}>
          <i className={`ti ti-clipboard-check ${styles.icon}`} aria-hidden="true" />
          <div className={styles.body}>
            <div className={styles.title}>{t.title}</div>
            <div className={styles.meta}>
              <Badge variant={t.color}>{t.badge}</Badge>
              <span className={styles.hint}>
                {t.questions.length} вопросов · ~{t.questions.length * 2} мин
              </span>
            </div>
          </div>
          <i className={`ti ti-arrow-right ${styles.arrow}`} aria-hidden="true" />
        </Card>
      ))}
    </>
  );
}
