import Mock from 'mockjs';
import { isSSR } from '@/utils/is';

import './user';
import './message-box';
import './my-mock'

if (!isSSR) {
  Mock.setup({
    timeout: '500-1500',
  });
}
