import { useState, useEffect } from "react";
import { Modal, Form, Input, DatePicker, Select } from "antd";
import { addBtrip } from '@/services/office'
const { RangePicker } = DatePicker;
const { TextArea } = Input;
const ModalOnFieldApply = ({ visible, onSubmit, onCancel, record }) => {
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [form] = Form.useForm();
  const formList = [
    {
      name: "address",
      label: "出差地址",
      type: "input",
      span: 6,
    },
    {
      name: "attendanceId",
      label: "出差业务",
      type: "select",
      span: 6,
    },
    {
      name: "type",
      label: "出差类型",
      type: "select",
      span: 6,
      options: [{ label: '单人出差', value: 0 }, { label: '多人出差', value: 1 }]
    },
    {
      name: "onfiledDate",
      label: "出差日期",
      type: "dateRange",
      span: 6,
    },
    {
      name: "reason",
      label: "出差原因",
      type: "textArea",
      span: 6,
    },
  ];
  const handleCancel = () => {
    onCancel()
  };
  const handleOk = () => {
    form.validateFields().then(value => {
      console.log(value);
      addBtrip(value).then(res => {
        onSubmit()
      })
    })

  };
  return (
    <Modal
      forceRender
      visible={visible}
      title="出差申请"
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
          if (col.type === "textArea") {
            return (
              <Form.Item name={col.name} label={col.label} key={col.label}>
                <TextArea
                  placeholder="Controlled autosize"
                  autoSize={{ minRows: 3, maxRows: 5 }}
                />
              </Form.Item>
            );
          }
          if (col.type === "dateRange") {
            return (
              <Form.Item name={col.name} label={col.label} key={col.label}>
                <RangePicker style={{ width: "100%" }} />
              </Form.Item>
            );
          }
          return null;
        })}
      </Form>
    </Modal>
  );
};

export default ModalOnFieldApply;
