import { Form, Input, Button, Checkbox, message } from "antd";
import styles from "./index.less";
import { PageContainer } from "@ant-design/pro-layout";
import { updatePwd } from '@/services/employ';
import { useCallback } from "react";
import md5 from 'md5'
const PasswordManager = () => {
  const [form] = Form.useForm();
  const handlerSubmit = async (value) => {
    const result = await updatePwd({ newPwd1: md5(value.newPwd1), newPwd2: md5(value.newPwd2), oldPwd: md5(value.oldPwd) });
    message.info(result.data.message)
  }
  return (
    <PageContainer>
      <div className={styles["input-container"]}>
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          labelAlign="left"
          onFinish={handlerSubmit}
        >
          <Form.Item
            label="旧密码"
            name="oldPwd"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            label="新密码"
            name="newPwd1"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            label="新密码重复"
            name="newPwd2"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password />
          </Form.Item>
          <Button type="primary" htmlType="submit">提交</Button>
        </Form>
      </div>
    </PageContainer>
  );
};

export default PasswordManager;
