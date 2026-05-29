import { useApp } from '../context/AppContext';
import { isTeacher } from '../utils/userProfile';

export function useAuth() {
  const {
    state,
    login,
    register,
    logout: contextLogout,
    authError,
    registerSuccess,
    clearAuthError,
    clearRegisterSuccess,
    refreshUser,
  } = useApp();

  const logout = () => {
    contextLogout();
    window.location.href = '/login';
  };

  return {
    user: state.user,
    isAuthenticated: state.isAuthenticated,
    isTeacher: isTeacher(state.user),
    isAuthLoading: state.isAuthLoading,
    authError,
    login,
    register,
    logout,
    clearAuthError,
    refreshUser,
  };
}
