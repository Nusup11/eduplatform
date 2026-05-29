import styles from './CardsGrid.module.css';

export default function CardsGrid({ children }) {
  return <div className={styles.grid}>{children}</div>;
}
