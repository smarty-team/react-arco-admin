import { Table, Layout, Space, Button } from "@arco-design/web-react";
import React, { useEffect, useState } from "react";
const { Header, Sider, Content, Footer } = Layout;

// 基础属性：
// columns 如何从data中获取数据并用什么方式展示
// data 数据表格的数据
const data = [
  {
    key: "1",
    name: "Jane Doe",
    salary: 23000,
    address: "32 Park Road, London",
    email: "jane.doe@example.com",
  },
  {
    key: "2",
    name: "Alisa Ross",
    salary: 25000,
    address: "35 Park Road, London",
    email: "alisa.ross@example.com",
  },
  {
    key: "3",
    name: "Alisa Rosssssss",
    salary: 25000,
    address: "35 Park Road, London",
    email: "alisa.ross@example.com",
  },
];

const getTableData = ({ current, pageSize }) => ({
  data: data.slice((current - 1) * pageSize, current * pageSize),
  total: data.length,
});

function App() {

  // 表格数据
  const [data, setData] = useState([]);
  // 分页信息
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 2,
    total: 0,
  });
  
  useEffect(() => {
    const {data, total} = getTableData(pagination);
    setData(data)
    setPagination({...pagination, total})
  }, [pagination.current, pagination.pageSize]);

  const onChange = (pagination) => {
    setPagination(pagination)
  }
  
  const tableCallback = (record, operation) => {
    console.log("操作", operation);
    console.log("记录", record);
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Salary",
      dataIndex: "salary",
    },
    {
      title: "Address",
      dataIndex: "address",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Operation",
      dataIndex: "operations",
      render: (_, record) => (
        <>
          <Button onClick={() => tableCallback(record, "edit")}>编辑</Button>
          <Button onClick={() => tableCallback(record, "delete")}>删除</Button>
        </>
      ),
    },
  ];

  return (
    <Layout style={{ height: "400px" }}>
      <Header>
        <Space>
          <Button type="primary">Item1</Button>
          <Button type="primary">Item2</Button>
          <Button type="primary">Item3</Button>
          <Button type="primary">Item4</Button>
        </Space>
      </Header>
      <Layout>
        <Sider>Sider</Sider>
        <Content>
          <Table data={data} columns={columns} pagination={pagination} onChange={onChange}></Table>
        </Content>
      </Layout>
      <Footer>Footer</Footer>
    </Layout>
  );
}
export default App;
