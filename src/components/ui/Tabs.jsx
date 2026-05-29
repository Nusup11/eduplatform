import styles from './Tabs.module.css';

export default function Tabs({ items, active, onChange }) {
  return (
    <div className={styles.tabs}>
      {items.map((item) => (
        <button
          key={item.id}
          type="button"
          className={`${styles.tab} ${active === item.id ? styles.tabActive : ''}`}
          onClick={() => onChange(item.id)}
        >
          {item.label}
        </button>
      ))}
    </div>
  );
}
