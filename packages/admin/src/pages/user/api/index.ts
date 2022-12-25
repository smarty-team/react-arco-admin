import { Result } from '@/api/types';
import { PaginationProps } from '@arco-design/web-react';
import http from '@/api/http';

const url = '/api/user';

export interface User {
  _id: string;
  name: string;
  avatar?: string;
  email?: string;
  phoneNumber?: string;
  job?: string;
  jobName?: string;
  organization?: string;
  location?: string;
  personalWebsite?: string;
}

// 编辑项初始值
export const initial = {
  _id: '',
  name: '',
  avatar: '',
  email: '',
  phoneNumber: '',
  job: '',
  jobName: '',
  organization: '',
  location: '',
  personalWebsite: '',
};

export async function getUserList({ current, pageSize }: PaginationProps) {
  const { data, meta } = await http.get<Result<User>>(url, {
    params: {
      page: current,
      pageSize,
    },
  });
  return { list: data, total: meta.total };
}

export function deleteUser(id: string) {
  return http.delete(`${url}/${id}`);
}

export function updateUser(user: User) {
  return http.patch(`/api/User/${user._id}`, user);
}

export function addUser(user: User) {
  delete user._id
  return http.post<User>(url, user);
}
