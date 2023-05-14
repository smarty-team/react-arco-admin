import auth, { AuthParams } from '@/utils/authentication';
import { useEffect, useMemo, useState } from 'react';

export type IRoute = AuthParams & {
  name: string;
  key: string;
  // 当前页是否展示面包屑
  breadcrumb?: boolean;
  children?: IRoute[];
  // 当前路由是否渲染菜单项，为 true 的话不会在菜单中显示，但可通过路由地址访问。
  ignore?: boolean;
};

export const routes: IRoute[] = [
  {
    name: 'menu.dashboard', // locale包中的key
    key: 'dashboard', // 唯一区分菜单项，也是路由path，决定icon
    children: [
      {
        name: 'menu.dashboard.workplace',
        key: 'dashboard/workplace',
      },
    ],
    // breadcrumb: true,// 是否显示在面包屑中
    // ignore: true,// 是否渲染为菜单项
  },
  {
    name: 'Example',
    key: 'example',
  },
  {
    name: 'menu.user',
    key: 'user',
    requiredPermissions: [{ resource: 'user', actions: ['read', 'write'] }],
  },
  {
    name: 'menu.role',
    key: 'role',
    requiredPermissions: [{ resource: 'role', actions: ['read', 'write'] }],
  },
  {
    name: 'menu.content',
    key: 'content',
    requiredPermissions: [{ resource: 'content' }],
  },
];

export const getName = (path: string, routes) => {
  return routes.find((item) => {
    const itemPath = `/${item.key}`;
    if (path === itemPath) {
      return item.name;
    } else if (item.children) {
      return getName(path, item.children);
    }
  });
};

// export const generatePermission = (role: string) => {
//   // const actions = role === 'admin' ? ['*'] : ['read'];
//   const result = {};
//   routes.forEach((item) => {
//     if (item.children) {
//       item.children.forEach((child) => {
//         result[child.name] = actions;
//       });
//     }
//   });
//   return result;
// };

// 生成路由
const useRoute = (userPermission): [IRoute[], string] => {
  console.log(userPermission);
  
  const filterRoute = (routes: IRoute[], arr = []): IRoute[] => {
    if (!routes.length) {
      return [];
    }
    for (const route of routes) {
      const { requiredPermissions, oneOfPerm } = route;
      console.log('requiredPermissions', requiredPermissions);
      
      let visible = true;
      if (requiredPermissions) {
        visible = auth({ requiredPermissions, oneOfPerm }, userPermission);
      }

      if (!visible) {
        continue;
      }
      if (route.children && route.children.length) {
        const newRoute = { ...route, children: [] };
        filterRoute(route.children, newRoute.children);
        if (newRoute.children.length) {
          arr.push(newRoute);
        }
      } else {
        arr.push({ ...route });
      }
    }

    return arr;
  };

  const [permissionRoute, setPermissionRoute] = useState(routes);

  useEffect(() => {
    const newRoutes = filterRoute(routes);
    setPermissionRoute(newRoutes);
  }, [JSON.stringify(userPermission)]);

  const defaultRoute = useMemo(() => {
    const first = permissionRoute[0];
    if (first) {
      const firstRoute = first?.children?.[0]?.key || first.key;
      return firstRoute;
    }
    return '';
  }, [permissionRoute]);

  return [permissionRoute, defaultRoute];
};

export default useRoute;
