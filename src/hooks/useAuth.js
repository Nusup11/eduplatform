import { useApp } from '../context/AppContext';

export function useAuth() {
  const { state, login, register, logout, authError, clearAuthError } = useApp();
  return {
    user: state.user,
    token: state.token,
    isAuthenticated: state.isAuthenticated,
    isAuthLoading: state.isAuthLoading,
    authError,
    login,
    register,
    logout,
    clearAuthError,
  };
}
