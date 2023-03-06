import { lazy, Suspense } from "react";

// 路由表
export const routes = [
  {
    name: "menu.dashboard",
    key: "dashboard",
  },
  {
    name: "Example",
    key: "example",
  },
];

export function getFlattenRoutes(routes) {
  const res = [];
  function travel(_routes) {
    _routes.forEach((route) => {
      if (route.key && !route.children) {
        const Component = lazy(() => import(`./pages/${route.key}.jsx`))
        route.component = (
          <Suspense><Component/></Suspense>
        );
        res.push(route);
      } else if (Array.isArray(route.children) && route.children.length) {
        travel(route.children);
      }
    });
  }
  travel(routes);
  return res;
}
