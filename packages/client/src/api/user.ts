import http from './http';

type Result<T> = {
  data: T,
  meta: Record<string, string>
}

export interface UserInfo {
  name: string;
  avatar?: string;
  email?: string;
  phoneNumber: string;
  role: string;
  job?: string;
  jobName?: string;
  organization?: string;
  location?: string;
  personalWebsite?: string;
  permissions: Record<string, string[]>;
}

export async function getUserInfo() {
  const res = await http.get<Result<UserInfo>>('/api/auth/info')
  return res.data
}
