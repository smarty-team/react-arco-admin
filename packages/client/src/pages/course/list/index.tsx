import React, { useEffect, useState } from 'react';
import {
  Typography,
  Card,
  Table,
  PaginationProps,
  Button,
  Popover,
  Drawer,
} from '@arco-design/web-react';
import axios from 'axios';
import './mock';

const Text = Typography.Text;
const Title = Typography.Title;

function Course() {
  const [loading, setLoading] = useState(true);
  const [pagination, setPatination] = useState<PaginationProps>({
    sizeCanChange: true,
    showTotal: true,
    pageSize: 10,
    current: 1,
    pageSizeChangeResetCurrent: true,
  });
  function onChangeTable({ current, pageSize }) {
    setPatination({
      ...pagination,
      current,
      pageSize,
    });
  }
  const tableCallback = async (record, type) => {
    console.log(record, type);

    if (type === 'edit') {
      setVisible(true)
    }
  };
  const columns = [
    {
      title: '课程ID',
      dataIndex: 'id',
      render: (value) => <Text copyable>{value}</Text>,
    },
    {
      title: '课程名称',
      dataIndex: 'name',
    },
    {
      title: '操作',
      dataIndex: 'operations',
      render: (_, record) => (
        <>
          <Button
            type="text"
            size="small"
            onClick={() => tableCallback(record, 'edit')}
          >
            编辑
          </Button>
          <Popover
            trigger="click"
            title="确定删除？"
            content={
              <Button
                long
                size="small"
                onClick={() => tableCallback(record, 'delete')}
              >
                确定
              </Button>
            }
          >
            <Button type="text" size="small">
              删除
            </Button>
          </Popover>
        </>
      ),
    },
  ];

  const [data, setData] = useState([]);
  useEffect(() => {
    const { current, pageSize } = pagination;
    setLoading(true);
    axios
      .get('/api/course', {
        params: {
          page: current,
          pageSize,
        },
      })
      .then((res) => {
        setData(res.data.list);
        setPatination({
          ...pagination,
          current,
          pageSize,
          total: res.data.total,
        });
        setLoading(false);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pagination.current, pagination.pageSize]);

  // 抽屉显示状态
  const [visible, setVisible] = useState(false);

  return (
    <>
      <Card>
        <Title heading={6}>课程管理</Title>
        <Table
          rowKey="id"
          loading={loading}
          onChange={onChangeTable}
          pagination={pagination}
          columns={columns}
          data={data}
        />
      </Card>
      <Drawer
        width={332}
        title={<span>Basic Information </span>}
        visible={visible}
        onOk={() => {
          setVisible(false);
        }}
        onCancel={() => {
          setVisible(false);
        }}
      >
        
      </Drawer>
    </>
  );
}

export default Course;
