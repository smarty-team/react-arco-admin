import { OpResult, Result } from '@/api/types';
import { PaginationProps } from '@arco-design/web-react';
import http from '@/api/http';

const url = '/api/role';

export interface Role {
  _id: string;
  name: string;
  permissions?: Record<string, string[]>;
}
// 编辑项初始值
export const initial = {
  _id: '',
  name: '',
  permissions: {},
};

export async function getAllRoles() {
  const { data } = await http.get<Result<Role>>(url);
  return data;
}

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
  return http.patch(`/api/Role/${role._id}`, role);
}

export function addRole(role: Role) {
  delete role._id;
  return http.post<OpResult<Role>>(url, role);
}
