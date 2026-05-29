import { Navigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { getHomePath } from '../../config/navigation';

export function RequireAuth({ children }) {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  return children;
}

export function RequireStudent({ children }) {
  const { isAuthenticated, isTeacher, user } = useAuth();
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  if (isTeacher) return <Navigate to={getHomePath(user.role)} replace />;
  return children;
}

export function RequireTeacher({ children }) {
  const { isAuthenticated, isTeacher, user } = useAuth();
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  if (!isTeacher) return <Navigate to={getHomePath(user.role)} replace />;
  return children;
}
