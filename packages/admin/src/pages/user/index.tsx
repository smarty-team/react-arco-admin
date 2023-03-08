import React, { useEffect, useMemo, useState } from 'react';
import {
  Typography,
  Card,
  Table,
  PaginationProps,
  Button,
  Message,
  Popconfirm,
} from '@arco-design/web-react';
import { usePagination } from 'ahooks';
import { deleteUser, getUserList, initial, User } from './api';
import { FormChangePWD } from './components/form-change-pwd';
import { FormUser } from './components/form-user';
import PermissionWrapper from '@/components/PermissionWrapper';

const Title = Typography.Title;

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
  useEffect(() =>{
    console.log(data);
    
  })
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
  const tableCallback = async (
    record: User,
    type: 'edit' | 'delete' | 'changePWD'
  ) => {
    if (type === 'edit') {
      // 弹出用户编辑表单
      setEditedItem(record);
      setDrawerVisible(true);
    } else if (type === 'changePWD') {
      // 弹出修改密码表单
      setEditedItem(record);
      setDrawerChangePWDVisible(true);
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
        Message.error('删除用户失败，请重试!');
      }
    }
  };

  const onAdd = () => {
    // 还原表单数据
    setEditedItem(initial);
    // 弹出抽屉
    setDrawerVisible(true);
  };

  // 当前编辑项
  const [editedItem, setEditedItem] = useState<User>(initial);

  // 编辑用户弹窗显示状态
  const [drawerVisible, setDrawerVisible] = useState(false);
  const editCallback = (userInfo: Partial<User>) => {
    // 如果有newUser，加入到本地数据中；否则刷新即可；
    if (!userInfo._id) {
      refresh();
    } else {
      mutate({
        list: [...data.list, userInfo as User],
        total: data.total + 1,
      });
    }
  };

  // 修改密码弹窗显示状态
  const [drawerChangePWDVisible, setDrawerChangePWDVisible] = useState(false);

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
        <PermissionWrapper
          requiredPermissions={[
            { resource: 'user', actions: ['read', 'write'] },
          ]}
        >
          <Button
            type="text"
            size="small"
            onClick={() => tableCallback(record, 'edit')}
          >
            编辑
          </Button>
          <Button
            type="text"
            size="small"
            onClick={() => tableCallback(record, 'changePWD')}
          >
            修改密码
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
        </PermissionWrapper>
      ),
    },
  ];

  return (
    <>
      <Card>
        <Title heading={6}>用户管理</Title>
        <PermissionWrapper
          requiredPermissions={[
            { resource: 'user', actions: ['read', 'write'] },
          ]}
        >
          <Button onClick={onAdd} type="primary" style={{ marginBottom: 10 }}>
            新增
          </Button>
        </PermissionWrapper>
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

      {/* 修改用户信息 */}
      <FormUser
        user={editedItem}
        visible={drawerVisible}
        setVisible={setDrawerVisible}
        callback={editCallback}
      ></FormUser>

      {/* 修改密码表单 */}
      <FormChangePWD
        user={editedItem}
        visible={drawerChangePWDVisible}
        setVisible={setDrawerChangePWDVisible}
      ></FormChangePWD>
    </>
  );
}

export default Index;
