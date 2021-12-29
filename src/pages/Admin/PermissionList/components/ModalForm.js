import { useState, useEffect } from "react";
import { Modal, Form, Input } from "antd";
import { addPermission, updatePermission } from "../../../../services/admin";

const ModalForm = ({ visible, onSubmit, onCancel, record }) => {
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalTitle, setModalTitle] = useState("新增权限");
  const [form] = Form.useForm();
  const handleOk = () => {
    setConfirmLoading(true);
    form.validateFields().then((values) => {
      if (record) {
        updatePermission({ id: record.id, ...values }).then(() => {
          onSubmit();
          form.resetFields();
          setConfirmLoading(false);
        });
      } else {
        addPermission({ ...values }).then(() => {
          onSubmit();
          form.resetFields();
          setConfirmLoading(false);
        });
      }
    });
  };
  const handleCancel = () => {
    setConfirmLoading(false);
    form.resetFields();
    onCancel();
  };
  useEffect(() => {
    if (visible) {
      if (record) {
        form.setFieldsValue({ ...record });
        setModalTitle("编辑权限");
      } else {
        setModalTitle("新增权限");
      }
    }
  }, [visible]);
  return (
    <Modal
      forceRender
      visible={visible}
      title={modalTitle}
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
        <Form.Item
          name="name"
          label="权限名"
          rules={[
            {
              required: true,
              message: "必填",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="url"
          label="路径"
          rules={[
            {
              required: true,
              message: "必填",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item name="detail" label="说明">
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ModalForm;
