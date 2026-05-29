import styles from './Card.module.css';

export default function Card({ children, className = '', style, onClick }) {
  return (
    <div
      className={`${styles.card} ${onClick ? styles.clickable : ''} ${className}`}
      style={style}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={
        onClick
          ? (e) => {
              if (e.key === 'Enter') onClick();
            }
          : undefined
      }
    >
      {children}
    </div>
  );
}
