import { Result } from '@/api/types';
import { PaginationProps } from '@arco-design/web-react';
import http from '@/api/http';

const url = '/api/Role';

export interface Role {
  id: string;
  name: string;
  permissions?: Record<string, string[]>;
}
// 编辑项初始值
export const initial = {
  id: '',
  name: '',
  permissions: {}
};

export async function getRoleList({ current, pageSize }: PaginationProps) {
  const { data, meta } = await http.get<Result<Role>>(url, {
    params: {
      page: current,
      pageSize,
    },
  });
  return { list: data, total: meta.total };
}

export function deleteRole(id: string) {
  return http.delete(`${url}/${id}`);
}

export function updateRole(role: Role) {
  return http.patch(`/api/Role/${role.id}`, role);
}

export function addRole(role: Role) {
  return http.post(url, role);
}
