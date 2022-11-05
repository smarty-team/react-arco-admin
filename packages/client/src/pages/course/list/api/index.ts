import { PaginationProps } from '@arco-design/web-react';
import axios from 'axios';

export interface Result<T> {
  data: T[];
  meta: {
    total: number;
  };
}

export interface Course {
  id: string;
  name: string;
}

export async function getCourseList({ current, pageSize }: PaginationProps) {
  const res = await axios.get<Result<Course>>('/api/course', {
    params: {
      page: current,
      pageSize,
    },
  });
  return { list: res.data.data, total: res.data.meta.total };
}

export function deleteCourse(id: string) {
  return axios.delete('/api/course/' + id);
}

export function updateCourse(course: Course) {
  return axios.patch('/api/course/' + course.id, course);
}

export function addCourse(course: Course) {
  return axios.post('/api/course', course);
}
