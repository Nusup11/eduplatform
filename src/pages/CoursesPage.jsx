import { useMemo } from 'react';
import { useApp } from '../context/AppContext';
import SectionTitle from '../components/ui/SectionTitle';
import Tabs from '../components/ui/Tabs';
import CourseListItem from '../components/course/CourseListItem';
import { courses } from '../data/mockData';

const tabItems = [
  { id: 'all', label: 'Все' },
  { id: 'active', label: 'Активные' },
  { id: 'done', label: 'Завершённые' },
];

export default function CoursesPage() {
  const { state, setCourseFilter } = useApp();

  const filtered = useMemo(
    () =>
      courses.filter(
        (c) => state.courseFilter === 'all' || c.status === state.courseFilter,
      ),
    [state.courseFilter],
  );

  return (
    <>
      <SectionTitle>Все курсы</SectionTitle>
      <Tabs
        items={tabItems}
        active={state.courseFilter}
        onChange={setCourseFilter}
      />
      <div>
        {filtered.map((course) => (
          <CourseListItem key={course.id} course={course} />
        ))}
      </div>
    </>
  );
}
