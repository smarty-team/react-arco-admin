import React, { useMemo, useState } from 'react';
import {
  Typography,
  Card,
  Table,
  PaginationProps,
  Button,
  Drawer,
  Form,
  Input,
  Message,
  Popconfirm,
} from '@arco-design/web-react';
import { usePagination } from 'ahooks';
import {
  addUser,
  deleteUser,
  getUserList,
  initial,
  updateUser,
  User,
} from './api';
import AvatarUploader from './components/avatar-uploader';

const Title = Typography.Title;
const FormItem = Form.Item;

// 用户页面组件
function Index() {
  // 获取列表数据
  const { data, loading, pagination, mutate, refresh } = usePagination(
    getUserList,
    {
      defaultPageSize: 10,
      defaultCurrent: 1,
      loadingDelay: 300,
    }
  );
  // 分页
  const pager = useMemo<PaginationProps>(
    () => ({
      ...pagination,
      sizeCanChange: true,
      showTotal: true,
      pageSizeChangeResetCurrent: true,
    }),
    [pagination]
  );

  // 用户操作的回调函数
  const tableCallback = async (record: User, type: 'edit' | 'delete') => {
    if (type === 'edit') {
      // 进入编辑模式
      setDrawerVisibleVisible(true);
      setEditedItem(record);
    } else if (type === 'delete') {
      try {
        // 请求删除
        await deleteUser(record._id);
        // 操作成功
        Message.success('删除用户成功!');
        mutate({
          list: data.list.filter((item) => item._id !== record._id),
          total: data.total - 1,
        });
      } catch (error) {
        // 操作失败
        Message.success('删除用户失败，请重试!');
      }
    }
  };

  const onAdd = () => {
    // 还原表单数据
    setEditedItem(initial);
    // 弹出抽屉
    setDrawerVisibleVisible(true);
  };

  // 当前编辑项
  const [editedItem, setEditedItem] = useState<User>(initial);
  // 表单实例
  const [form] = Form.useForm<User>();
  // 抽屉显示状态
  const [drawerVisible, setDrawerVisibleVisible] = useState(false);
  // 抽屉标题
  const drawerTitle = useMemo(
    () => (editedItem._id ? '更新' : '新增') + '用户',
    [editedItem._id]
  );

  const fillForm = () => {
    form.setFieldsValue(editedItem);
  }
  const resetForm = () => {
    form.resetFields();
  }

  // 提交编辑表单
  const onSubmit = () => {
    let message: string = editedItem._id ? '编辑' : '新增';

    form.validate(async (errors) => {
      if (!errors) {
        try {
          // 根据标识符决定新增或更新
          if (editedItem._id) {
            await updateUser(editedItem._id, form.getFieldsValue());
            refresh();
          } else {
            const user = form.getFieldsValue()
            const newUser = await addUser(user);
            console.log(user);
            
            mutate({
              list: [...data.list, newUser],
              total: data.total + 1,
            });
          }

          // 显示提示信息
          message += '用户成功!';
          Message.success(message);
          // 关闭抽屉
          setDrawerVisibleVisible(false);
        } catch (error) {
          // 操作失败
          message += '用户失败，请重试!';
          Message.error(message);
        }
      }
    });
  };

  const columns = [
    {
      title: '手机号',
      dataIndex: 'phoneNumber',
    },
    {
      title: '用户名称',
      dataIndex: 'name',
    },
    {
      title: '用户头像',
      dataIndex: 'avatar',
      render(value: string) {
        return <img src={value} width="50" />;
      },
    },
    {
      title: '邮箱',
      dataIndex: 'email',
      render(value: string) {
        if (!value) {
          return '-';
        }
        return value;
      },
    },
    {
      title: '操作',
      dataIndex: 'operations',
      render: (_: unknown, record: User) => (
        <>
          <Button
            type="text"
            size="small"
            onClick={() => tableCallback(record, 'edit')}
          >
            编辑
          </Button>
          <Popconfirm
            focusLock
            title="确认删除吗?"
            okText="确认"
            cancelText="取消"
            onOk={() => tableCallback(record, 'delete')}
          >
            <Button type="text" size="small">
              删除
            </Button>
          </Popconfirm>
        </>
      ),
    },
  ];
  return (
    <>
      <Card>
        <Title heading={6}>用户管理</Title>
        <Button onClick={onAdd} type="primary" style={{ marginBottom: 10 }}>
          新增
        </Button>
        <Table
          rowKey="_id"
          loading={loading}
          onChange={({ current, pageSize }) =>
            pager.onChange(current, pageSize)
          }
          pagination={pager}
          columns={columns}
          data={data?.list}
        />
      </Card>
      <Drawer
        width={500}
        title={drawerTitle}
        visible={drawerVisible}
        onOk={onSubmit}
        okText="提交"
        onCancel={() => setDrawerVisibleVisible(false)}
        cancelText="取消"
        afterOpen={fillForm}
        afterClose={resetForm}
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
          <FormItem
            label="密码"
            field="password"
            rules={[
              { required: true, message: '密码是必填项' },
              { minLength: 6, message: '密码长度至少6位' },
            ]}
          >
            <Input type="password" placeholder="请输入密码" />
          </FormItem>
          <FormItem label="用户名称" field="name">
            <Input placeholder="请输入用户名" />
          </FormItem>
          <FormItem label="头像">
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
    </>
  );
}

export default Index;
