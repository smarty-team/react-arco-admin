import "./App.css";
import { Button, Icon, Layout, Space } from "@arco-design/web-react";

// Layout：
const Header = Layout.Header;
const Content = Layout.Content;
const Sider = Layout.Sider;
const Footer = Layout.Footer;

function App() {
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
        <Content>Content</Content>
      </Layout>
      <Footer>Footer</Footer>
    </Layout>
  );
}
export default App;
