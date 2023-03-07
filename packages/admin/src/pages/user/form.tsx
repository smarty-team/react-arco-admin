import React from 'react';
import { useState } from 'react';
import { Drawer, Form, Input } from '@arco-design/web-react';

type FormProps = {
  visible: boolean;
  setVisible: (b: boolean) => void;
};

function UserForm({ visible, setVisible }: FormProps) {
  return (
    <Drawer
      width={400}
      title={<span>Basic Information </span>}
      visible={visible}
      onOk={() => {
        setVisible(false);
      }}
      onCancel={() => {
        setVisible(false);
      }}
    >
      <Form>
        <Form.Item label="手机号" field="phoneNumber">
          <Input placeholder="请输入手机号" />
        </Form.Item>
        <Form.Item label="用户名称" field="name">
          <Input placeholder="请输入用户名" />
        </Form.Item>
        <Form.Item label="邮箱" field="email">
          <Input placeholder="请输入邮箱" />
        </Form.Item>
        <Form.Item label="组织" field="organization">
          <Input placeholder="请输入组织名称" />
        </Form.Item>
        <Form.Item label="职位" field="job">
          <Input placeholder="请输入职位" />
        </Form.Item>
        <Form.Item label="个人站点" field="personalWebsite">
          <Input placeholder="请输入个人站点URL" />
        </Form.Item>
      </Form>
    </Drawer>
  );
}

export default UserForm;
