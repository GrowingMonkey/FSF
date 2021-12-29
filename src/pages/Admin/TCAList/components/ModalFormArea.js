import { useState, useEffect } from "react";
import { Modal, Form, Input } from "antd";
import { addTCA, updateTCA } from "../../../../services/admin";

const ModalFormArea = ({ visible, onSubmit, onCancel, record }) => {
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalTitle, setModalTitle] = useState("新增大区");
  const [form] = Form.useForm();
  const handleOk = () => {
    setConfirmLoading(true);
    form
      .validateFields()
      .then((values) => {
        if (record) {
          updateTCA({ id: record.id, ...values }).then(() => {
            onSubmit();
            form.resetFields();
            setConfirmLoading(false);
          });
        } else {
          addTCA({ ...values, level: 0 }).then(() => {
            onSubmit();
            form.resetFields();
            setConfirmLoading(false);
          });
        }
      })
      .catch((info) => {
        console.log("Validate Failed:", info);
        setConfirmLoading(false);
      });
  };
  const handleCancel = () => {
    form.resetFields();
    onCancel();
  };
  useEffect(() => {
    if (visible) {
      if (record) {
        form.setFieldsValue({ ...record });
        setModalTitle("编辑大区");
      } else {
        setModalTitle("新增大区");
      }
    }
  }, [visible]);
  return (
    <Modal
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
          label="名称"
          rules={[
            {
              required: true,
              message: "必填",
            },
          ]}
        >
          <Input />
        </Form.Item>
        {/* <Form.Item name="cityCode" label="城市ID"></Form.Item>
        <Form.Item name="leaderId" label="领导ID"></Form.Item>
        <Form.Item name="leaderName" label="领导名称"></Form.Item>
        <Form.Item name="leaderTel" label="领导电话"></Form.Item>
         */}
        <Form.Item name="remark" label="备注">
          <Input.TextArea />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ModalFormArea;
