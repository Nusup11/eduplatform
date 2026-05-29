import { isMongo } from '../lib/dbState.js';
import { memory } from '../lib/memory.js';
import Course from '../models/Course.js';

export async function findCourses(filter = {}) {
  if (isMongo()) {
    const q = {};
    if (filter.category) q.category = filter.category;
    if (filter.search) {
      q.$or = [
        { title: new RegExp(filter.search, 'i') },
        { description: new RegExp(filter.search, 'i') },
      ];
    }
    return Course.find(q).lean();
  }
  return memory.courses.filter((c) => {
    if (filter.category && c.category !== filter.category) return false;
    if (filter.search) {
      const s = filter.search.toLowerCase();
      return (
        c.title.toLowerCase().includes(s) ||
        c.description.toLowerCase().includes(s)
      );
    }
    return true;
  });
}

export async function findCourseById(id) {
  if (isMongo()) return Course.findById(id).lean();
  return memory.courses.find((c) => c._id === id) ?? null;
}

export async function createCourse(data) {
  if (isMongo()) {
    const { _id, ...rest } = data;
    return Course.create(rest);
  }
  const course = { _id: data._id, ...data };
  memory.courses.push(course);
  return course;
}

export async function updateCourse(id, data) {
  if (isMongo()) return Course.findByIdAndUpdate(id, data, { new: true }).lean();
  const idx = memory.courses.findIndex((c) => c._id === id);
  if (idx === -1) return null;
  memory.courses[idx] = { ...memory.courses[idx], ...data };
  return memory.courses[idx];
}

export async function deleteCourse(id) {
  if (isMongo()) return Course.findByIdAndDelete(id);
  const idx = memory.courses.findIndex((c) => c._id === id);
  if (idx === -1) return null;
  memory.courses.splice(idx, 1);
  memory.quizzes = memory.quizzes.filter((q) => q.courseId !== id);
  return true;
}
