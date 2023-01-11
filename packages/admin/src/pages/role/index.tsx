/* eslint-disable react-hooks/exhaustive-deps */
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
  Tree,
  TreeNodeProps,
  Checkbox,
} from '@arco-design/web-react';
import { usePagination } from 'ahooks';
import {
  addRole,
  deleteRole,
  getRoleList,
  updateRole,
  Role,
  initial,
} from './api';
import { IRoute, routes } from '@/routes';
import useLocale from '@/utils/useLocale';
import { TreeDataType } from '@arco-design/web-react/es/Tree/interface';
import PermissionWrapper from '@/components/PermissionWrapper';

const Text = Typography.Text;
const Title = Typography.Title;
const FormItem = Form.Item;

function generateMenus(routes: IRoute[], t: Record<string, string>) {
  return routes.map((route) => {
    const item: TreeDataType = {
      title: t[route.name],
      key: route.key,
    };
    if (route.children) {
      item.children = generateMenus(route.children, t);
    }
    return item;
  });
}

// 权限选择结果
let authSelectResult: { [key: string]: string[] } = {};

// 用户页面组件
function Index() {
  // 获取列表数据
  const { data, loading, pagination, refresh } = usePagination(getRoleList, {
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

  // 用户操作的回调函数
  const tableCallback = async (record: Role, type: 'edit' | 'delete') => {
    if (type === 'edit') {
      // 进入编辑模式
      setDrawerVisibleVisible(true);
      setEditedItem(record);
      console.log('edit', record);
    } else if (type === 'delete') {
      try {
        // 请求删除
        await deleteRole(record._id);
        // 操作成功
        Message.success('删除用户成功!');
        // 重新获取当前页面，
        // 如果恰好当前页面只有一条数据，回到上一页
        const { current, total, changeCurrent } = pagination;
        if (total > 0 && data.list.length === 1 && current > 1) {
          changeCurrent(current - 1);
        } else {
          refresh();
        }
      } catch (error) {
        // 操作失败
        Message.success('删除用户失败，请重试!');
      }
    }
  };

  // 点击新增按钮
  const onAdd = () => {
    // 还原表单数据
    setEditedItem(initial);
    // 弹出抽屉
    setDrawerVisibleVisible(true);
  };

  // 编辑项
  const [editedItem, setEditedItem] = useState<Role>(initial);

  // 用户修改编辑项
  const onEditedItemChange = (key: string, value: unknown) => {
    setEditedItem({ ...editedItem, [key]: value });
  };

  // 抽屉显示状态
  const [drawerVisible, setDrawerVisibleVisible] = useState(false);
  // 抽屉标题
  const drawerTitle = useMemo(
    () => (editedItem._id ? '编辑' : '新增') + '角色权限',
    [editedItem._id]
  );

  // 提交编辑表单
  const onSubmit = async () => {
    // id存在说明是编辑
    const isEdit = editedItem._id ? true : false;
    let message: string = isEdit ? '编辑' : '新增';
    try {
      // 设置权限选择结果
      editedItem.permissions = authSelectResult;

      // 根据标识符决定新增或更新
      if (isEdit) {
        await updateRole(editedItem);
      } else {
        await addRole(editedItem);
      }

      // 操作成功
      message += '角色成功!';
      Message.success(message);

      // 关闭抽屉
      setDrawerVisibleVisible(false);

      // 数据刷新
      refresh();
    } catch (error) {
      message += '角色失败，请重试!';
      Message.error(message);
    }
  };

  const columns = [
    {
      title: 'ID',
      dataIndex: '_id',
      render: (value: string) => <Text copyable>{value}</Text>,
    },
    {
      title: '角色名称',
      dataIndex: 'name',
    },
    {
      title: '操作',
      dataIndex: 'operations',
      render: (_: unknown, record: Role) => (
        <PermissionWrapper
          requiredPermissions={[
            { resource: 'role', actions: ['read', 'write'] },
          ]}
        >
          <Button
            type="text"
            size="small"
            onClick={() => tableCallback(record, 'edit')}
          >
            编辑权限
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

  // 每次打开drawer，重置权限选择结果对象
  const afterDrawerClose = () => {
    authSelectResult = {};
  };

  const t = useLocale();
  const menus = generateMenus(routes, t);
  const RenderAuthTree = (node: TreeNodeProps) => {
    const options = ['read', 'write'];
    const { selected, setSelected } = Checkbox.useCheckbox(options);
    useEffect(() => {
      if (editedItem.permissions) {
        // 根据正在编辑的选项的permissions信息设置选中状态
        setSelected(editedItem.permissions[node.dataRef.key]);
        if (editedItem.permissions[node.dataRef.key]) {
          // 如果key在permissions中则保存到选择结果中
          authSelectResult[node.dataRef.key] =
            editedItem.permissions[node.dataRef.key];
          console.log('authSelectResult初始化', authSelectResult);
        }
      }
    }, [editedItem.permissions]);

    return (
      <Checkbox.Group
        value={selected}
        options={options}
        onChange={(value) => {
          // 如果用户选择某页面至少一个权限，则写入权限选择结果对象
          // 否则，用户取消选择某页面所有权限，则删除之前已存在的选择记录
          if (value.length) {
            authSelectResult[node._key] = value;
          } else {
            delete authSelectResult[node._key];
          }
          console.log('authSelectResult变化', authSelectResult);
          setSelected(value);
          // editedItem.permissions[node.dataRef.key] = value;
          // onEditedItemChange('permissions', editedItem.permissions);
        }}
      />
    );
  };
  return (
    <>
      <Card>
        <Title heading={6}>用户管理</Title>
        <PermissionWrapper
          requiredPermissions={[
            { resource: 'role', actions: ['read', 'write'] },
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
      <Drawer
        width={400}
        title={drawerTitle}
        visible={drawerVisible}
        onOk={onSubmit}
        okText="提交"
        onCancel={() => setDrawerVisibleVisible(false)}
        cancelText="取消"
        afterClose={afterDrawerClose}
      >
        <Form autoComplete="off">
          <FormItem label="ID">
            <Text>{editedItem._id}</Text>
          </FormItem>
          <FormItem label="角色名称">
            <Input
              value={editedItem.name}
              onChange={(value: string) => onEditedItemChange('name', value)}
            />
          </FormItem>
          <FormItem label="权限设置">
            <Tree
              treeData={menus}
              blockNode
              renderExtra={RenderAuthTree}
            ></Tree>
          </FormItem>
        </Form>
      </Drawer>
    </>
  );
}

export default Index;
