import { Table, Layout, Space, Button, Drawer } from "@arco-design/web-react";
import React, { useEffect, useState } from "react";
import { useRequest, usePagination } from "ahooks";

const { Header, Sider, Content, Footer } = Layout;

function App() {

  const [visible, setVisible] = useState(false)
  
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
          <Button onClick={() => setVisible(true)}>新增</Button>
        </Content>
      </Layout>
      <Footer>Footer</Footer>
      <Drawer
        width={330}
        title={<span>title</span>}
        visible={visible}
        okText="确定"
        onOk={() => setVisible(false)}
      >
        some text,some content...
      </Drawer>
    </Layout>
  );
}
export default App;
