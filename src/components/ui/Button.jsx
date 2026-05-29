import styles from './Button.module.css';

export default function Button({ children, primary, onClick, type = 'button' }) {
  return (
    <button
      type={type}
      className={`${styles.btn} ${primary ? styles.primary : ''}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
