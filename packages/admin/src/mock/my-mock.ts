import Mock from 'mockjs';
import setupMock from '@/utils/setupMock';

setupMock({
  mock: false,
  setup() {
    Mock.mock(new RegExp('/api/role/list'), () => {
      return [
        {},
        {},
        {},
      ]
    })
  }
})