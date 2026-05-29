import {
  createContext,
  useContext,
  useReducer,
  useCallback,
  useEffect,
} from 'react';
import { mapStoredUser, guestUser } from '../utils/userProfile';
import {
  getSession,
  setSession,
  clearSession,
  loginUser,
  registerUser,
  recordTestResult,
  seedUsers,
} from '../services/userStorage';

const AppContext = createContext(null);

const session = getSession();

const initialState = {
  user: session ? mapStoredUser(session) : guestUser,
  isAuthenticated: !!session,
  isAuthLoading: false,
  authError: null,
  registerSuccess: false,
  courseFilter: 'all',
  testSession: null,
  lastTestResult: null,
  teacherTests: [
    { id: 0, title: 'Нейронные сети: сеть Кохонена', subject: 'Нейросети', color: 'bdg-b' },
    { id: 1, title: 'Операционные системы: Bash', subject: 'ОС', color: 'bdg-t' },
    { id: 2, title: 'Теория принятия решений: linprog', subject: 'ТПР', color: 'bdg-p' },
  ],
};

function appReducer(state, action) {
  switch (action.type) {
    case 'SET_AUTH_ERROR':
      return { ...state, authError: action.payload };
    case 'SET_REGISTER_SUCCESS':
      return { ...state, registerSuccess: action.payload };
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
        authError: null,
        registerSuccess: false,
      };
    case 'LOGOUT':
      return {
        ...initialState,
        user: guestUser,
        isAuthenticated: false,
        teacherTests: state.teacherTests,
      };
    case 'UPDATE_USER':
      return { ...state, user: { ...state.user, ...action.payload } };
    case 'SET_COURSE_FILTER':
      return { ...state, courseFilter: action.payload };
    case 'START_TEST':
      return {
        ...state,
        testSession: {
          testId: action.payload.testId,
          currentQuestion: 0,
          answers: [],
          timeLeft: action.payload.timeLeft,
          selectedIndex: null,
          showFeedback: false,
        },
        lastTestResult: null,
      };
    case 'SELECT_ANSWER':
      return {
        ...state,
        testSession: {
          ...state.testSession,
          selectedIndex: action.payload,
          showFeedback: true,
        },
      };
    case 'RECORD_ANSWER':
      return {
        ...state,
        testSession: {
          ...state.testSession,
          answers: [...state.testSession.answers, action.payload],
        },
      };
    case 'NEXT_QUESTION':
      return {
        ...state,
        testSession: {
          ...state.testSession,
          currentQuestion: state.testSession.currentQuestion + 1,
          selectedIndex: null,
          showFeedback: false,
        },
      };
    case 'TICK_TIMER':
      return {
        ...state,
        testSession: {
          ...state.testSession,
          timeLeft: Math.max(0, state.testSession.timeLeft - 1),
        },
      };
    case 'FINISH_TEST':
      return {
        ...state,
        testSession: null,
        lastTestResult: action.payload.result,
        user: action.payload.user
          ? mapStoredUser(action.payload.user)
          : state.user,
      };
    case 'RESET_TEST':
      return { ...state, testSession: null, lastTestResult: null };
    case 'ADD_TEACHER_TEST':
      return {
        ...state,
        teacherTests: [
          ...state.teacherTests,
          {
            id: Date.now(),
            title: action.payload.title,
            subject: action.payload.subject,
            color: 'bdg-b',
          },
        ],
      };
    default:
      return state;
  }
}

export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  useEffect(() => {
    seedUsers();
  }, []);

  const setCourseFilter = useCallback((filter) => {
    dispatch({ type: 'SET_COURSE_FILTER', payload: filter });
  }, []);

  const login = useCallback((email, password, role) => {
    dispatch({ type: 'SET_AUTH_ERROR', payload: null });
    const res = loginUser(email, password, role);
    if (res.error) {
      dispatch({ type: 'SET_AUTH_ERROR', payload: res.error });
      throw new Error(res.error);
    }
    const user = mapStoredUser(res.user);
    dispatch({ type: 'LOGIN_SUCCESS', payload: user });
    return user;
  }, []);

  const register = useCallback((data) => {
    dispatch({ type: 'SET_AUTH_ERROR', payload: null });
    const res = registerUser(data);
    if (res.error) {
      dispatch({ type: 'SET_AUTH_ERROR', payload: res.error });
      throw new Error(res.error);
    }
    dispatch({ type: 'SET_REGISTER_SUCCESS', payload: true });
    return res.user;
  }, []);

  const logout = useCallback(() => {
    clearSession();
    dispatch({ type: 'LOGOUT' });
  }, []);

  const applyTestResult = useCallback((email, percent, meta) => {
    const updated = recordTestResult(email, percent);
    dispatch({
      type: 'FINISH_TEST',
      payload: { result: meta, user: updated?.user },
    });
    return updated;
  }, []);

  const refreshUser = useCallback(() => {
    const s = getSession();
    if (s) dispatch({ type: 'LOGIN_SUCCESS', payload: mapStoredUser(s) });
  }, []);

  const value = {
    state,
    dispatch,
    setCourseFilter,
    login,
    register,
    logout,
    applyTestResult,
    refreshUser,
    authError: state.authError,
    registerSuccess: state.registerSuccess,
    clearRegisterSuccess: () =>
      dispatch({ type: 'SET_REGISTER_SUCCESS', payload: false }),
    clearAuthError: () => dispatch({ type: 'SET_AUTH_ERROR', payload: null }),
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}
