import {
  Button,
  Card,
  Message,
  Popconfirm,
  Space,
  Table,
  TableColumnProps,
  Typography,
} from '@arco-design/web-react';
import { usePagination } from 'ahooks';
import React, { useState } from 'react';
import DrawerForm from './form';
import service from '@/utils/request';
import http from '@/utils/http';

const { Title } = Typography;

const getTableData = async ({ current, pageSize }) => {
  const {
    data: list,
    meta: { total },
  } = await fetch(`/api/user?pageSize=${pageSize}&page=${current}`).then(
    (res) => res.json()
  );
  // const {data} = await service.get<{name: string}>('/api/user')
  const user = await http.get<{name: string}>('/api/user')
  return { list, total };
};

const deleteTableData = async (id: string) => {
  const res = await fetch(`/api/user/${id}`, { method: 'delete' }).then((res) =>
    res.json()
  );
  return { ok: res.affected === 1 };
};

export const initial = {
  _id: '',
  phoneNumber: '',
  password: '',
  name: '',
  avatar: '',
  email: '',
  job: '',
  jobName: '',
  organization: '',
  location: '',
  personalWebsite: '',
};

export type User = typeof initial

export default function UserPage() {
  const { data, pagination, loading, refresh } = usePagination(getTableData, {
    defaultCurrent: 1,
    defaultPageSize: 2,
  });

  const columns: TableColumnProps[] = [
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
      placeholder: '-',
    },
    {
      title: '操作',
      dataIndex: 'operations',
      render: (_: unknown, record) => (
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

  const tableCallback = async (record, operation) => {
    console.log('操作', operation);
    console.log('记录', record);
    if (operation === 'delete') {
      const { ok } = await deleteTableData(record._id);
      if (ok) {
        Message.success('删除用户成功');
        refresh();
      } else {
        Message.error('删除用户失败，请重试！');
      }
    } else {
      setEditedItem(record)
      setVisible(true);
    }
  };

  const [visible, setVisible] = useState(false);
  const [editedItem, setEditedItem] = useState(initial)
  const onAdd = () => {
    setEditedItem(initial)
    setVisible(true);
  };
  return (
    // 容器
    <Card>
      {/* 标题 */}
      <Title heading={6}>用户管理</Title>

      {/* 操作按钮 */}
      <Space direction="vertical" style={{ width: '100%' }}>
        <Button onClick={onAdd}>新增</Button>
        {/* 数据表格 */}
        <Table
          data={data?.list}
          loading={loading}
          columns={columns}
          pagination={pagination}
          rowKey="_id"
          style={{ width: '100%' }}
        ></Table>
      </Space>

      {/* 表单 */}
      <DrawerForm {...{ visible, setVisible, editedItem, callback: () => refresh() }}></DrawerForm>
    </Card>
  );
}
