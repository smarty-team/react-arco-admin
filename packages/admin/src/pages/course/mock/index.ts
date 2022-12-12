import Mock from 'mockjs';
import qs from 'query-string';
import setupMock from '@/utils/setupMock';

const { list } = Mock.mock({
  'list|100': [
    {
      id: /[0-9]{8}[-][0-9]{4}/,
      name: () =>
        Mock.Random.pick([
          'vue源码',
          'react源码',
          '前端工程化',
          '组件库开发',
          '算法实战',
          'nodejs'
        ])
    },
  ],
});

setupMock({
  mock: false,
  setup: () => {
    Mock.mock(new RegExp('/api/course'), (params) => {
      const {
        page = 1,
        pageSize = 10
      } = qs.parseUrl(params.url).query;
      const p = page as number;
      const ps = pageSize as number;

      return {
        list: list.slice((p - 1) * ps, p * ps),
        total: list.length,
      };
    });
  },
});
