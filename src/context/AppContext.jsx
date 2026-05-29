import {
  createContext,
  useContext,
  useReducer,
  useCallback,
  useEffect,
} from 'react';
import { currentUser as demoUser } from '../data/mockData';
import { mapApiUser, guestUser } from '../utils/userProfile';
import api from '../services/api';

const AppContext = createContext(null);

const storedToken = localStorage.getItem('token');

const initialState = {
  user: storedToken ? guestUser : demoUser,
  token: storedToken,
  isAuthenticated: false,
  isAuthLoading: !!storedToken,
  authError: null,
  courseFilter: 'all',
  testSession: null,
  lastTestResult: null,
  userPoints: storedToken ? 0 : demoUser.points,
  testsCompleted: storedToken ? 0 : demoUser.testsCompleted,
};

function appReducer(state, action) {
  switch (action.type) {
    case 'SET_AUTH_LOADING':
      return { ...state, isAuthLoading: action.payload };
    case 'SET_AUTH_ERROR':
      return { ...state, authError: action.payload, isAuthLoading: false };
    case 'LOGIN_SUCCESS': {
      const user = action.payload.user;
      return {
        ...state,
        user,
        token: action.payload.token,
        isAuthenticated: true,
        isAuthLoading: false,
        authError: null,
        userPoints: user.points,
      };
    }
    case 'LOGOUT':
      return {
        ...state,
        user: guestUser,
        token: null,
        isAuthenticated: false,
        isAuthLoading: false,
        authError: null,
        userPoints: 0,
        testsCompleted: 0,
      };
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
        lastTestResult: action.payload,
        userPoints: state.userPoints + action.payload.pointsEarned,
        testsCompleted: state.testsCompleted + 1,
      };
    case 'RESET_TEST':
      return { ...state, testSession: null, lastTestResult: null };
    case 'SET_USER':
      return { ...state, user: { ...state.user, ...action.payload } };
    default:
      return state;
  }
}

function persistAuth(token, user) {
  localStorage.setItem('token', token);
  localStorage.setItem('user', JSON.stringify(user));
}

function clearPersistedAuth() {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
}

export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  const setCourseFilter = useCallback((filter) => {
    dispatch({ type: 'SET_COURSE_FILTER', payload: filter });
  }, []);

  const clearAuthError = useCallback(() => {
    dispatch({ type: 'SET_AUTH_ERROR', payload: null });
  }, []);

  const applyAuth = useCallback((data) => {
    const user = mapApiUser(data.user);
    persistAuth(data.token, data.user);
    dispatch({ type: 'LOGIN_SUCCESS', payload: { user, token: data.token } });
    return user;
  }, []);

  const login = useCallback(
    async ({ email, password }) => {
      dispatch({ type: 'SET_AUTH_ERROR', payload: null });
      dispatch({ type: 'SET_AUTH_LOADING', payload: true });
      try {
        const data = await api.auth.login({ email, password });
        return applyAuth(data);
      } catch (err) {
        dispatch({
          type: 'SET_AUTH_ERROR',
          payload: err.message || 'Ошибка входа',
        });
        throw err;
      } finally {
        dispatch({ type: 'SET_AUTH_LOADING', payload: false });
      }
    },
    [applyAuth],
  );

  const register = useCallback(
    async ({ name, email, password }) => {
      dispatch({ type: 'SET_AUTH_ERROR', payload: null });
      dispatch({ type: 'SET_AUTH_LOADING', payload: true });
      try {
        const data = await api.auth.register({ name, email, password });
        return applyAuth(data);
      } catch (err) {
        dispatch({
          type: 'SET_AUTH_ERROR',
          payload: err.message || 'Ошибка регистрации',
        });
        throw err;
      } finally {
        dispatch({ type: 'SET_AUTH_LOADING', payload: false });
      }
    },
    [applyAuth],
  );

  const logout = useCallback(() => {
    clearPersistedAuth();
    dispatch({ type: 'LOGOUT' });
  }, []);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) return;

    let cancelled = false;
    (async () => {
      try {
        const apiUser = await api.auth.me();
        if (cancelled) return;
        const user = mapApiUser(apiUser);
        dispatch({
          type: 'LOGIN_SUCCESS',
          payload: { user, token },
        });
      } catch {
        if (!cancelled) {
          clearPersistedAuth();
          dispatch({ type: 'LOGOUT' });
        }
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  const value = {
    state,
    dispatch,
    setCourseFilter,
    login,
    register,
    logout,
    authError: state.authError,
    clearAuthError,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}
