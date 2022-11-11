/**
 * 获取分页信息
 * @param total 
 * @param pageSize 
 * @param page 
 * @returns 
 */
export const getPagination = (
  total: number, 
  pageSize: number, 
  page: number
) => {
  const pages = Math.ceil(total / pageSize)
  return {
    total: Number(total),
    page: Number(page),
    pageSize: Number(pageSize),
    pages: Number(pages),
  }
}