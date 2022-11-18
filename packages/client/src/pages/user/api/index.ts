import { Result } from '@/api/types';
import { PaginationProps } from '@arco-design/web-react';
import http from '@/api/http';

const url = '/api/user';

export interface User {
  id: string;
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
  return http.patch(`/api/User/${user.id}`, user);
}

export function addUser(User: User) {
  return http.post(url, User);
}
