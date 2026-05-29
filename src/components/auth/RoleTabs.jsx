import styles from './AuthPages.module.css';

export default function RoleTabs({ role, onChange }) {
  return (
    <div className={styles.roleTabs}>
      <button
        type="button"
        className={`${styles.roleTab} ${role === 'student' ? styles.roleTabActiveStudent : ''}`}
        onClick={() => onChange('student')}
      >
        <i className="ti ti-user" aria-hidden="true" /> Студент
      </button>
      <button
        type="button"
        className={`${styles.roleTab} ${role === 'teacher' ? styles.roleTabActiveTeacher : ''}`}
        onClick={() => onChange('teacher')}
      >
        <i className="ti ti-chalkboard" aria-hidden="true" /> Преподаватель
      </button>
    </div>
  );
}
