import styles from './Badge.module.css';

const map = {
  'badge-purple': styles.purple,
  'badge-teal': styles.teal,
  'badge-amber': styles.amber,
  'badge-blue': styles.blue,
};

export default function Badge({ children, variant = 'badge-purple', className = '' }) {
  return (
    <span className={`${styles.badge} ${map[variant] || styles.purple} ${className}`}>
      {children}
    </span>
  );
}
