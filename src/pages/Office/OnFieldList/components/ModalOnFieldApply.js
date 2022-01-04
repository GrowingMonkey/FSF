import { useState, useEffect } from "react";
import { Modal, Form, Input, DatePicker, Select } from "antd";
import { addBtrip } from '@/services/office'
const ModalOnFieldApply = ({ visible, onSubmit, onCancel, record }) => {
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [form] = Form.useForm();
  const formList = [
    {
      name: "bstripAddress",
      label: "出差地址",
      type: "input",
      span: 6,
    },
    {
      name: "bstripCompany",
      label: "出差公司名",
      type: "input",
      span: 6,
    },
    {
      name: "bstripCompanyId",
      label: "出差公司ID",
      type: "input",
      span: 6,
    },
    {
      name: "bstripTel",
      label: "联系人电话",
      type: "input",
      span: 6,
    },
    {
      name: "bstripUser",
      label: "出差联系人",
      type: "input",
      span: 6,
    },
    {
      name: "inTime",
      label: "出差结束日期",
      type: "datePicker",
      span: 6,
    },
    {
      name: "outTime",
      label: "出差开始日期",
      type: "datePicker",
      span: 6,
    },
    {
      name: "reason",
      label: "出差原因",
      type: "input",
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
          return null;
        })}
      </Form>
    </Modal>
  );
};

export default ModalOnFieldApply;
