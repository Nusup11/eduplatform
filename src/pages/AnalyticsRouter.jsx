import { useAuth } from '../hooks/useAuth';
import AnalyticsPage from './AnalyticsPage';
import TeacherAnalyticsPage from './teacher/TeacherAnalyticsPage';

export default function AnalyticsRouter() {
  const { isTeacher } = useAuth();
  return isTeacher ? <TeacherAnalyticsPage /> : <AnalyticsPage />;
}
