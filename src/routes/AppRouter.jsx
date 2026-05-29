import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import AppLayout from '../components/layout/AppLayout';
import { RequireAuth, RequireStudent, RequireTeacher } from '../components/auth/RoleGuard';
import HomePage from '../pages/HomePage';
import CoursesPage from '../pages/CoursesPage';
import TestPage from '../pages/TestPage';
import RatingPage from '../pages/RatingPage';
import AnalyticsRouter from '../pages/AnalyticsRouter';
import ProfilePage from '../pages/ProfilePage';
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';
import TeacherDashboard from '../pages/teacher/TeacherDashboard';
import StudentsPage from '../pages/teacher/StudentsPage';
import TeacherTestsPage from '../pages/teacher/TeacherTestsPage';

function HomeRedirect() {
  return (
    <RequireAuth>
      <RequireStudent>
        <HomePage />
      </RequireStudent>
    </RequireAuth>
  );
}

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        <Route element={<AppLayout />}>
          <Route path="/" element={<HomeRedirect />} />

          <Route
            path="/courses"
            element={
              <RequireAuth>
                <RequireStudent>
                  <CoursesPage />
                </RequireStudent>
              </RequireAuth>
            }
          />
          <Route
            path="/test"
            element={
              <RequireAuth>
                <RequireStudent>
                  <TestPage />
                </RequireStudent>
              </RequireAuth>
            }
          />
          <Route
            path="/rating"
            element={
              <RequireAuth>
                <RequireStudent>
                  <RatingPage />
                </RequireStudent>
              </RequireAuth>
            }
          />
          <Route
            path="/analytics"
            element={
              <RequireAuth>
                <AnalyticsRouter />
              </RequireAuth>
            }
          />

          <Route
            path="/dashboard"
            element={
              <RequireAuth>
                <RequireTeacher>
                  <TeacherDashboard />
                </RequireTeacher>
              </RequireAuth>
            }
          />
          <Route
            path="/students"
            element={
              <RequireAuth>
                <RequireTeacher>
                  <StudentsPage />
                </RequireTeacher>
              </RequireAuth>
            }
          />
          <Route
            path="/tests-manage"
            element={
              <RequireAuth>
                <RequireTeacher>
                  <TeacherTestsPage />
                </RequireTeacher>
              </RequireAuth>
            }
          />
          <Route
            path="/profile"
            element={
              <RequireAuth>
                <ProfilePage />
              </RequireAuth>
            }
          />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
