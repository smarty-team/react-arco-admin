import { Button, Card, Space, Typography } from '@arco-design/web-react';
import React from 'react';

const { Title, Text } = Typography;

export default function UserPage() {
  return (
    // 容器
    <Card>
      {/* 标题 */}
      <Title heading={6}>用户管理</Title>

      {/* 操作按钮 */}
      <Space direction="vertical">
        <Button>新增</Button>
        {/* 数据表格 */}
        <Text>用户数据</Text>
      </Space>
    </Card>
  );
}
