import { useState } from 'react';
import { useApp } from '../../context/AppContext';
import SectionTitle from '../../components/ui/SectionTitle';
import Card from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';
import styles from './TeacherPages.module.css';

export default function TeacherTestsPage() {
  const { state, dispatch } = useApp();
  const [modalOpen, setModalOpen] = useState(false);
  const [success, setSuccess] = useState('');
  const [title, setTitle] = useState('');
  const [subject, setSubject] = useState('');

  const saveTest = () => {
    if (!title.trim()) return;
    dispatch({
      type: 'ADD_TEACHER_TEST',
      payload: { title: title.trim(), subject: subject.trim() || 'Общий' },
    });
    setSuccess(`Тест «${title.trim()}» добавлен!`);
    setModalOpen(false);
    setTitle('');
    setSubject('');
    setTimeout(() => setSuccess(''), 2500);
  };

  return (
    <>
      <div className={styles.pageHead}>
        <h2 className={styles.pageTitle}>Управление тестами</h2>
        <button type="button" className={styles.btnTeal} onClick={() => setModalOpen(true)}>
          <i className="ti ti-plus" aria-hidden="true" /> Добавить тест
        </button>
      </div>

      {success && (
        <Card className={styles.successBanner}>
          <i className="ti ti-circle-check" aria-hidden="true" /> {success}
        </Card>
      )}

      {modalOpen && (
        <div className={styles.modalOv}>
          <div className={styles.modalBox}>
            <div className={styles.modalHead}>
              <span>Новый тест</span>
              <button type="button" className={styles.closeBtn} onClick={() => setModalOpen(false)}>
                <i className="ti ti-x" />
              </button>
            </div>
            <label className={styles.fl}>Название теста</label>
            <input className={styles.inp} value={title} onChange={(e) => setTitle(e.target.value)} />
            <label className={styles.fl}>Дисциплина</label>
            <input className={styles.inp} value={subject} onChange={(e) => setSubject(e.target.value)} />
            <label className={styles.fl}>Время (минут)</label>
            <input className={styles.inp} type="number" defaultValue={15} min={5} max={120} />
            <div className={styles.modalActions}>
              <button type="button" className={styles.btnCancel} onClick={() => setModalOpen(false)}>
                Отмена
              </button>
              <button type="button" className={styles.btnTeal} onClick={saveTest}>
                Сохранить
              </button>
            </div>
          </div>
        </div>
      )}

      {state.teacherTests.map((t) => (
        <Card key={t.id} className={styles.testRow}>
          <i className="ti ti-clipboard-check" style={{ fontSize: 24, color: '#1D9E75' }} />
          <div className={styles.testBody}>
            <div className={styles.testTitle}>{t.title}</div>
            <Badge variant={t.color}>{t.subject}</Badge>
            <span className={styles.testMeta}>5 вопросов</span>
          </div>
          <Badge variant="badge-teal">Активен</Badge>
        </Card>
      ))}
    </>
  );
}
