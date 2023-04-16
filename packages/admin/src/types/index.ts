export interface Result<T> {
  data: T[];
  meta: {
    total: number;
  };
}

export interface OpResult<T> {
  data: T;
}
