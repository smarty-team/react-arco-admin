import { Result } from '@/api/types';
import { PaginationProps } from '@arco-design/web-react';
import http from '@/api/http';

const url = '/api/course';

export interface Course {
  _id: string;
  name: string;
}

// 编辑项初始值
export const initial = {
  _id: '',
  name: '',
};

export async function getCourseList({ current, pageSize }: PaginationProps) {
  const { data, meta } = await http.get<Result<Course>>(url, {
    params: {
      page: current,
      pageSize,
    },
  });
  return { list: data, total: meta.total };
}

export function deleteCourse(id: string) {
  return http.delete(`${url}/${id}`);
}

export function updateCourse(course: Course) {
  return http.patch(`/api/course/${course._id}`, course);
}

export function addCourse(course: Course) {
  delete course._id;
  return http.post(url, course);
}
