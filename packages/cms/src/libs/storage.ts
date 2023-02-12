// 解决 nextJS 无法获取初始localstorage问题
import { useEffect, useState } from 'react';

const isSSR = (function () {
  try {
    return !(typeof window !== 'undefined' && document !== undefined);
  } catch (e) {
    return true;
  }
})();

const getDefaultStorage = (key) => {
  if (!isSSR) {
    return localStorage.getItem(key);
  } else {
    return undefined;
  }
};

export function useStorage(
  key: string,
  defaultValue?: unknown
) {
  const [storedValue, setStoredValue] = useState(
    getDefaultStorage(key) || defaultValue
  );

  const setStorageValue = (value: string) => {
    if (!isSSR) {
      localStorage.setItem(key, value);
      if (value !== storedValue) {
        setStoredValue(value);
      }
    }
  };

  const removeStorage = () => {
    if (!isSSR) {
      localStorage.removeItem(key);
    }
  };

  useEffect(() => {
    const storageValue = localStorage.getItem(key);
    if (storageValue) {
      setStoredValue(storageValue);
    }
  }, [key]);

  return [storedValue, setStorageValue, removeStorage];
}

export default useStorage;
