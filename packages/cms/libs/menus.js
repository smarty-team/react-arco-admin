import useSWR from "swr";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

export function useMenus() {
  const { error, data } = useSWR("/api/menus", fetcher);
  return {
    menus: data,
    isLoading: !error && !data,
    isError: error,
  };
}

export function getMenuIDs() {
  return new Promise((resolve) => {
    resolve([
      {
        params: {
          id: "2",
        },
      },
      {
        params: {
          id: "3",
        },
      },
      {
        params: {
          id: "5",
        },
      },
      {
        params: {
          id: "6",
        },
      },
    ]);
  });
}

export function flatMenus(menus, result = []) {
  for (const menu of menus) {
    if (!menu.children) {
      result.push({ id: menu.id, title: menu.title });
    } else {
      result.push({ title: menu.title });
      flatMenus(menu.children, result);
    }
  }
  return result;
}