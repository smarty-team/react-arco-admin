import React, { useEffect, useState } from 'react';
import {
  Typography,
  Card,
  Table,
  PaginationProps,
  Button,
  Popover,
  Drawer,
  Form,
  Input,
  Message,
  Popconfirm,
  Space,
} from '@arco-design/web-react';
import axios from 'axios';
import './mock';

const Text = Typography.Text;
const Title = Typography.Title;
const FormItem = Form.Item;

// 课程页面组件
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
          <Popconfirm
            focusLock
            title="确认要删除吗?"
            okText="确认"
            cancelText="取消"
            onOk={() => tableCallback(record, 'delete')}
          >
            <Button type="text" size="small">
              删除
            </Button>
          </Popconfirm>
          {/* <Popover
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
            
          </Popover> */}
        </>
      ),
    },
  ];

  const [data, setData] = useState([]);
  useEffect(() => {
    fetchData();
  }, [pagination.current, pagination.pageSize]);
  const fetchData = () => {
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
  };
  // 编辑或删除回调函数
  const tableCallback = async (record, type) => {
    if (type === 'edit') {
      setVisible(true);
      setEditedItem(record);
    } else if (type === 'delete') {
      remove(record.id);
    }
  };

  const remove = (id: string) => {
    if (id) {
      axios.delete('/api/course/' + id).then((res) => {
        // 删除成功
        Message.success('删除成功');
        // 重新获取
        fetchData();
      });
    }
  };

  // 抽屉显示状态
  const [visible, setVisible] = useState(false);
  // 编辑项
  const initial = {
    id: '',
    name: '',
  };
  const [editedItem, setEditedItem] = useState(initial);
  const onItemChange = (value: string) => {
    setEditedItem({ ...editedItem, name: value });
  };
  const onSubmit = () => {
    // 根据标识符决定新增或更新
    if (editedItem.id) {
      // 更新
      update(editedItem);
    } else {
      // 新增
      add(editedItem);
    }
    setVisible(false);
  };
  const add = (course) => {
    axios.post('/api/course', course).then((res) => {
      // 提交成功
      Message.success('新增成功');
      // 重新获取
      fetchData();
    });
  };
  const update = (course) => {
    axios.patch('/api/course/' + course.id, course).then((res) => {
      // 提交成功
      Message.success('更新成功');
      // 重新获取
      fetchData();
    });
  };

  const onAdd = () => {
    // 还原表单数据
    setEditedItem(initial);
    // 弹出表单
    setVisible(true);
  };

  return (
    <>
      <Card>
        <Title heading={6}>课程管理</Title>
        <Space direction="vertical" style={{width: '100%'}}>
          <Button onClick={onAdd} type="primary">
            新增
          </Button>
          <Table
            rowKey="id"
            loading={loading}
            onChange={onChangeTable}
            pagination={pagination}
            columns={columns}
            data={data}
          />
        </Space>
      </Card>
      <Drawer
        width={400}
        title={editedItem.id ? '更新' : '新增'}
        visible={visible}
        onOk={onSubmit}
        onCancel={() => {
          setVisible(false);
        }}
      >
        <Form autoComplete="off">
          <FormItem label="ID">
            <Text>{editedItem.id}</Text>
          </FormItem>
          <FormItem label="课程名称">
            <Input value={editedItem.name} onChange={onItemChange} />
          </FormItem>
        </Form>
      </Drawer>
    </>
  );
}

export default Course;
