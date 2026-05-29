import { useMemo } from 'react';
import { getUsers } from '../../services/userStorage';
import SectionTitle from '../../components/ui/SectionTitle';
import Card from '../../components/ui/Card';
import styles from './TeacherPages.module.css';

export default function StudentsPage() {
  const students = useMemo(
    () =>
      getUsers()
        .filter((u) => u.role === 'student')
        .sort((a, b) => (b.pts || 0) - (a.pts || 0)),
    [],
  );

  return (
    <>
      <SectionTitle>Список студентов</SectionTitle>
      <Card className={styles.tableCard}>
        <div className={styles.tableWrap}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>#</th>
                <th>Студент</th>
                <th>Группа</th>
                <th>Тестов</th>
                <th>Ср. балл</th>
                <th>Очки</th>
                <th>Статус</th>
              </tr>
            </thead>
            <tbody>
              {students.map((u, i) => {
                const score = u.avgScore || 0;
                const status =
                  score >= 70 ? 'Хорошо' : score >= 50 ? 'Средне' : 'Слабо';
                return (
                  <tr key={u.email}>
                    <td className={styles.muted}>{i + 1}</td>
                    <td>
                      <div className={styles.cellUser}>
                        <span className={styles.cellAv}>{u.avatar || u.initials}</span>
                        <span className={styles.cellName}>{u.name}</span>
                      </div>
                    </td>
                    <td className={styles.muted}>{u.group || '—'}</td>
                    <td>{u.tests || 0}</td>
                    <td>
                      <span
                        style={{
                          fontWeight: 500,
                          color:
                            score >= 70 ? '#1D9E75' : score >= 50 ? '#BA7517' : '#A32D2D',
                        }}
                      >
                        {score}%
                      </span>
                    </td>
                    <td className={styles.pts}>{(u.pts || 0).toLocaleString('ru-RU')}</td>
                    <td>
                      <span
                        className={styles.statusBadge}
                        data-level={score >= 70 ? 'good' : score >= 50 ? 'mid' : 'low'}
                      >
                        {status}
                      </span>
                    </td>
                  </tr>
                );
              })}
              {students.length === 0 && (
                <tr>
                  <td colSpan={7} className={styles.emptyCell}>
                    Студентов пока нет
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </>
  );
}
