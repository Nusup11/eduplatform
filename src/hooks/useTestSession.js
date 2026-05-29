import { useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { tests } from '../data/mockData';

export function useTestSession() {
  const { state, dispatch } = useApp();
  const navigate = useNavigate();
  const session = state.testSession;
  const test = session ? tests.find((t) => t.id === session.testId) : null;

  const startTest = useCallback(
    (testId) => {
      const t = tests.find((x) => x.id === testId);
      if (!t) return;
      dispatch({
        type: 'START_TEST',
        payload: { testId, timeLeft: t.questions.length * 120 },
      });
    },
    [dispatch],
  );

  const selectAnswer = useCallback(
    (index) => {
      if (!session || session.showFeedback) return;
      dispatch({ type: 'SELECT_ANSWER', payload: index });
      const q = test.questions[session.currentQuestion];
      const correct = index === q.ans;
      dispatch({ type: 'RECORD_ANSWER', payload: correct ? 1 : 0 });
    },
    [dispatch, session, test],
  );

  const nextQuestion = useCallback(() => {
    if (!session || !test) return;
    if (session.currentQuestion + 1 >= test.questions.length) {
      finishTest();
    } else {
      dispatch({ type: 'NEXT_QUESTION' });
    }
  }, [session, test, dispatch]);

  const finishTest = useCallback(() => {
    if (!session || !test) return;
    const correct = session.answers.reduce((a, b) => a + b, 0);
    const pct = Math.round((correct / test.questions.length) * 100);
    let title;
    let sub;
    let pointsEarned = 0;
    if (pct >= 90) {
      title = 'Отлично! 🏆';
      sub = `Правильно ${correct} из ${test.questions.length} вопросов. Вы получаете +120 EduPoints!`;
      pointsEarned = 120;
    } else if (pct >= 70) {
      title = 'Хороший результат 👍';
      sub = `Правильно ${correct} из ${test.questions.length} вопросов. +80 EduPoints`;
      pointsEarned = 80;
    } else if (pct >= 50) {
      title = 'Неплохо, но можно лучше 📚';
      sub = `Правильно ${correct} из ${test.questions.length} вопросов. +40 EduPoints`;
      pointsEarned = 40;
    } else {
      title = 'Нужно повторить материал 🔁';
      sub = `Правильно ${correct} из ${test.questions.length} вопросов. Попробуйте ещё раз!`;
    }
    dispatch({
      type: 'FINISH_TEST',
      payload: {
        testId: test.id,
        percent: pct,
        correct,
        total: test.questions.length,
        title,
        sub,
        pointsEarned,
      },
    });
  }, [session, test, dispatch]);

  const retryTest = useCallback(() => {
    if (state.lastTestResult) {
      dispatch({ type: 'RESET_TEST' });
      startTest(state.lastTestResult.testId);
    }
  }, [state.lastTestResult, dispatch, startTest]);

  const resetToSelect = useCallback(() => {
    dispatch({ type: 'RESET_TEST' });
  }, [dispatch]);

  useEffect(() => {
    if (!session || session.timeLeft <= 0) return;
    const id = setInterval(() => dispatch({ type: 'TICK_TIMER' }), 1000);
    return () => clearInterval(id);
  }, [session, dispatch]);

  useEffect(() => {
    if (session?.timeLeft === 0 && session.answers.length > 0) {
      finishTest();
    }
  }, [session?.timeLeft, session?.answers.length, finishTest]);

  const goToRating = () => navigate('/rating');

  return {
    session,
    test,
    lastResult: state.lastTestResult,
    startTest,
    selectAnswer,
    nextQuestion,
    finishTest,
    retryTest,
    resetToSelect,
    goToRating,
  };
}
