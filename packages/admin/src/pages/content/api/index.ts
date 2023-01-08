import { PaginationProps } from '@arco-design/web-react';
import http from '@/api/http';
import { OpResult, Result } from '@/api/types';

const url = '/api/article';

export interface Article {
  _id: string;
  title: string;
  content: string;
}

// 编辑项初始值
export const initial = {
  _id: '',
  title: '',
  content: ''
};

export async function getArticleList({ current, pageSize }: PaginationProps) {
  const { data, meta } = await http.get<Result<Article>>(url, {
    params: {
      page: current,
      pageSize,
    },
  });
  return { list: data, total: meta.total };
}

export async function getArticle(id: string) {
  return http.get<OpResult<Article>>(`${url}/${id}`);
}

export function deleteArticle(id: string) {
  return http.delete(`${url}/${id}`);
}

export function updateArticle(article: Article) {
  return http.patch(`${url}/${article._id}`, article);
}

export function addArticle(article: Article) {
  delete article._id;
  return http.post<OpResult<Article>>(url, article);
}

