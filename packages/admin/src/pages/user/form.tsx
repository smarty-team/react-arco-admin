import React, { useMemo } from 'react';
import { useState } from 'react';
import { Drawer, Form, Input, Message, Select } from '@arco-design/web-react';
import { User } from '.';
import { useRequest } from 'ahooks';
import { getAllRoles } from '../role/api';

type FormProps = {
  visible: boolean;
  setVisible: (b: boolean) => void;
  editedItem: User;
  callback: (editedItem?: Partial<User>) => void;
};

const name = '用户信息';

const addTableData = async (data: Partial<User>) => {
  const newItem = await fetch(`/api/user`, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  }).then((res) => res.json());
  return { ok: newItem && newItem._id, data: newItem };
};

const updateTableData = async (id: string, data: Partial<User>) => {
  const { data: result } = await fetch(`/api/user/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(data),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  }).then((res) => res.json());
  return { ok: result && result.affected === 1 };
};

function UserForm({ visible, setVisible, editedItem, callback }: FormProps) {
  const [form] = Form.useForm();

  const title = useMemo(
    () => (editedItem._id ? '更新' : '新增') + name,
    [editedItem._id]
  );

  // 获取可用角色
  const { data: roles, run } = useRequest(getAllRoles, {
    manual: true,
  });

  const rolesOptions = useMemo(() => {
    if (roles) {
      return roles.map((role) => ({
        label: role.name,
        value: role._id,
      }));
    }
    return [];
  }, [roles]);

  const onSubmit = () => {
    form.validate(async (errors) => {
      const operation = editedItem._id ? '编辑' : '新增';
      if (!errors) {
        // 根据标识符决定新增或更新
        if (editedItem._id) {
          const values = form.getFieldsValue();
          const { ok } = await updateTableData(editedItem._id, values);
          if (ok) {
            callback && callback(form.getFieldsValue());
            Message.success(operation + '用户成功!');
            setVisible(false);
          } else {
            Message.error(operation + '用户失败，请重试!');
          }
        } else {
          // 设置一个默认密码
          const editedItem = form.getFieldsValue();
          editedItem.password = '123456'
          const { ok, data } = await addTableData(editedItem);
          if (ok) {
            callback && callback(data);
            Message.success(operation + '用户成功!');
            setVisible(false);
          } else {
            Message.error(operation + '用户失败，请重试!');
          }
        }
      }
    });
  };

  return (
    <Drawer
      width={400}
      title={title}
      visible={visible}
      onOk={onSubmit}
      onCancel={() => {
        setVisible(false);
      }}
      afterOpen={() => {
        form.setFieldsValue(editedItem);
        // 获取用户可用角色
        if (!roles) {
          run();
        }
      }}
      afterClose={() => {
        form.resetFields();
      }}
    >
      <Form form={form}>
        <Form.Item
          label="手机号"
          field="phoneNumber"
          rules={[
            { required: true, message: '手机号是必填项' },
            { match: /^1[3456789]\d{9}$/, message: '请输入正确的手机号' },
          ]}
        >
          <Input placeholder="请输入手机号" />
        </Form.Item>
        <Form.Item
          label="用户名称"
          field="name"
          rules={[{ required: true, message: '用户名是必填项' }]}
        >
          <Input placeholder="请输入用户名" />
        </Form.Item>
        <Form.Item label="用户角色" field="role" rules={[{ required: true }]}>
          <Select placeholder="请选择一个用户角色" options={rolesOptions} />
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
