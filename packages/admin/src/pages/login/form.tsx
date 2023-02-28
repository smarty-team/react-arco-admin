import {
  Form,
  Input,
  Checkbox,
  Link,
  Button,
  Space,
} from '@arco-design/web-react';
import { FormInstance } from '@arco-design/web-react/es/Form';
import { IconLock, IconPhone } from '@arco-design/web-react/icon';
import React, { useEffect, useRef, useState } from 'react';
import useStorage from '@/utils/useStorage';
import useLocale from '@/utils/useLocale';
import locale from './locale';
import styles from './style/index.module.less';
import http from '@/api/http';
import { OpResult } from '@/api/types';

export default function LoginForm() {
  const formRef = useRef<FormInstance>();
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [loginParams, setLoginParams, removeLoginParams] =
    useStorage('loginParams');

  const t = useLocale(locale);

  const [rememberPassword, setRememberPassword] = useState(!!loginParams);

  function afterLoginSuccess(params, token) {
    // 记住密码
    if (rememberPassword) {
      setLoginParams(JSON.stringify(params));
    } else {
      removeLoginParams();
    }
    // 记录登录状态
    localStorage.setItem('userStatus', 'login');
    // 存储令牌
    localStorage.setItem('token', token);
    // 跳转首页
    window.location.href = '/';
  }

  function login(params) {
    setErrorMessage('');
    setLoading(true);
    http
      .post<OpResult<{ token: string }>>('/api/auth/login', params)
      .then((res) => {
        const { token } = res.data;
        if (token) {
          afterLoginSuccess(params, token);
        } else {
          setErrorMessage(t['login.form.login.errMsg']);
        }
      })
      .finally(() => {
        setLoading(false);
      });
  }

  function onSubmitClick() {
    formRef.current.validate().then((values) => {
      login(values);
    });
  }

  // 读取 localStorage，设置初始值
  useEffect(() => {
    const rememberPassword = !!loginParams;
    setRememberPassword(rememberPassword);
    if (formRef.current && rememberPassword) {
      const parseParams = JSON.parse(loginParams);
      formRef.current.setFieldsValue(parseParams);
    }
  }, [loginParams]);

  return (
    <div className={styles['login-form-wrapper']}>
      <div className={styles['login-form-title']}>{t['login.form.title']}</div>
      {/* <div className={styles['login-form-sub-title']}>
        {t['login.form.title']}
      </div> */}
      <div className={styles['login-form-error-msg']}>{errorMessage}</div>
      <Form
        className={styles['login-form']}
        layout="vertical"
        ref={formRef}
        initialValues={{ phoneNumber: '18888888888', password: '888888' }}
      >
        <Form.Item
          field="phoneNumber"
          rules={[{ required: true, message: t['login.form.userName.errMsg'] }]}
        >
          <Input
            prefix={<IconPhone />}
            placeholder={t['login.form.userName.placeholder']}
            onPressEnter={onSubmitClick}
          />
        </Form.Item>
        <Form.Item
          field="password"
          rules={[{ required: true, message: t['login.form.password.errMsg'] }]}
        >
          <Input.Password
            prefix={<IconLock />}
            placeholder={t['login.form.password.placeholder']}
            onPressEnter={onSubmitClick}
          />
        </Form.Item>
        <Space size={16} direction="vertical">
          <div className={styles['login-form-password-actions']}>
            <Checkbox checked={rememberPassword} onChange={setRememberPassword}>
              {t['login.form.rememberPassword']}
            </Checkbox>
            <Link>{t['login.form.forgetPassword']}</Link>
          </div>
          <Button type="primary" long onClick={onSubmitClick} loading={loading}>
            {t['login.form.login']}
          </Button>
          <Button
            type="text"
            long
            className={styles['login-form-register-btn']}
          >
            {t['login.form.register']}
          </Button>
        </Space>
      </Form>
    </div>
  );
}
