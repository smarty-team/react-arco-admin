import React, { CSSProperties, useMemo, useState } from 'react';
import {
  Typography,
  Card,
  Tree,
  Input,
  Popconfirm,
  Modal,
  TreeNodeProps,
  Button,
  Space,
} from '@arco-design/web-react';
import {
  IconPen,
  IconDelete,
  IconFile,
  IconFolderAdd,
} from '@arco-design/web-react/icon';

import { useRequest } from 'ahooks';
import { v4 as uuid } from 'uuid';
import { addArticle, getArticle, initial, updateArticle } from './api';
import { ArticleEditor } from './components/ArticleEditor';
import { getMenu, MenuItem, updateMenu } from './api/menu';

const Title = Typography.Title;

function getParent(treeData, pathParentKeys) {
  const keys = pathParentKeys.slice();
  if (keys.length > 0) {
    const key = keys.shift();
    const node = treeData.find((item) => item.key === key);
    if (keys.length === 0) {
      return node;
    }
    return getParent(node.children, keys);
  }
  return null;
}

function removeFromParent(treeData: MenuItem[], node: TreeNodeProps, callback) {
  const { parentKey, pathParentKeys, dataRef } = node;
  if (parentKey) {
    const parentNode = getParent(treeData, pathParentKeys);
    parentNode.children = parentNode.children.filter(
      (item) => item.key !== dataRef.key
    );
    callback(treeData);
  } else {
    // 没有父节点，说明是根节点，从treeData中删除
    const newData = treeData.filter((item) => item.key !== dataRef.key);
    callback(newData);
  }
}

const iconStyle: CSSProperties = {
  fontSize: 22,
  color: '#3370ff',
  position: 'relative',
  top: 5,
};

