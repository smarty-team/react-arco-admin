import { Drawer, Form, Input, Message } from '@arco-design/web-react';
import { initial, updateUser, User } from '../api';

const FormItem = Form.Item;

export function FormChangePWD({
  user,
  visible,
  setVisible,
}: {
  user: User;
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [changePwdForm] = Form.useForm<User>();
  const onChangePWD = async () => {
    try {
      await updateUser(user._id, {
        password: changePwdForm.getFieldValue('password'),
      });
      Message.success('修改密码成功');
      // 关闭抽屉
      setVisible(false);
    } catch (error) {
      // 操作失败
      Message.error('修改密码失败!');
    }
  };
  const fillForm = () => {
    // 填充表单数据项
    changePwdForm.setFieldsValue(user);
  };
  const resetForm = () => {
    // 重置表单项
    changePwdForm.clearFields();
  };

  return (
    <Drawer
      width={500}
      title="修改密码"
      visible={visible}
      onOk={onChangePWD}
      okText="提交"
      onCancel={() => setVisible(false)}
      cancelText="取消"
      afterOpen={fillForm}
      afterClose={resetForm}
    >
      <Form form={changePwdForm} autoComplete="off" initialValues={initial}>
        <FormItem
          label="密码"
          field="password"
          rules={[
            { required: true, message: '密码是必填项' },
            { minLength: 6, message: '密码长度至少6位' },
          ]}
        >
          <Input type="password" placeholder="请输入密码" />
        </FormItem>
        <FormItem
          label="确认密码"
          field="confirmPassword"
          dependencies={['password']}
          required
          rules={[
            { required: true, message: '请再次输入密码' },
            {
              validator: (v, cb) => {
                if (changePwdForm.getFieldValue('password') !== v) {
                  return cb('两次密码输入不一致');
                }
                cb(null);
              },
            },
          ]}
        >
          <Input type="password" placeholder="请再次确认密码" />
        </FormItem>
      </Form>
    </Drawer>
  );
}
