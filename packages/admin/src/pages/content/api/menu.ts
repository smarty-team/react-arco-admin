import http from '@/api/http';

const url = '/api/menus';

export interface MenuItem {
  key: string;
  title: string;
  type: 'category' | 'article';
  children: MenuItem[];
}

// 编辑项初始值
export const initial = {
  key: '',
  title: '',
  type: '',
  children: [],
};

export async function getMenu() {
  const {data} = await http.get(url) as any;
  return data.menus as MenuItem[];
}

export async function updateMenu(menus: MenuItem[]) {
  return  http.post(url, { menus });
}
