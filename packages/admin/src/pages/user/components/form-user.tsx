import React from 'react';
import { getAllRoles } from '@/pages/role/api';
import { Drawer, Form, Input, Message, Select } from '@arco-design/web-react';
import { useRequest } from 'ahooks';
import { useMemo } from 'react';
import { addUser, initial, updateUser, User } from '../api';
import AvatarUploader from './avatar-uploader';

const FormItem = Form.Item;

type Props = {
  user: User;
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
  callback?: (user?: Partial<User>) => void;
};

export function FormUser({ user, visible, setVisible, callback }: Props) {
  // 表单实例
  const [form] = Form.useForm<User>();

  // 抽屉标题
  const drawerTitle = useMemo(
    () => (user._id ? '更新' : '新增') + '用户',
    [user._id]
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

  // drawer打开、关闭相关操作
  const afterOpen = () => {
    // 填充表单数据项
    form.setFieldsValue(user);

    // 获取用户可用角色
    if (!roles) {
      run();
    }
  };
  const afterClose = () => {
    // 重置表单项
    form.resetFields();
  };

  // 提交编辑表单
  const onSubmit = () => {
    let message: string = user._id ? '编辑' : '新增';

    form.validate(async (errors) => {
      if (!errors) {
        try {
          // 根据标识符决定新增或更新
          if (user._id) {
            await updateUser(user._id, form.getFieldsValue());
            callback && callback(form.getFieldsValue());
          } else {
            const user = form.getFieldsValue();
            const newUser = await addUser(user);
            callback && callback(newUser);
          }

          // 显示提示信息
          message += '用户成功!';
          Message.success(message);
          // 关闭抽屉
          setVisible(false);
        } catch (error) {
          // 操作失败
          message += '用户失败，请重试!';
          Message.error(message);
        }
      }
    });
  };

  return (
    <Drawer
      width={500}
      title={drawerTitle}
      visible={visible}
      onOk={onSubmit}
      okText="提交"
      onCancel={() => setVisible(false)}
      cancelText="取消"
      afterOpen={afterOpen}
      afterClose={afterClose}
    >
      <Form form={form} autoComplete="off" initialValues={initial}>
        <FormItem
          label="手机号"
          field="phoneNumber"
          rules={[
            { required: true, message: '手机号是必填项' },
            { match: /^1[3456789]\d{9}$/, message: '请输入正确的手机号' },
          ]}
        >
          <Input placeholder="请输入手机号" />
        </FormItem>
        <FormItem label="用户角色" field="role" rules={[{ required: true }]}>
          <Select placeholder="请选择一个用户角色" options={rolesOptions} />
        </FormItem>
        <FormItem
          label="用户名称"
          field="name"
          rules={[
            { required: true, message: '手机号是必填项' },
            { match: /^1[3456789]\d{9}$/, message: '请输入正确的手机号' },
          ]}
        >
          <Input placeholder="请输入用户名" />
        </FormItem>
        <FormItem label="头像" field="avatar">
          <AvatarUploader />
        </FormItem>
        <FormItem label="邮箱" field="email">
          <Input placeholder="请输入邮箱" />
        </FormItem>
        <FormItem label="组织" field="organization">
          <Input placeholder="请输入组织名称" />
        </FormItem>
        <FormItem label="职位" field="job">
          <Input placeholder="请输入职位" />
        </FormItem>
        <FormItem label="个人站点" field="personalWebsite">
          <Input placeholder="请输入个人站点URL" />
        </FormItem>
      </Form>
    </Drawer>
  );
}
