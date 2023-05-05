import Mock from 'mockjs';
import setupMock from './setupMock';

setupMock({
  
  setup: () => {
    // 模拟获取用户信息
    Mock.mock(new RegExp('/api/user/userInfo'), () => {
      console.log('request userInfo');
      return Mock.mock({
        name: '村长',
        avatar:
          'https://lf1-xgcdn-tos.pstatp.com/obj/vcloud/vadmin/start.8e0e4855ee346a46ccff8ff3e24db27b.png',
        job: '前端讲师',
        organization: '羊村',
        location: '北京',
        introduction: '本人是羊村村长',
        personalWebsite: 'https://www.arco.design',
        phoneNumber: /150[*]{6}[0-9]{2}/,
        accountId: /[a-z]{4}[-][0-9]{8}/,
        registrationTime: Mock.Random.datetime('yyyy-MM-dd HH:mm:ss'),
      });
    });

    // 模拟登录
    Mock.mock(new RegExp('/api/user/login'), (params) => {
      const { userName, password } = JSON.parse(params.body);
      if (!userName) {
        return {
          status: 'error',
          msg: '用户名不能为空',
        };
      }
      if (!password) {
        return {
          status: 'error',
          msg: '密码不能为空',
        };
      }
      if (userName === 'admin' && password === 'admin') {
        return {
          status: 'ok',
        };
      }
      return {
        status: 'error',
        msg: '账号或者密码错误',
      };
    });
  },
});
