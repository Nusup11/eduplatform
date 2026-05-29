import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import SectionTitle from '../components/ui/SectionTitle';
import TestSelectList from '../components/test/TestSelectList';
import QuestionView from '../components/test/QuestionView';
import TestResult from '../components/test/TestResult';
import { useTestSession } from '../hooks/useTestSession';

export default function TestPage() {
  const location = useLocation();
  const {
    session,
    test,
    lastResult,
    startTest,
    selectAnswer,
    nextQuestion,
    retryTest,
    resetToSelect,
    goToRating,
  } = useTestSession();

  useEffect(() => {
    if (location.pathname === '/test' && !session && !lastResult) {
      resetToSelect();
    }
  }, [location.pathname, session, lastResult, resetToSelect]);

  if (lastResult) {
    return (
      <TestResult
        result={lastResult}
        onRetry={retryTest}
        onRating={goToRating}
      />
    );
  }

  if (session && test) {
    const q = test.questions[session.currentQuestion];
    return (
      <QuestionView
        testTitle={test.title}
        timeLeft={session.timeLeft}
        currentIndex={session.currentQuestion}
        total={test.questions.length}
        question={q}
        selectedIndex={session.selectedIndex}
        showFeedback={session.showFeedback}
        onSelect={selectAnswer}
        onNext={nextQuestion}
      />
    );
  }

  return (
    <>
      <SectionTitle>Выберите тест</SectionTitle>
      <TestSelectList onSelect={startTest} />
    </>
  );
}
