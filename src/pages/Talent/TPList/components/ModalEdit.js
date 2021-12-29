import { useState, useEffect } from "react";
import {
  Modal,
  Form,
  Input,
  DatePicker,
  Select,
  Row,
  Col,
  Divider,
} from "antd";

const ModalEdit = ({ visible, onSubmit, onCancel, record }) => {
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [form] = Form.useForm();
  const handleOk = () => {};
  const handleCancel = () => {};
  return (
    <Modal
      forceRender
      visible={visible}
      title="编辑"
      okText="提交"
      cancelText="取消"
      onCancel={handleCancel}
      onOk={handleOk}
      confirmLoading={confirmLoading}
    >
      <Form
        form={form}
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        labelAlign="left"
      >
        <Form.Item name="name" label="姓名">
          <Input></Input>
        </Form.Item>
        <Form.Item name="name" label="年龄">
          <Input></Input>
        </Form.Item>
        <Form.Item name="name" label="电话">
          <Input></Input>
        </Form.Item>
        <Form.Item name="name" label="学历">
          <Input></Input>
        </Form.Item>
        <Form.Item name="name" label="工龄">
          <Input></Input>
        </Form.Item>
        <Form.Item name="name" label="行业">
          <Input></Input>
        </Form.Item>
        <Form.Item name="name" label="更新时间">
          <Input></Input>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ModalEdit;
