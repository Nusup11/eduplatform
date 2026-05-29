import Button from '../ui/Button';
import styles from './QuestionView.module.css';

const LETTERS = ['А', 'Б', 'В', 'Г'];

function formatTime(seconds) {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${s < 10 ? '0' : ''}${s}`;
}

export default function QuestionView({
  testTitle,
  timeLeft,
  currentIndex,
  total,
  question,
  selectedIndex,
  showFeedback,
  onSelect,
  onNext,
}) {
  const progress = Math.round((currentIndex / total) * 100);

  const getOptionClass = (i) => {
    if (!showFeedback) {
      return selectedIndex === i ? `${styles.option} ${styles.selected}` : styles.option;
    }
    if (i === question.ans) return `${styles.option} ${styles.correct} ${styles.disabled}`;
    if (i === selectedIndex && i !== question.ans) {
      return `${styles.option} ${styles.wrong} ${styles.disabled}`;
    }
    return `${styles.option} ${styles.disabled}`;
  };

  return (
    <>
      <div className={styles.header}>
        <span className={styles.title}>{testTitle}</span>
        <span className={styles.timer}>{formatTime(timeLeft)}</span>
      </div>
      <div className={styles.testProgress}>
        <div className={styles.testProgressFill} style={{ width: `${progress}%` }} />
      </div>
      <div className={styles.wrap}>
        <div className={styles.qNum}>
          Вопрос {currentIndex + 1} из {total}
        </div>
        <div className={styles.qText}>{question.q}</div>
        <div className={styles.options}>
          {question.opts.map((opt, i) => (
            <div
              key={opt}
              className={getOptionClass(i)}
              onClick={() => !showFeedback && onSelect(i)}
              role="button"
              tabIndex={showFeedback ? -1 : 0}
            >
              <div className={styles.letter}>{LETTERS[i]}</div>
              {opt}
            </div>
          ))}
        </div>
        {showFeedback && (
          <div className={styles.actions}>
            <Button primary onClick={onNext}>
              {currentIndex + 1 >= total ? 'Завершить' : 'Далее →'}
            </Button>
          </div>
        )}
      </div>
    </>
  );
}
