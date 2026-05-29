import SectionTitle from '../components/ui/SectionTitle';
import CourseListItem from '../components/course/CourseListItem';
import { courses } from '../data/mockData';

export default function CoursesPage() {
  return (
    <>
      <SectionTitle>Все курсы</SectionTitle>
      <div>
        {courses.map((course) => (
          <CourseListItem key={course.id} course={course} />
        ))}
      </div>
    </>
  );
}
