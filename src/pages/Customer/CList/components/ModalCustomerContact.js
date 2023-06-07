import { useState, useEffect } from "react";
import {
  Modal,
  Form,
  Row,
  Col,
  Input,
  message,
  InputNumber,
  Select,
  DatePicker,
  Cascader,
} from "antd";
import { addContact, updateContact } from "../../../../services/customer";

const ModalCustomerContact = ({
  visible,
  onSubmit,
  onCancel,
  record,
  customerId,
}) => {
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [form] = Form.useForm();
  const formList = [
    {
      name: "name",
      label: "联系人",
      type: "input",
      span: 24,
      rules: [
        {
          required: true,
          message: "必填",
        },
      ],
    },
    {
      name: "phone",
      label: "当前联系电话",
      type: "input",
      span: 24,
      rules: [
        {
          required: true,
          message: "必填",
        },
      ],
    },
    {
      name: "job",
      label: "职务",
      type: "input",
      span: 24,
    },
    {
      name: "email",
      label: "邮箱",
      type: "input",
      span: 24,
    },
    {
      name: "fax",
      label: "传真",
      type: "input",
      span: 24,
    },
    {
      name: "gender",
      label: "性别",
      type: "select",
      span: 24,
      options: [
        { label: "未知", value: 0 },
        { label: "男", value: 1 },
        { label: "女", value: 2 },
      ],
    },
    {
      name: "qq",
      label: "QQ",
      type: "input",
      span: 24,
    },
    {
      name: "telphone",
      label: "座机",
      type: "input",
      span: 24,
    },
    {
      name: "wechatId",
      label: "微信",
      type: "input",
      span: 24,
    },
    {
      name: "remark",
      label: "备注",
      type: "input",
      span: 24,
    },
  ];
  const handleCancel = () => {
    form.resetFields();
    setConfirmLoading(false);
    onCancel();
  };
  const handleOk = () => {
    form.validateFields().then((values) => {
      setConfirmLoading(true);
      if (record) {
        updateContact({
          ...values,
          id: record.id,
          customerId: customerId,
        }).then((data) => {
          form.resetFields();
          setConfirmLoading(false);
          onSubmit();
        });
      } else {
        addContact({ ...values, customerId: customerId }).then((data) => {
          message.info(data?.message || '成功');
          form.resetFields();
          setConfirmLoading(false);
          onSubmit();
        });
      }
    });
  };
  useEffect(() => {
    if (visible) {
      // console.log(record);
      form.setFieldsValue(record);
    }
  }, [visible]);
  return (
    <Modal
      visible={visible}
      title="联系人"
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
        {
          <Row gutter={32}>
            {formList.map((col) => {
              if (col.render) {
                return col.render();
              }
              if (col.type === "input") {
                return (
                  <Col span={col.span} key={col.name}>
                    <Form.Item
                      name={col.name}
                      label={col.label}
                      rules={col.rules}
                    >
                      <Input></Input>
                    </Form.Item>
                  </Col>
                );
              }
              if (col.type === "inputNumber") {
                return (
                  <Col span={col.span} key={col.name}>
                    <Form.Item
                      name={col.name}
                      label={col.label}
                      rules={col.rules}
                    >
                      <InputNumber style={{ width: "100%" }}></InputNumber>
                    </Form.Item>
                  </Col>
                );
              }
              if (col.type === "select") {
                return (
                  <Col span={col.span} key={col.name}>
                    <Form.Item
                      name={col.name}
                      label={col.label}
                      rules={col.rules}
                    >
                      <Select options={col.options}></Select>
                    </Form.Item>
                  </Col>
                );
              }
              if (col.type === "cascader") {
                return (
                  <Col span={col.span} key={col.name}>
                    <Form.Item
                      name={col.name}
                      label={col.label}
                      rules={col.rules}
                    >
                      <Cascader options={col.options}></Cascader>
                    </Form.Item>
                  </Col>
                );
              }
              if (col.type === "datePicker") {
                return (
                  <Col span={col.span} key={col.name}>
                    <Form.Item name={col.name} label={col.label}>
                      <DatePicker style={{ width: "100%" }}></DatePicker>
                    </Form.Item>
                  </Col>
                );
              }
              return null;
            })}
          </Row>
        }
      </Form>
    </Modal>
  );
};

export default ModalCustomerContact;
