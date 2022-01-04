import { useState, useEffect } from "react";
import { Modal, Form, Input, DatePicker, Select } from "antd";
import { addLeave } from '@/services/office'
const ModalLeaveApply = ({ visible, onSubmit, onCancel, record }) => {
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [form] = Form.useForm();
  const formList = [
    {
      name: "inTime",
      label: "请假结束日期",
      type: "datePicker",
      span: 6,
    },
    {
      name: "leaveTime",
      label: "请假时长",
      type: "input",
      span: 6,
    },
    {
      name: "outTime",
      label: "请假开始日期",
      type: "datePicker",
      span: 6,
    },
    {
      name: "reason",
      label: "请假原因",
      type: "input",
      span: 6,
    },
    {
      name: "url",
      label: "附件地址",
      type: "input",
      span: 6,
    },
  ];
  const handleCancel = () => {
    onCancel()
  };
  const handleOk = () => {
    console.log(111);
    form.validateFields().then(value => {
      console.log(value);
      addLeave(value).then(res => {
        onSubmit()
      })
    })
  };
  return (
    <Modal
      forceRender
      visible={visible}
      title="请假申请"
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
        {formList.map((col) => {
          if (col.type === "input") {
            return (
              <Form.Item
                name={col.name}
                label={col.label}
                rules={col.rules}
                key={col.label}
              >
                <Input></Input>
              </Form.Item>
            );
          }
          if (col.type === "select") {
            return (
              <Form.Item
                name={col.name}
                label={col.label}
                rules={col.rules}
                key={col.label}
              >
                <Select options={col.options}></Select>
              </Form.Item>
            );
          }
          if (col.type === "datePicker") {
            return (
              <Form.Item name={col.name} label={col.label} key={col.label}>
                <DatePicker style={{ width: "100%" }}></DatePicker>
              </Form.Item>
            );
          }
          return null;
        })}
      </Form>
    </Modal>
  );
};

export default ModalLeaveApply;
