import React, { useEffect, useMemo, useState } from 'react';
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

const Text = Typography.Text;
const Title = Typography.Title;
const FormItem = Form.Item;

// 用户页面组件
function Index() {
  // 获取列表数据
  const { data, loading, pagination, mutate, refresh } = usePagination(getUserList, {
    defaultPageSize: 10,
    defaultCurrent: 1,
    loadingDelay: 300,
  });
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
  useEffect(() => {
    console.log(data);
  }, [data]);
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

  // 编辑项
  const [editedItem, setEditedItem] = useState<User>(initial);
  // 用户修改编辑项
  const onEditedItemChange = (key: string, value: string) => {
    setEditedItem({ ...editedItem, [key]: value });
  };

  // 抽屉显示状态
  const [drawerVisible, setDrawerVisibleVisible] = useState(false);
  // 抽屉标题
  const drawerTitle = useMemo(
    () => (editedItem._id ? '更新' : '新增') + '用户',
    [editedItem._id]
  );

  // 提交编辑表单
  const onSubmit = async () => {
    let message: string = editedItem._id ? '编辑' : '新增';
    try {
      // 根据标识符决定新增或更新
      if (editedItem._id) {
        await updateUser(editedItem);
        refresh()
      } else {
        const newUser = await addUser(editedItem);  
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
      message += '用户失败，请重试!';
      Message.error(message);
    }
  };

  const columns = [
    {
      title: '用户ID',
      dataIndex: '_id',
      render: (value: string) => <Text copyable>{value}</Text>,
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
        width={400}
        title={drawerTitle}
        visible={drawerVisible}
        onOk={onSubmit}
        okText="提交"
        onCancel={() => setDrawerVisibleVisible(false)}
        cancelText="取消"
      >
        <Form autoComplete="off">
          <FormItem label="ID">
            <Text>{editedItem._id}</Text>
          </FormItem>
          <FormItem label="用户名称">
            <Input
              value={editedItem.name}
              onChange={(value: string) => onEditedItemChange('name', value)}
            />
          </FormItem>
          <FormItem label="头像">
            <AvatarUploader
              value={editedItem.avatar}
              onComplete={(value: string) =>
                onEditedItemChange('avatar', value)
              }
            ></AvatarUploader>
          </FormItem>
        </Form>
      </Drawer>
    </>
  );
}

export default Index;
