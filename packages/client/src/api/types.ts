export interface Result<T> {
  data: T[];
  meta: {
    total: number;
  };
}