function Index() {
  // 获取菜单数据
  const { data: treeData, mutate } = useRequest<MenuItem[], null>(getMenu);
  // const filteredTreeData = useMemo(
  //   () => treeData.filter((item) => !!item),
  //   [treeData]
  // );
  // 更新菜单数据
  const { run } = useRequest(updateMenu, { manual: true });

  // 当前编辑项，用于行内编辑文本框显示控制
  const [editedItem, setEditedItem] = useState(null);
  // 当前编辑的分类，用于新增项目时回显
  const [currentCategory, setCurrentCategory] = useState(null);
  // 当前编辑的文章，用于填充文章编辑表单
  const [article, setArticle] = useState(initial);
  // modal开关
  const [visible, setVisible] = useState(false);
  // modal标题
  const [modalTitle, setModalTitle] = useState(null);

  // 指定如何渲染节点标题
  const renderTitle = (node: TreeNodeProps) => {
    if (editedItem && node.dataRef.key === editedItem.key) {
      return (
        <Input
          value={editedItem.title}
          placeholder="请输入分类名称"
          autoFocus
          onChange={(value) => setEditedItem({ ...editedItem, title: value })}
          onBlur={() => setEditedItem(null)}
          onPressEnter={async (e) => {
            // 更新标题
            node.dataRef.title = e.target.value;
            // 提交更新
            run(treeData);
            // 退出编辑模式
            setEditedItem(null);
          }}
          onKeyDown={(e) => {
            if (e.code === 'Escape') {
              // 移除当前项
              removeFromParent(treeData, node, (data) => {
                mutate(data);
                // 退出编辑模式
                setEditedItem(null);
              });
            }
          }}
        ></Input>
      );
    }
    return <>{node.title}</>;
  };

  // 指定如何渲染节点操作图标
  const renderExtra = (node: TreeNodeProps) => {
    // 根据节点类型生成不同菜单：
    // 1. category的操作有：修改分类名称、删除分类、新增子分类、新增文章
    // 2. article的操作有：删除文章、编辑文章
    if (node.dataRef.type === 'category') {
      return (
        <>
          {/* 编辑当前目录名称 */}
          <IconPen
            style={iconStyle}
            onClick={() => setEditedItem(node.dataRef)}
          />
          {/* 删除当前目录 */}
          <Popconfirm
            focusLock
            title="确认删除吗?"
            okText="确认"
            cancelText="取消"
            onOk={() => {
              // 找到父节点，从其children中删除当前节点
              removeFromParent(treeData, node, (data) => {
                // 执行更新菜单
                run(data);
                // 修改本地数据
                mutate(data);
              });
            }}
          >
            <IconDelete style={iconStyle} />
          </Popconfirm>
          {/* 新增子目录 */}
          <IconFolderAdd
            style={iconStyle}
            onClick={() => {
              // 往本地菜单加一个目录项
              const dataChildren = node.dataRef.children || [];
              const newNode = {
                title: '输入分类名称',
                key: uuid(),
                type: 'category',
              };
              dataChildren.push(newNode);
              node.dataRef.children = dataChildren;
              // 修改本地数据
              mutate(treeData);
              // 进入编辑模式
              setEditedItem(newNode);
            }}
          />
          {/* 新增文章 */}
          <IconFile
            style={iconStyle}
            onClick={() => {
              // 打开新增弹窗并设置弹窗标题
              setVisible(true);
              setModalTitle('新增文章');
              // 设置文章所属分类节点
              setCurrentCategory(node.dataRef);
              // 设置文章数据对象
              setArticle({
                _id: '',
                title: '',
                content: '',
              });
            }}
          />
        </>
      );
    } else {
      return (
        <>
          <IconPen
            style={iconStyle}
            onClick={async () => {
              // 编辑文章：
              // 1.设置文章所属分类用于更新回显
              const category = getParent(treeData, node.pathParentKeys);
              setCurrentCategory(category);
              // 2.打开弹窗、设置标题
              setVisible(true);
              setModalTitle(node.title);
              // 3.通过文章id获取其内容
              const articleId = node.dataRef.key;
              const result = await getArticle(articleId);
              setArticle(result.data);
            }}
          />
          <Popconfirm
            focusLock
            title="确认删除吗?"
            okText="确认"
            cancelText="取消"
            onOk={() => {
              // 确认删除
              // 找到父节点，删除当前节点
              if (node.parentKey) {
                const parentNode = getParent(treeData, node.pathParentKeys);
                parentNode.children = parentNode.children.filter(
                  (item) => item.key !== node.dataRef.key
                );
                // 更新菜单
                run(treeData);
                mutate(treeData);
              } else {
                const newData = treeData.filter(
                  (item) => item.key !== node.dataRef.key
                );
                // 更新菜单
                run(newData);
                mutate(newData);
              }
            }}
          >
            <IconDelete style={iconStyle} />
          </Popconfirm>
        </>
      );
    }
  };

  // 提交文章更新或创建
  const onArticleSubmit = async () => {
    // 提交文章创建或更新请求
    // 1.如果正在编辑的article不存在id则为新增文章
    if (!article._id) {
      // 提交新增文章请求
      const { data } = await addArticle(article);

      // 构造一个菜单项
      const menuItem = {
        key: data._id,
        title: data.title,
        type: 'article',
      } as MenuItem;

      // 将新增的文章加入本地菜单
      if (!currentCategory) {
        // 根节点文章没有所属分类
        treeData.push(menuItem);
      } else {
        // 确保children存在
        if (!currentCategory.children) {
          currentCategory.children = [];
        }
        currentCategory.children.push(menuItem);
      }

      // 更新菜单
      run(treeData);
    } else {
      // 提交更新
      await updateArticle(article);
      // 更新一下本地数据
      let editArticle;
      if (!currentCategory) {
        // 根文章没有所属分类
        editArticle = treeData.find((item) => item.key === article._id);
      } else {
        // 从所属分类中找到对应菜单项
        editArticle = currentCategory.children.find(
          (item) => item.key === article._id
        );
      }
      editArticle.title = article.title;
      editArticle.content = article.content;
      // 更新成功，更新菜单
      run(treeData);
    }
    setVisible(false);
  };

  // 添加根分类
  const addRootCategory = () => {
    // 创建新节点
    const newNode = {
      key: uuid(),
      title: '',
      type: 'category',
      children: [],
    } as MenuItem;

    // 如果数据为空，则初始化一个
    if (treeData && JSON.stringify(treeData) === '{}') {
      mutate([newNode]);
    } else {
      treeData.push(newNode);
    }

    // 进入编辑模式
    setEditedItem(newNode);
  };

  // 添加根文章
  const addRootArticle = () => {
    // 打开新增弹窗并设置弹窗标题
    setVisible(true);
    setModalTitle('新增文章');

    // 设置文章数据对象
    setArticle({
      _id: '',
      title: '',
      content: '',
    });
  };

  // 处理拖拽
  const onDrop = ({ dragNode, dropNode, dropPosition }) => {
    const loop = (data, key, callback) => {
      data.some((item, index, arr) => {
        if (item.key === key) {
          callback(item, index, arr);
          return true;
        }

        if (item.children) {
          return loop(item.children, key, callback);
        }
      });
    };

    const data = [...treeData];
    let dragItem;
    loop(data, dragNode.props._key, (item, index, arr) => {
      arr.splice(index, 1);
      dragItem = item;
      dragItem.className = 'tree-node-dropover';
    });

    if (dropPosition === 0) {
      loop(data, dropNode.props._key, (item, index, arr) => {
        item.children = item.children || [];
        item.children.push(dragItem);
      });
    } else {
      loop(data, dropNode.props._key, (item, index, arr) => {
        arr.splice(dropPosition < 0 ? index : index + 1, 0, dragItem);
      });
    }

    const newData = [...data];
    mutate(newData);
    run(newData);
    setTimeout(() => {
      dragItem.className = '';
      mutate([...data]);
    }, 1000);
  };

  // 重新生成静态文件
  const regenerate = () => {
    // todo
  };
  return (
    <>
      <Card>
        <Title heading={6}>文章管理</Title>

        {/* 创建根目录和文章 */}
        <Space>
          <Button type="primary" onClick={addRootCategory}>
            添加分类
          </Button>
          <Button type="primary" onClick={addRootArticle}>
            添加文章
          </Button>
          <Button type="outline" onClick={regenerate}>
            同步数据
          </Button>
        </Space>

        {/* 菜单、内容管理 */}
        {treeData && JSON.stringify(treeData) !== '{}' && (
          <Tree
            size="large"
            draggable
            treeData={treeData}
            renderTitle={renderTitle}
            renderExtra={renderExtra}
            onDrop={onDrop}
            style={{ marginTop: 15 }}
          ></Tree>
        )}

        {/* 文章编辑器 */}
        <Modal
          title={modalTitle}
          visible={visible}
          onOk={onArticleSubmit}
          onCancel={() => setVisible(false)}
          autoFocus={false}
          focusLock={true}
          style={{ width: '90vw' }}
        >
          <ArticleEditor
            article={article}
            setArticle={setArticle}
          ></ArticleEditor>
        </Modal>
      </Card>
    </>
  );
}

export default Index;
